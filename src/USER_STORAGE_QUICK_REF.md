# User Storage Quick Reference

## Import
```typescript
import { 
  createUser, 
  authenticateUser, 
  findUserByEmail,
  updateUserPassword,
  deleteUser,
  clearAllUserData
} from "../utils/userStorage";
```

## Common Operations

### Create New Account
```typescript
const newUser = createUser({
  name: "John Doe",
  email: "john@example.com",
  password: "password123"
});
```

### Login
```typescript
const user = authenticateUser("john@example.com", "password123");
if (user) {
  // Login successful
  localStorage.setItem('skillsync_user', JSON.stringify(user));
}
```

### Check if Email Exists
```typescript
const user = findUserByEmail("john@example.com");
if (user) {
  // User exists
}
```

### Reset/Change Password
```typescript
const success = updateUserPassword("john@example.com", "newpassword");
```

### Delete Account
```typescript
const success = deleteUser(userId);
if (success) {
  localStorage.clear();
  // Sign out user
}
```

### Clear User Data (Keep Account)
```typescript
clearAllUserData(userId);
```

## Storage Locations

| Key | Purpose |
|-----|---------|
| `skillsync_users_db` | Main user database (all users) |
| `skillsync_user` | Current user session |
| `password_reset_token` | Password reset token data |

## Error Handling

```typescript
try {
  const user = createUser({...});
} catch (error) {
  // Error: "User with this email already exists"
  toast.error(error.message);
}
```

## Database Structure

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

## Integration Checklist

✅ Sign Up - `createUser()`  
✅ Login - `authenticateUser()`  
✅ Forgot Password - `findUserByEmail()`  
✅ Reset Password - `updateUserPassword()`  
✅ Change Password - `findUserByEmail()` + `updateUserPassword()`  
✅ Delete Data - `clearAllUserData()`  
✅ Delete Account - `deleteUser()`

## View in DevTools

1. F12 → Application → Local Storage
2. Look for: `skillsync_users_db`
3. View JSON data
