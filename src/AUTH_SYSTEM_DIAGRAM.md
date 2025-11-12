# Authentication System Architecture Diagram

## System Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                    SKILLSYNC AI Authentication System                │
│                           (Client-Side Storage)                      │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                           User Interface Layer                       │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐             │
│  │  AuthPage    │  │   Forgot     │  │    Reset     │             │
│  │  (Sign Up/   │  │   Password   │  │   Password   │             │
│  │   Login)     │  │     Page     │  │     Page     │             │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘             │
│         │                 │                  │                      │
│  ┌──────┴───────┐  ┌──────┴───────┐  ┌──────┴───────┐             │
│  │   Change     │  │   Settings   │  │    Profile   │             │
│  │   Password   │  │     Page     │  │     Page     │             │
│  └──────┬───────┘  └──────┬───────┘  └──────────────┘             │
│         │                 │                                         │
└─────────┼─────────────────┼─────────────────────────────────────────┘
          │                 │
          ▼                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        Business Logic Layer                          │
│                      /utils/userStorage.ts                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  User Management Functions:                                         │
│  ┌────────────────────────────────────────────────────────────┐    │
│  │  • createUser(name, email, password)                        │    │
│  │  • authenticateUser(email, password)                        │    │
│  │  • findUserByEmail(email)                                   │    │
│  │  • findUserById(id)                                         │    │
│  │  • updateUserPassword(email, newPassword)                   │    │
│  │  • updateUserProfile(id, updates)                           │    │
│  │  • deleteUser(id)                                           │    │
│  │  • clearAllUserData(id)                                     │    │
│  └────────────────────────────────────────────────────────────┘    │
│                                                                      │
│  Database Management:                                               │
│  ┌────────────────────────────────────────────────────────────┐    │
│  │  • getDatabase()                                            │    │
│  │  • saveDatabase(data)                                       │    │
│  │  • exportDatabase()                                         │    │
│  │  • importDatabase(json)                                     │    │
│  │  • resetDatabase()                                          │    │
│  └────────────────────────────────────────────────────────────┘    │
│                                                                      │
└─────────────────────────────────────┬───────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────┐
│                          Data Storage Layer                          │
│                    Browser localStorage API                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌──────────────────────────────────────────────────────────┐      │
│  │  Key: skillsync_users_db                                  │      │
│  │  ┌──────────────────────────────────────────────────┐    │      │
│  │  │ {                                                 │    │      │
│  │  │   "users": [                                      │    │      │
│  │  │     {                                             │    │      │
│  │  │       "id": 1234567890,                           │    │      │
│  │  │       "name": "John Doe",                         │    │      │
│  │  │       "email": "john@example.com",                │    │      │
│  │  │       "password": "hashed_password",              │    │      │
│  │  │       "joinDate": "2025-11-12T10:00:00.000Z",     │    │      │
│  │  │       "lastLogin": "2025-11-12T10:00:00.000Z"     │    │      │
│  │  │     }                                             │    │      │
│  │  │   ],                                              │    │      │
│  │  │   "metadata": {                                   │    │      │
│  │  │     "lastUpdated": "2025-11-12T10:00:00.000Z",    │    │      │
│  │  │     "version": "1.0.0"                            │    │      │
│  │  │   }                                               │    │      │
│  │  │ }                                                 │    │      │
│  │  └──────────────────────────────────────────────────┘    │      │
│  └──────────────────────────────────────────────────────────┘      │
│                                                                      │
│  ┌──────────────────────────────────────────────────────────┐      │
│  │  Key: skillsync_user (Current Session)                   │      │
│  │  ┌──────────────────────────────────────────────────┐    │      │
│  │  │ {                                                 │    │      │
│  │  │   "id": 1234567890,                               │    │      │
│  │  │   "name": "John Doe",                             │    │      │
│  │  │   "email": "john@example.com",                    │    │      │
│  │  │   "isAuthenticated": true                         │    │      │
│  │  │ }                                                 │    │      │
│  │  └──────────────────────────────────────────────────┘    │      │
│  └──────────────────────────────────────────────────────────┘      │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Authentication Flow Diagrams

### 1. Sign Up Flow

```
   User
    │
    │ Enters: name, email, password
    ▼
┌─────────────────┐
│   AuthPage      │
│   (Signup Mode) │
└────────┬────────┘
         │
         │ createUser({name, email, password})
         ▼
┌──────────────────────┐
│  userStorage.ts      │
│  • Validate email    │ ───► Email exists? → Error: "User exists"
│  • Create user obj   │
│  • Add to database   │
│  • Save to storage   │
└────────┬─────────────┘
         │
         │ Return: User object
         ▼
┌──────────────────────┐
│  localStorage        │
│  Update:             │
│  • users_db          │
│  • current session   │
└────────┬─────────────┘
         │
         │ Success!
         ▼
    User logged in
   (Redirected to app)
```

### 2. Login Flow

```
   User
    │
    │ Enters: email, password
    ▼
┌─────────────────┐
│   AuthPage      │
│   (Login Mode)  │
└────────┬────────┘
         │
         │ authenticateUser(email, password)
         ▼
┌──────────────────────┐
│  userStorage.ts      │
│  • Find user         │ ───► Not found? → Error: "Invalid credentials"
│  • Check password    │ ───► Wrong pass? → Error: "Invalid credentials"
│  • Update lastLogin  │
└────────┬─────────────┘
         │
         │ Return: User object
         ▼
┌──────────────────────┐
│  localStorage        │
│  Update:             │
│  • current session   │
│  • lastLogin time    │
└────────┬─────────────┘
         │
         │ Success!
         ▼
    User logged in
   (Redirected to app)
```

### 3. Forgot Password Flow

```
   User
    │
    │ Enters: email
    ▼
┌─────────────────────┐
│  ForgotPasswordPage │
└──────────┬──────────┘
           │
           │ findUserByEmail(email)
           ▼
┌──────────────────────┐
│  userStorage.ts      │
│  • Search database   │ ───► Not found? → Error: "No account found"
└──────────┬───────────┘
           │
           │ User found!
           ▼
┌──────────────────────┐
│  Generate Token      │
│  • Random token      │
│  • Timestamp         │
│  • 1hr expiry        │
└──────────┬───────────┘
           │
           │ Store: password_reset_token
           ▼
┌──────────────────────┐
│  Show success        │
│  "Reset link sent"   │
└──────────┬───────────┘
           │
           │ Navigate to Reset Password
           ▼
   Reset Password Page
```

### 4. Reset Password Flow

```
   User
    │
    │ Enters: new password
    ▼
┌─────────────────────┐
│  ResetPasswordPage  │
└──────────┬──────────┘
           │
           │ Validate token
           ▼
┌──────────────────────┐
│  Check token         │
│  • Exists?           │ ───► No? → Error: "Invalid token"
│  • Expired?          │ ───► Yes? → Error: "Expired token"
└──────────┬───────────┘
           │
           │ Token valid!
           │ updateUserPassword(email, newPassword)
           ▼
┌──────────────────────┐
│  userStorage.ts      │
│  • Find user         │
│  • Update password   │
│  • Save database     │
└──────────┬───────────┘
           │
           │ Update session if same user
           ▼
┌──────────────────────┐
│  localStorage        │
│  Update:             │
│  • users_db          │
│  • current session   │
│  Delete:             │
│  • reset token       │
└──────────┬───────────┘
           │
           │ Success!
           ▼
  "Password reset complete"
     (Redirect to login)
```

### 5. Change Password Flow

```
   User (logged in)
    │
    │ Enters: current password, new password
    ▼
┌─────────────────────┐
│  ChangePasswordPage │
└──────────┬──────────┘
           │
           │ Get current user from session
           │ findUserByEmail(user.email)
           ▼
┌──────────────────────┐
│  Verify current pass │
│  • Get from DB       │ ───► Wrong? → Error: "Incorrect password"
│  • Compare           │
└──────────┬───────────┘
           │
           │ Current password correct!
           │ updateUserPassword(email, newPassword)
           ▼
┌──────────────────────┐
│  userStorage.ts      │
│  • Update password   │
│  • Save database     │
└──────────┬───────────┘
           │
           │ Sync session
           ▼
┌──────────────────────┐
│  localStorage        │
│  Update:             │
│  • users_db          │
│  • current session   │
└──────────┬───────────┘
           │
           │ Success!
           ▼
  "Password changed successfully"
     (Stay on settings)
```

### 6. Delete Account Flow

```
   User (logged in)
    │
    │ Confirms deletion
    ▼
┌─────────────────────┐
│  SettingsPage       │
└──────────┬──────────┘
           │
           │ deleteUser(userId)
           ▼
┌──────────────────────┐
│  userStorage.ts      │
│  • Find user         │
│  • Remove from DB    │
│  • Save database     │
└──────────┬───────────┘
           │
           │ User deleted!
           ▼
┌──────────────────────┐
│  Clear localStorage  │
│  • users_db updated  │
│  • session cleared   │
│  • all data cleared  │
└──────────┬───────────┘
           │
           │ Success!
           ▼
  "Account deleted successfully"
        (Sign out)
```

---

## Data Synchronization Flow

```
┌─────────────────────────────────────────────────────────┐
│                  Any Auth Operation                      │
└───────────────────────┬─────────────────────────────────┘
                        │
                        ▼
        ┌───────────────────────────────┐
        │   Update in Memory (RAM)      │
        │   • Modify user object        │
        └───────────────┬───────────────┘
                        │
                        ▼
        ┌───────────────────────────────┐
        │   Update Main Database        │
        │   • skillsync_users_db        │
        │   • Update metadata timestamp │
        └───────────────┬───────────────┘
                        │
                        ▼
        ┌───────────────────────────────┐
        │   Update Session (if needed)  │
        │   • skillsync_user            │
        └───────────────┬───────────────┘
                        │
                        ▼
        ┌───────────────────────────────┐
        │   Save to localStorage        │
        │   • Serialize to JSON         │
        │   • Store in browser          │
        └───────────────┬───────────────┘
                        │
                        ▼
        ┌───────────────────────────────┐
        │   Notify User                 │
        │   • Toast notification        │
        │   • Update UI                 │
        └───────────────────────────────┘
```

---

## Multi-User Support

```
┌──────────────────────────────────────────────────────────┐
│              skillsync_users_db                          │
│                                                          │
│  ┌─────────────────────────────────────────────────┐    │
│  │  users: [                                        │    │
│  │    {id: 1, email: "user1@test.com", ...},  ◄────┼────┼── User 1
│  │    {id: 2, email: "user2@test.com", ...},  ◄────┼────┼── User 2
│  │    {id: 3, email: "user3@test.com", ...},  ◄────┼────┼── User 3
│  │  ]                                               │    │
│  └─────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────┘
                           │
                           │ Login as User 2
                           ▼
┌──────────────────────────────────────────────────────────┐
│              skillsync_user (Session)                    │
│                                                          │
│  ┌─────────────────────────────────────────────────┐    │
│  │  {                                               │    │
│  │    id: 2,                                        │    │
│  │    email: "user2@test.com",                      │    │
│  │    name: "User Two",                             │    │
│  │    isAuthenticated: true                         │    │
│  │  }                                               │    │
│  └─────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────┘
                           │
                           │ All operations affect User 2 only
                           ▼
              User 2's app experience
```

---

## Error Handling Flow

```
┌─────────────────────┐
│   User Operation    │
└──────────┬──────────┘
           │
           ▼
┌──────────────────────┐
│  Try operation       │
└──────────┬───────────┘
           │
           ├────► Success? ────► Continue normal flow
           │
           └────► Error?
                    │
                    ▼
           ┌────────────────┐
           │  Catch error   │
           │  • Log error   │
           │  • Set state   │
           └────────┬───────┘
                    │
                    ▼
           ┌────────────────┐
           │  Show toast    │
           │  • Error msg   │
           │  • Red color   │
           └────────┬───────┘
                    │
                    ▼
           ┌────────────────┐
           │  Keep user     │
           │  on same page  │
           └────────────────┘
```

---

## Component Interaction Map

```
┌──────────────────────────────────────────────────────────────────┐
│                         App.tsx                                  │
│                    (Main Container)                              │
└────┬─────────────────────────────────────────────────────────┬───┘
     │                                                          │
     │ Manages:                                                 │
     │ • currentScreen                                          │
     │ • authMode (login/signup)                                │
     │ • resetEmail                                             │
     │ • user session                                           │
     │                                                          │
     ├────────────────────┬─────────────────┬───────────────────┤
     ▼                    ▼                 ▼                   ▼
┌──────────┐      ┌──────────┐      ┌──────────┐      ┌──────────┐
│ AuthPage │      │  Forgot  │      │  Reset   │      │ Settings │
│          │      │ Password │      │ Password │      │   Page   │
└────┬─────┘      └────┬─────┘      └────┬─────┘      └────┬─────┘
     │                 │                  │                  │
     │                 │                  │                  │
     └─────────────────┴──────────────────┴──────────────────┘
                              │
                              │ All use
                              ▼
                    ┌─────────────────┐
                    │ userStorage.ts  │
                    │                 │
                    │ • createUser    │
                    │ • authenticate  │
                    │ • findUser      │
                    │ • updatePass    │
                    │ • deleteUser    │
                    └────────┬────────┘
                             │
                             │ Accesses
                             ▼
                    ┌─────────────────┐
                    │  localStorage   │
                    │  • users_db     │
                    │  • session      │
                    └─────────────────┘
```

---

## State Management

```
Application State:
┌────────────────────────────────────────────────────────┐
│                                                        │
│  In-Memory (React State):                             │
│  • currentScreen                                      │
│  • authMode                                           │
│  • form data                                          │
│  • loading states                                     │
│  • error states                                       │
│                                                        │
└────────────────────────────────────────────────────────┘

Persistent State:
┌────────────────────────────────────────────────────────┐
│                                                        │
│  localStorage:                                         │
│  ┌──────────────────────────────────────────────┐     │
│  │  skillsync_users_db         (All users)      │     │
│  ├──────────────────────────────────────────────┤     │
│  │  skillsync_user             (Session)        │     │
│  ├──────────────────────────────────────────────┤     │
│  │  password_reset_token       (Reset flow)     │     │
│  ├──────────────────────────────────────────────┤     │
│  │  skillsync_settings         (User prefs)     │     │
│  ├──────────────────────────────────────────────┤     │
│  │  skillsync_bookmarks        (Saved items)    │     │
│  └──────────────────────────────────────────────┘     │
│                                                        │
└────────────────────────────────────────────────────────┘
```

---

## Legend

```
│   Vertical flow
▼   Direction of flow
►   Alternative path
┌─┐ Container/Box
═   Important boundary
─   Connection
```

---

This diagram shows the complete architecture of the authentication system, from the UI layer down to the data storage layer, including all major flows and component interactions.
