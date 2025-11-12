/**
 * User Storage Utility
 * Manages user data in a persistent JSON file with sync across all auth operations
 */

export interface User {
  id: number;
  name: string;
  email: string;
  password: string; // In production, this should be hashed
  joinDate: string;
  isAuthenticated?: boolean;
  lastLogin?: string;
}

interface UserDatabase {
  users: User[];
  metadata: {
    lastUpdated: string;
    version: string;
  };
}

// Local storage key for the user database
const STORAGE_KEY = 'skillsync_users_db';
const CREDENTIALS_LOG_KEY = 'skillsync_credentials_log';

/**
 * Log credentials to a text file (auto-save for testing)
 */
function logCredentials(action: string, email: string, password: string, name?: string): void {
  try {
    const timestamp = new Date().toLocaleString();
    const logEntry = `[${timestamp}] ${action}\n  Email: ${email}\n  Password: ${password}${name ? `\n  Name: ${name}` : ''}\n\n`;
    
    // Get existing log
    let credentialsLog = localStorage.getItem(CREDENTIALS_LOG_KEY) || '';
    
    // Append new entry
    credentialsLog += logEntry;
    
    // Save to localStorage
    localStorage.setItem(CREDENTIALS_LOG_KEY, credentialsLog);
    
    // Also keep a downloadable version
    const blob = new Blob([credentialsLog], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    // Store the text content for easy access
    (window as any).credentialsLog = credentialsLog;
    
    console.log('✅ Credentials saved to log');
  } catch (error) {
    console.error('Error logging credentials:', error);
  }
}

/**
 * Download credentials log as .txt file
 */
export function downloadCredentialsLog(): void {
  const credentialsLog = localStorage.getItem(CREDENTIALS_LOG_KEY) || 'No credentials logged yet.';
  const blob = new Blob([credentialsLog], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `skillsync-credentials-${new Date().toISOString().split('T')[0]}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Get credentials log as text
 */
export function getCredentialsLog(): string {
  return localStorage.getItem(CREDENTIALS_LOG_KEY) || 'No credentials logged yet.';
}

/**
 * Clear credentials log
 */
export function clearCredentialsLog(): void {
  localStorage.removeItem(CREDENTIALS_LOG_KEY);
}

/**
 * Initialize the user database in localStorage
 */
function initializeDatabase(): UserDatabase {
  const existingData = localStorage.getItem(STORAGE_KEY);
  
  if (existingData) {
    try {
      return JSON.parse(existingData);
    } catch (error) {
      console.error('Error parsing user database:', error);
    }
  }
  
  // Create new database
  const newDatabase: UserDatabase = {
    users: [],
    metadata: {
      lastUpdated: new Date().toISOString(),
      version: '1.0.0'
    }
  };
  
  saveDatabase(newDatabase);
  return newDatabase;
}

/**
 * Save the database to localStorage
 */
function saveDatabase(database: UserDatabase): void {
  database.metadata.lastUpdated = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(database, null, 2));
}

/**
 * Get the current database
 */
function getDatabase(): UserDatabase {
  return initializeDatabase();
}

/**
 * Find user by email
 */
export function findUserByEmail(email: string): User | null {
  const database = getDatabase();
  const user = database.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  return user || null;
}

/**
 * Find user by ID
 */
export function findUserById(id: number): User | null {
  const database = getDatabase();
  const user = database.users.find(u => u.id === id);
  return user || null;
}

/**
 * Create a new user account
 */
export function createUser(userData: {
  name: string;
  email: string;
  password: string;
}): User {
  const database = getDatabase();
  
  // Check if user already exists
  const existingUser = findUserByEmail(userData.email);
  if (existingUser) {
    throw new Error('User with this email already exists');
  }
  
  // Create new user
  const newUser: User = {
    id: Date.now(),
    name: userData.name,
    email: userData.email.toLowerCase(),
    password: userData.password, // In production: hash this!
    joinDate: new Date().toISOString(),
    lastLogin: new Date().toISOString()
  };
  
  database.users.push(newUser);
  saveDatabase(database);
  
  // Log credentials
  logCredentials('Create User', newUser.email, newUser.password, newUser.name);
  
  return newUser;
}

/**
 * Authenticate user (login)
 */
export function authenticateUser(email: string, password: string): User | null {
  const user = findUserByEmail(email);
  
  if (!user) {
    return null;
  }
  
  // Verify password (in production: use proper hashing comparison)
  if (user.password !== password) {
    return null;
  }
  
  // Update last login
  updateUserLastLogin(user.id);
  
  // Log successful login
  logCredentials('Login', email, password, user.name);
  
  return user;
}

/**
 * Update user password
 */
export function updateUserPassword(email: string, newPassword: string): boolean {
  const database = getDatabase();
  const userIndex = database.users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
  
  if (userIndex === -1) {
    return false;
  }
  
  database.users[userIndex].password = newPassword; // In production: hash this!
  saveDatabase(database);
  
  // Log password reset
  logCredentials('Password Reset', email, newPassword, database.users[userIndex].name);
  
  return true;
}

/**
 * Update user profile
 */
export function updateUserProfile(userId: number, updates: Partial<Pick<User, 'name' | 'email'>>): User | null {
  const database = getDatabase();
  const userIndex = database.users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    return null;
  }
  
  // Check if email is being updated and if it's already in use
  if (updates.email && updates.email !== database.users[userIndex].email) {
    const emailExists = database.users.some(
      (u, idx) => idx !== userIndex && u.email.toLowerCase() === updates.email!.toLowerCase()
    );
    if (emailExists) {
      throw new Error('Email already in use');
    }
  }
  
  database.users[userIndex] = {
    ...database.users[userIndex],
    ...updates
  };
  
  saveDatabase(database);
  return database.users[userIndex];
}

/**
 * Update last login timestamp
 */
function updateUserLastLogin(userId: number): void {
  const database = getDatabase();
  const userIndex = database.users.findIndex(u => u.id === userId);
  
  if (userIndex !== -1) {
    database.users[userIndex].lastLogin = new Date().toISOString();
    saveDatabase(database);
  }
}

/**
 * Delete user account
 */
export function deleteUser(userId: number): boolean {
  const database = getDatabase();
  const userIndex = database.users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    return false;
  }
  
  database.users.splice(userIndex, 1);
  saveDatabase(database);
  
  return true;
}

/**
 * Get all users (for admin purposes)
 */
export function getAllUsers(): User[] {
  const database = getDatabase();
  return database.users;
}

/**
 * Clear all user data
 */
export function clearAllUserData(userId: number): boolean {
  // This clears user-specific data but keeps the account
  const user = findUserById(userId);
  if (!user) {
    return false;
  }
  
  // Clear user-specific localStorage items
  localStorage.removeItem('skillsync_bookmarks');
  localStorage.removeItem('skillsync_notifications');
  localStorage.removeItem('skillsync_recent_searches');
  localStorage.removeItem('skillsync_recently_viewed');
  localStorage.removeItem('skillsync_settings');
  
  return true;
}

/**
 * Export database (for backup/debugging)
 */
export function exportDatabase(): string {
  const database = getDatabase();
  return JSON.stringify(database, null, 2);
}

/**
 * Import database (for restore)
 */
export function importDatabase(jsonData: string): boolean {
  try {
    const database = JSON.parse(jsonData) as UserDatabase;
    saveDatabase(database);
    return true;
  } catch (error) {
    console.error('Error importing database:', error);
    return false;
  }
}

/**
 * Reset entire database (careful!)
 */
export function resetDatabase(): void {
  const freshDatabase: UserDatabase = {
    users: [],
    metadata: {
      lastUpdated: new Date().toISOString(),
      version: '1.0.0'
    }
  };
  saveDatabase(freshDatabase);
}