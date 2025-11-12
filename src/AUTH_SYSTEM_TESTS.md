# Authentication System Tests

## Test Suite for User Storage Integration

This document provides comprehensive test scenarios to validate the authentication system is working correctly.

---

## Pre-Test Setup

1. Open the application in your browser
2. Open Developer Tools (F12)
3. Go to Console tab to monitor any errors
4. Go to Application > Local Storage to view data

---

## Test 1: New Account Creation

### Steps:
1. Click "Get Started" or "Sign Up"
2. Fill in the form:
   - Name: "Test User"
   - Email: "test@example.com"
   - Password: "test123"
   - Confirm Password: "test123"
3. Click "Create Account"

### Expected Results:
✅ Success toast: "Account Created! Welcome to SkillSync AI, Test User!"  
✅ User is logged in  
✅ Redirected to home/dashboard  
✅ In DevTools > Local Storage:
   - `skillsync_users_db` contains the new user
   - `skillsync_user` contains current session

### Verify in Console:
```javascript
// Check database
JSON.parse(localStorage.getItem('skillsync_users_db'))

// Check session
JSON.parse(localStorage.getItem('skillsync_user'))
```

---

## Test 2: Duplicate Email Prevention

### Steps:
1. Sign out if logged in
2. Try to create another account with "test@example.com"

### Expected Results:
❌ Error: "An account with this email already exists"  
❌ Account creation blocked  
❌ User not logged in

---

## Test 3: Login with Correct Credentials

### Steps:
1. Sign out if logged in
2. Click "Sign In"
3. Enter:
   - Email: "test@example.com"
   - Password: "test123"
4. Click "Sign In"

### Expected Results:
✅ Success toast: "Welcome Back! Signed in as Test User"  
✅ User is logged in  
✅ Session stored in `skillsync_user`

---

## Test 4: Login with Wrong Password

### Steps:
1. Sign out
2. Try to login with:
   - Email: "test@example.com"
   - Password: "wrongpassword"

### Expected Results:
❌ Error: "Invalid email or password"  
❌ User remains signed out

---

## Test 5: Login with Non-Existent Email

### Steps:
1. Sign out
2. Try to login with:
   - Email: "nonexistent@example.com"
   - Password: "anything"

### Expected Results:
❌ Error: "Invalid email or password"  
❌ User remains signed out

---

## Test 6: Forgot Password Flow

### Steps:
1. Sign out
2. Click "Sign In" → "Forgot Password?"
3. Enter: "test@example.com"
4. Click "Send Reset Link"

### Expected Results:
✅ Success toast: "Reset Link Sent!"  
✅ Confirmation screen shows email  
✅ In DevTools: `password_reset_token` is created with:
   - email
   - token
   - timestamp
   - expiresIn

### Verify in Console:
```javascript
JSON.parse(localStorage.getItem('password_reset_token'))
```

---

## Test 7: Forgot Password with Invalid Email

### Steps:
1. Go to Forgot Password page
2. Enter: "invalid@example.com" (non-existent email)
3. Click "Send Reset Link"

### Expected Results:
❌ Error: "No account found with this email address"  
❌ No reset token created

---

## Test 8: Reset Password

### Steps:
1. Complete Test 6 first (Forgot Password)
2. After confirmation screen, you'll be on Reset Password page
3. Enter:
   - New Password: "newpass123"
   - Confirm: "newpass123"
4. Click "Reset Password"

### Expected Results:
✅ Success toast: "Password Reset Complete!"  
✅ Success screen appears  
✅ Redirected to login after 2 seconds  
✅ In DevTools:
   - User's password in `skillsync_users_db` is updated to "newpass123"
   - `password_reset_token` is deleted

### Verify Password Changed:
```javascript
const db = JSON.parse(localStorage.getItem('skillsync_users_db'));
const user = db.users.find(u => u.email === 'test@example.com');
console.log(user.password); // Should be "newpass123"
```

---

## Test 9: Login After Password Reset

### Steps:
1. After Test 8, login with:
   - Email: "test@example.com"
   - Password: "newpass123" (new password)

### Expected Results:
✅ Login successful with new password  
❌ Old password "test123" should NOT work

---

## Test 10: Change Password (From Settings)

### Steps:
1. Login as "test@example.com"
2. Go to Profile → Settings → Change Password
3. Enter:
   - Current Password: "newpass123"
   - New Password: "finalpass456"
   - Confirm: "finalpass456"
4. Click "Change Password"

### Expected Results:
✅ Success toast: "Password changed successfully!"  
✅ Redirected back to settings  
✅ In DevTools: Password updated in both `skillsync_users_db` and `skillsync_user`

### Verify:
```javascript
const db = JSON.parse(localStorage.getItem('skillsync_users_db'));
const session = JSON.parse(localStorage.getItem('skillsync_user'));
console.log(db.users[0].password); // "finalpass456"
console.log(session.password);     // "finalpass456"
```

---

## Test 11: Change Password with Wrong Current Password

### Steps:
1. Go to Settings → Change Password
2. Enter:
   - Current Password: "wrongpassword"
   - New Password: "anything"
   - Confirm: "anything"

### Expected Results:
❌ Error toast: "Current password is incorrect"  
❌ Password NOT changed

---

## Test 12: Clear All Data

### Steps:
1. Login and save some data (bookmarks, searches, etc.)
2. Go to Settings → Danger Zone → "Clear All Data"
3. Confirm deletion

### Expected Results:
✅ Success toast: "All data cleared successfully"  
✅ In DevTools: These keys are removed:
   - `skillsync_bookmarks`
   - `skillsync_notifications`
   - `skillsync_recent_searches`
   - `skillsync_recently_viewed`
   - `skillsync_settings`
✅ But these remain:
   - `skillsync_users_db` (account still exists)
   - `skillsync_user` (still logged in)

---

## Test 13: Delete Account

### Steps:
1. Login as "test@example.com"
2. Go to Settings → Danger Zone → "Delete Account"
3. Confirm deletion

### Expected Results:
✅ Success toast: "Account deleted successfully"  
✅ User signed out after 1.5 seconds  
✅ In DevTools:
   - User removed from `skillsync_users_db`
   - ALL localStorage cleared
   - Back to welcome/login screen

### Verify:
```javascript
const db = JSON.parse(localStorage.getItem('skillsync_users_db') || '{"users":[]}');
console.log(db.users.length); // Should be 0 if it was the only user
```

---

## Test 14: Multiple User Accounts

### Steps:
1. Create User 1:
   - Email: "user1@test.com"
   - Password: "pass1"
2. Sign out
3. Create User 2:
   - Email: "user2@test.com"
   - Password: "pass2"
4. Sign out
5. Create User 3:
   - Email: "user3@test.com"
   - Password: "pass3"

### Expected Results:
✅ All 3 users created successfully  
✅ In DevTools: `skillsync_users_db` contains 3 users

### Verify:
```javascript
const db = JSON.parse(localStorage.getItem('skillsync_users_db'));
console.log(`Total users: ${db.users.length}`); // Should be 3
console.log(db.users.map(u => u.email)); // ["user1@test.com", "user2@test.com", "user3@test.com"]
```

---

## Test 15: Cross-User Password Independence

### Steps:
1. Having User 1, 2, 3 from Test 14
2. Login as User 1
3. Change password to "newpass1"
4. Sign out
5. Try to login as User 2 with "newpass1"

### Expected Results:
❌ Login as User 2 with User 1's new password should FAIL  
✅ Login as User 2 with original "pass2" should work  
✅ Each user's password is independent

---

## Test 16: Session Persistence

### Steps:
1. Login as any user
2. Refresh the page (F5)

### Expected Results:
✅ User remains logged in after refresh  
✅ All user data persists  
✅ Session loaded from localStorage

---

## Test 17: Database Export/Import

### Steps:
1. Create 2-3 test users
2. In console, export database:
```javascript
import { exportDatabase } from './utils/userStorage';
const backup = exportDatabase();
console.log(backup);
```
3. Copy the JSON output
4. Clear all data (or use Incognito mode)
5. Import database:
```javascript
import { importDatabase } from './utils/userStorage';
const restored = importDatabase(backup);
console.log(restored); // Should be true
```

### Expected Results:
✅ Database exported as JSON string  
✅ Database restored successfully  
✅ All users restored with correct data

---

## Test 18: Metadata Tracking

### Steps:
1. Check database metadata:
```javascript
const db = JSON.parse(localStorage.getItem('skillsync_users_db'));
console.log(db.metadata);
```

### Expected Results:
✅ `lastUpdated` timestamp is present  
✅ `version` is "1.0.0"  
✅ `lastUpdated` changes after any database operation

---

## Test 19: Edge Case - Password Reset Token Expiry

### Steps:
1. Start forgot password flow
2. In DevTools, modify the token timestamp to be > 1 hour old:
```javascript
const token = JSON.parse(localStorage.getItem('password_reset_token'));
token.timestamp = Date.now() - 7200000; // 2 hours ago
localStorage.setItem('password_reset_token', JSON.stringify(token));
```
3. Try to reset password

### Expected Results:
❌ Error: "Reset link has expired. Please request a new one."  
❌ Password NOT changed

---

## Test 20: Stress Test - Many Users

### Steps:
1. In console, create 50 users:
```javascript
import { createUser } from './utils/userStorage';
for (let i = 1; i <= 50; i++) {
  try {
    createUser({
      name: `User ${i}`,
      email: `user${i}@test.com`,
      password: `pass${i}`
    });
  } catch (e) {
    console.error(`Failed to create user ${i}`);
  }
}
```

### Expected Results:
✅ All 50 users created  
✅ Database size in localStorage under 5MB  
✅ No performance issues  
✅ All functions work normally

---

## Test Results Template

Copy this template to track your test results:

```
Test 1: New Account Creation         [ ] PASS [ ] FAIL
Test 2: Duplicate Email Prevention    [ ] PASS [ ] FAIL
Test 3: Login Correct Credentials     [ ] PASS [ ] FAIL
Test 4: Login Wrong Password          [ ] PASS [ ] FAIL
Test 5: Login Non-Existent Email      [ ] PASS [ ] FAIL
Test 6: Forgot Password Flow          [ ] PASS [ ] FAIL
Test 7: Forgot Invalid Email          [ ] PASS [ ] FAIL
Test 8: Reset Password                [ ] PASS [ ] FAIL
Test 9: Login After Reset             [ ] PASS [ ] FAIL
Test 10: Change Password              [ ] PASS [ ] FAIL
Test 11: Change Wrong Current         [ ] PASS [ ] FAIL
Test 12: Clear All Data               [ ] PASS [ ] FAIL
Test 13: Delete Account               [ ] PASS [ ] FAIL
Test 14: Multiple User Accounts       [ ] PASS [ ] FAIL
Test 15: Cross-User Independence      [ ] PASS [ ] FAIL
Test 16: Session Persistence          [ ] PASS [ ] FAIL
Test 17: Database Export/Import       [ ] PASS [ ] FAIL
Test 18: Metadata Tracking            [ ] PASS [ ] FAIL
Test 19: Token Expiry                 [ ] PASS [ ] FAIL
Test 20: Stress Test                  [ ] PASS [ ] FAIL
```

---

## Troubleshooting Common Issues

### Issue: Tests failing randomly
**Solution:** Clear localStorage before each test run

### Issue: Can't see localStorage data
**Solution:** Ensure you're looking at the correct domain in DevTools

### Issue: Import functions not working in console
**Solution:** The import syntax won't work directly in browser console. Use the functions through the app UI instead.

### Issue: Database not persisting
**Solution:** Check if browser is in private/incognito mode, which may block localStorage

---

## Success Criteria

✅ All 20 tests pass  
✅ No console errors  
✅ Data persists across page refreshes  
✅ Database structure is correct  
✅ All operations are synced  
✅ Toast notifications appear correctly  

---

**Testing completed:** _____________  
**Tester:** _____________  
**Result:** _____ / 20 tests passed
