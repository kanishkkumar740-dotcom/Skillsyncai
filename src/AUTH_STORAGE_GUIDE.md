# Authentication Storage System Guide

## Overview

SKILLSYNC AI now includes a comprehensive file-based authentication system that stores and syncs user credentials across all authentication operations. The system uses localStorage to persist user data in a database-like structure.

## System Architecture

### Files

1. **`/utils/userStorage.ts`** - Core authentication utility with all user management functions
2. **`/data/users.json`** - Initial database structure template (for reference only)

### Data Storage

All user data is stored in localStorage under the key `skillsync_users_db` in the following structure:

```json
{
  "users": [
    {
      "id": 1234567890,
      "name": "John Doe",
      "email": "john@example.com",
      "password": "password123",
      "joinDate": "2025-11-12T10:30:00.000Z",
      "lastLogin": "2025-11-12T10:30:00.000Z"
    }
  ],
  "metadata": {
    "lastUpdated": "2025-11-12T10:30:00.000Z",
    "version": "1.0.0"
  }
}
```

## Features

### ✅ Integrated Authentication Operations

The system automatically syncs user data across all these operations:

1. **Sign Up** - Creates new user account in database
2. **Login** - Authenticates against database
3. **Forgot Password** - Validates email exists in database
4. **Reset Password** - Updates password in database
5. **Change Password** - Updates password with current password verification
6. **Delete All Data** - Clears user data while preserving account
7. **Delete Account** - Completely removes user from database

### 🔄 Auto-Sync

All changes are automatically saved to localStorage and persist across:
- Page refreshes
- Browser sessions
- All authentication flows

## API Reference

### Core Functions

#### User Creation

```typescript
createUser(userData: {
  name: string;
  email: string;
  password: string;
}): User
```

Creates a new user account. Throws error if email already exists.

**Example:**
```typescript
const newUser = createUser({
  name: "Jane Smith",
  email: "jane@example.com",
  password: "securepass123"
});
```

#### User Authentication

```typescript
authenticateUser(email: string, password: string): User | null
```

Validates user credentials and returns user object if successful.

**Example:**
```typescript
const user = authenticateUser("jane@example.com", "securepass123");
if (user) {
  console.log("Login successful!");
}
```

#### Find User

```typescript
findUserByEmail(email: string): User | null
findUserById(id: number): User | null
```

Retrieve user by email or ID.

#### Update Password

```typescript
updateUserPassword(email: string, newPassword: string): boolean
```

Updates user password. Returns true if successful.

**Example:**
```typescript
const success = updateUserPassword("jane@example.com", "newpassword456");
```

#### Update Profile

```typescript
updateUserProfile(userId: number, updates: {
  name?: string;
  email?: string;
}): User | null
```

Updates user profile information. Throws error if new email already exists.

#### Delete User

```typescript
deleteUser(userId: number): boolean
```

Permanently deletes user account from database.

#### Clear User Data

```typescript
clearAllUserData(userId: number): boolean
```

Clears user's application data (bookmarks, searches, etc.) but keeps account.

### Admin Functions

#### Get All Users

```typescript
getAllUsers(): User[]
```

Returns array of all registered users (for admin panel).

#### Export/Import Database

```typescript
exportDatabase(): string
importDatabase(jsonData: string): boolean
```

Export database as JSON string or import from backup.

#### Reset Database

```typescript
resetDatabase(): void
```

**⚠️ DANGER:** Completely wipes all user data. Use with extreme caution!

## Implementation Details

### Component Integration

All authentication components now use the userStorage utility:

- **AuthPage.tsx** - Uses `createUser()` and `authenticateUser()`
- **ForgotPasswordPage.tsx** - Uses `findUserByEmail()`
- **ResetPasswordPage.tsx** - Uses `updateUserPassword()`
- **ChangePasswordPage.tsx** - Uses `findUserByEmail()` and `updateUserPassword()`
- **SettingsPage.tsx** - Uses `clearAllUserData()` and `deleteUser()`

### Session Management

Current user session is stored separately in localStorage under `skillsync_user`:

```json
{
  "id": 1234567890,
  "name": "Jane Smith",
  "email": "jane@example.com",
  "password": "securepass123",
  "joinDate": "2025-11-12T10:30:00.000Z",
  "isAuthenticated": true
}
```

This allows quick access to current user without searching the database.

## Testing the System

### Test Scenario 1: Create Account

1. Click "Sign Up"
2. Enter name, email, password
3. Submit form
4. **Result:** New user added to `skillsync_users_db` in localStorage

### Test Scenario 2: Forgot Password Flow

1. Click "Forgot Password"
2. Enter registered email
3. **Result:** System validates email exists in database
4. Click reset link (simulated)
5. Enter new password
6. **Result:** Password updated in database and synced to session

### Test Scenario 3: Change Password

1. Go to Settings > Change Password
2. Enter current password + new password
3. **Result:** System verifies current password against database
4. Submit
5. **Result:** Password updated in database and session

### Test Scenario 4: Delete Account

1. Go to Settings > Danger Zone > Delete Account
2. Confirm deletion
3. **Result:** User removed from database, all data cleared, signed out

## Viewing Stored Data

To inspect the user database in your browser:

1. Open Developer Tools (F12)
2. Go to Application/Storage tab
3. Expand "Local Storage"
4. Click on your domain
5. Find key `skillsync_users_db`
6. View the JSON value

## Security Notes

⚠️ **IMPORTANT:** This is a demo implementation!

### Current Implementation (Demo)
- Passwords stored in plain text
- All data in localStorage (client-side)
- No encryption
- No server-side validation

### Production Recommendations
- Hash passwords using bcrypt or similar
- Store data server-side with proper database
- Implement JWT tokens for sessions
- Add email verification
- Implement rate limiting
- Add 2FA/MFA support
- Use HTTPS only
- Implement proper CSRF protection

## Troubleshooting

### Issue: Users not persisting

**Solution:** Check if localStorage is enabled in browser. Private/Incognito mode may block localStorage.

### Issue: "User already exists" error

**Solution:** Use different email or clear database using browser DevTools.

### Issue: Password reset not working

**Solution:** Ensure user exists in database. Check `skillsync_users_db` in localStorage.

### Issue: Lost all users

**Solution:** Users are only stored in browser localStorage. Clearing browser data will delete all users. No recovery possible unless database was exported.

## Best Practices

1. **Always validate input** - Email format, password strength, etc.
2. **Provide user feedback** - Use toast notifications for all operations
3. **Handle errors gracefully** - Try-catch blocks around all database operations
4. **Keep session in sync** - Update both database and session on password changes
5. **Clean up on sign out** - Remove session but keep database

## Future Enhancements

Possible improvements for production:

- Backend API integration
- Real email verification
- Password strength meter
- Account recovery options
- User roles and permissions
- Activity logging
- Database migrations
- Automatic backups

## Support

For questions or issues with the authentication system, refer to:
- This guide
- `/utils/userStorage.ts` source code
- Component implementations in `/components/`

---

**Version:** 1.0.0  
**Last Updated:** November 12, 2025  
**Maintained by:** SKILLSYNC AI Development Team
