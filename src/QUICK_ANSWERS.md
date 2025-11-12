# ⚡ Quick Answers

## Q: Where can I find the credentials download button?

**A: In Settings → Scroll down to "Test Credentials" (blue card)**

Steps:
1. Click **Settings** icon (gear) in bottom navigation
2. Scroll down past all settings
3. Look for **blue card** labeled "Test Credentials"
4. Click **"Download Credentials Log"** button
5. File downloads automatically!

---

## Q: Why doesn't users.json update?

**A: Because it's just a template! The real database is in localStorage.**

### What's What:

| File/Storage | Purpose | Updates? |
|--------------|---------|----------|
| `/data/users.json` | Template/Reference | ❌ Never |
| `localStorage` | Real Database | ✅ Always |

---

## Q: Where is my actual user data?

**A: In localStorage! Here's how to view it:**

### Option 1: Browser DevTools (Easiest)
1. Press **F12** (or right-click → Inspect)
2. Go to **Application** tab
3. Click **Local Storage** → Your site URL
4. Look for key: `skillsync_users_db`
5. Click to see ALL users!

### Option 2: Console Command
1. Press **F12**
2. Go to **Console** tab
3. Paste this:
```javascript
console.log(JSON.parse(localStorage.getItem('skillsync_users_db')))
```

### Option 3: In-App Buttons
1. Go to **Settings**
2. Scroll to **"Test Credentials"** section (blue card)
3. Click **"View in Console"** button
4. Open console (F12) to see the log

---

## Q: How do I see all my saved passwords?

**A: Two ways:**

### Method 1: Download File
1. Settings → "Test Credentials" → "Download Credentials Log"
2. Opens a .txt file with everything!

### Method 2: View in Console
1. Settings → "Test Credentials" → "View in Console"
2. Check browser console (F12)

---

## Q: What gets auto-saved?

**A: Every time you:**
- ✅ Sign up (new account)
- ✅ Login
- ✅ Reset password

The system automatically saves:
- Email
- Password
- Name
- Timestamp
- Action type

---

## Q: How do I test if auto-save is working?

**Easy test:**
1. Create a new account (or login)
2. Go to Settings
3. Click "View in Console" in Test Credentials section
4. Check console - you should see your credentials!

---

## Q: Can I export my entire database?

**Yes! Two ways:**

### Quick Way (Console):
```javascript
// Copy this into console
const db = localStorage.getItem('skillsync_users_db');
console.log(db);
```

### Download Way (Console):
```javascript
// Copy this into console
const dbData = localStorage.getItem('skillsync_users_db');
const blob = new Blob([dbData], { type: 'application/json' });
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'my-database.json';
a.click();
```

---

## Q: What if I lose my password?

**A: No problem! You have options:**

1. **Download the log** from Settings → Test Credentials
2. **View in console** - Settings → Test Credentials → View in Console
3. **Check localStorage** - DevTools → Application → Local Storage → `skillsync_credentials_log`
4. **Use Forgot Password** - It's fully functional!

---

## Q: Where is everything stored?

**All localStorage keys:**

| Key | What It Stores |
|-----|----------------|
| `skillsync_users_db` | 🗄️ Main user database |
| `skillsync_credentials_log` | 📝 Auto-saved credentials |
| `skillsync_user` | 👤 Current logged-in user |
| `skillsync_settings` | ⚙️ App settings |
| `skillsync_bookmarks` | ⭐ Saved questions |
| `skillsync_notifications` | 🔔 Notifications |
| `skillsync_recent_searches` | 🔍 Search history |
| `skillsync_recently_viewed` | 👁️ Recently viewed |

---

## 🎯 Most Common Tasks:

### See all users:
```javascript
JSON.parse(localStorage.getItem('skillsync_users_db')).users
```

### See credentials log:
Settings → Test Credentials → Download OR View in Console

### Count users:
```javascript
JSON.parse(localStorage.getItem('skillsync_users_db')).users.length
```

### Reset everything:
Settings → Danger Zone → Clear All Data

---

## 🚨 Important Notes:

1. **Browser-specific** - Chrome and Firefox have separate localStorage
2. **Incognito mode** - Data deleted when window closes
3. **The users.json file is decoration** - It never changes, it's just documentation!
4. **All real data** is in localStorage
5. **Credentials auto-save** happens in the background automatically

---

## 💡 Pro Tips:

- Keep the console open (F12) while testing to see auto-save confirmations
- Use "Download Credentials Log" after creating multiple test accounts
- The blue "Test Credentials" card in Settings is your friend!
- Check `HOW_TO_VIEW_DATABASE.md` for advanced commands

---

**Still stuck? Check these files:**
- `/HOW_TO_VIEW_DATABASE.md` - Detailed database viewing guide
- `/START_HERE_AUTH.md` - Authentication system overview
- `/AUTH_STORAGE_GUIDE.md` - Complete system documentation
