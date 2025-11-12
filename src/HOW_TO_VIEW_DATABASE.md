# 🔍 How to View Your User Database

## The users.json file doesn't update - here's why:

The `/data/users.json` file is just a **template/reference** showing the database structure. It's NOT the actual database.

## Where is the REAL database?

Your actual user data is stored in **localStorage** in your browser.

---

## 🎯 Method 1: View Database in Console

1. Open your browser DevTools (F12 or right-click → Inspect)
2. Go to **Console** tab
3. Paste this command:

```javascript
console.log(JSON.parse(localStorage.getItem('skillsync_users_db')))
```

This will show you ALL users in your database!

---

## 🎯 Method 2: View in Application Storage

1. Open DevTools (F12)
2. Go to **Application** tab (Chrome) or **Storage** tab (Firefox)
3. Expand **Local Storage** in the left sidebar
4. Click on your site URL
5. Find the key: `skillsync_users_db`
6. Click on it to see the value (all users)

---

## 🎯 Method 3: Export Database to File

In the browser console, run:

```javascript
// Import the export function
import { exportDatabase } from './utils/userStorage';

// Export and download
const dbData = exportDatabase();
console.log(dbData);

// To copy to clipboard
copy(dbData);
```

Or create a temporary download:

```javascript
const dbData = localStorage.getItem('skillsync_users_db');
const blob = new Blob([dbData], { type: 'application/json' });
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'skillsync-database.json';
a.click();
```

---

## 📊 What You'll See:

```json
{
  "users": [
    {
      "id": 1731456789123,
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

---

## 🔑 All localStorage Keys Used:

- `skillsync_users_db` - Main user database
- `skillsync_credentials_log` - Auto-saved login credentials
- `skillsync_user` - Currently logged in user
- `skillsync_settings` - User settings
- `skillsync_bookmarks` - Saved questions
- `skillsync_notifications` - Notifications
- `skillsync_recent_searches` - Search history
- `skillsync_recently_viewed` - Recently viewed items

---

## 💡 Quick Access Commands:

### View all users:
```javascript
JSON.parse(localStorage.getItem('skillsync_users_db')).users
```

### View credentials log:
```javascript
console.log(localStorage.getItem('skillsync_credentials_log'))
```

### View current logged-in user:
```javascript
JSON.parse(localStorage.getItem('skillsync_user'))
```

### Count total users:
```javascript
JSON.parse(localStorage.getItem('skillsync_users_db')).users.length
```

---

## ⚠️ Important Notes:

1. **localStorage is browser-specific** - Data saved in Chrome won't appear in Firefox
2. **localStorage is domain-specific** - Each website has its own localStorage
3. **Incognito/Private mode** - localStorage is cleared when you close the window
4. **The users.json file never changes** - It's just documentation!

---

## 🧪 Testing Tips:

To create test users quickly, run in console:

```javascript
import { createUser } from './utils/userStorage';

createUser({ name: 'Test User', email: 'test@test.com', password: 'test123' });
```

To reset the database:

```javascript
import { resetDatabase } from './utils/userStorage';
resetDatabase();
```

---

## 🎓 Summary:

- ❌ `/data/users.json` = Static template (never updates)
- ✅ `localStorage['skillsync_users_db']` = Real database (updates automatically)
- 📥 Use DevTools → Application → Local Storage to view data
- 📝 Credentials are auto-logged to `skillsync_credentials_log`
