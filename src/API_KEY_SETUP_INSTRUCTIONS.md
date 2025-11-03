# 🔑 API KEY SETUP - QUICK START GUIDE

## Follow These Exact Steps

### Step 1: Get Your OpenAI API Key

1. Go to: **https://platform.openai.com/api-keys**
2. Sign in to your OpenAI account
3. Click **"Create new secret key"**
4. Give it a name like "SkillSync AI Development"
5. Copy the key (it starts with `sk-proj-...` or `sk-...`)
6. **IMPORTANT:** Save it somewhere safe - you can only see it once!

---

### Step 2: Create `.env.local` File

**Where?** In your project's root folder (same level as `package.json`)

**How?** 

#### Option A: Using Terminal/Command Line
```bash
# Navigate to your project folder
cd path/to/your/skillsync-project

# Create the file
touch .env.local

# Open it in your editor
code .env.local
# OR
nano .env.local
```

#### Option B: Using Your Code Editor
1. Open VS Code, Cursor, or your editor
2. File → New File
3. Save as `.env.local` in your project root

---

### Step 3: Add Your API Key

Open `.env.local` and add **exactly** this line:

```env
VITE_OPENAI_API_KEY=sk-proj-YOUR_ACTUAL_KEY_HERE
```

**Replace** `sk-proj-YOUR_ACTUAL_KEY_HERE` with the actual key you copied from OpenAI.

**Example:**
```env
VITE_OPENAI_API_KEY=sk-proj-Ab3dEf9GhIjKlMnOpQrStUvWxYz1234567890AbCdEfGhIjKl
```

**Important Rules:**
- ✅ No spaces around `=`
- ✅ No quotes around the key
- ✅ Key must start with `sk-` or `sk-proj-`
- ✅ One line only
- ✅ Save the file!

---

### Step 4: Verify File Location

Your project structure should look like this:

```
your-skillsync-project/
├── .env.local          ← YOUR FILE MUST BE HERE!
├── package.json        ← Same level as this
├── App.tsx
├── components/
├── styles/
├── utils/
└── ...
```

**NOT** inside any folder like `src/`, `components/`, etc.!

---

### Step 5: Restart Your Development Server

**CRITICAL STEP!** Environment variables only load when the server starts.

```bash
# In your terminal where the server is running:

# 1. Stop the server
#    Press: Ctrl+C (Windows/Linux) or Cmd+C (Mac)

# 2. Start it again
npm run dev
```

You should see output like:
```
VITE v5.x.x  ready in XXX ms

➜  Local:   http://localhost:5173/
```

---

### Step 6: Test in the App

1. **Open the app** in your browser (usually http://localhost:5173)

2. **Go to Settings:**
   - Click **Profile** (bottom navigation, right side)
   - Click **Settings** (gear icon, top right)

3. **Verify AI Status:**
   - Scroll to **"AI Features"**
   - Should show: **"Active"** with green badge ✅
   - Toggle should be ON and enabled (not grayed out)

4. **Test AI Generation:**
   - Go back to **Home**
   - Type a question: "How do I become a data scientist?"
   - Press Enter or click search
   - You should see:
     - 🤖 "Generating AI response..."
     - Loading animation
     - ✨ "AI Response Generated!"
     - A personalized answer

---

## ✅ SUCCESS! You're Done!

If you see "Active" status and AI responses are generating, everything is working perfectly!

---

## ❌ Troubleshooting

### "Not Configured" Status?

**Check:**
1. File name is exactly `.env.local` (not `.env.local.txt`)
2. File is in project root (not in a subfolder)
3. You restarted the dev server
4. API key starts with `sk-`

**Try:**
```bash
# Check if file exists
ls -la .env.local

# Should show: .env.local

# Check file contents
cat .env.local

# Should show: VITE_OPENAI_API_KEY=sk-...
```

---

### "Invalid API Key" Error?

1. Go to https://platform.openai.com/api-keys
2. Check if your key is still active
3. If not, create a new one
4. Replace in `.env.local`
5. Restart server

---

### Still Not Working?

See **TROUBLESHOOTING.md** for detailed debugging steps.

---

## 🔒 Security Reminder

**NEVER:**
- ❌ Commit `.env.local` to Git
- ❌ Share your API key with anyone
- ❌ Post your key in chat/forums/screenshots
- ❌ Use production keys in development

**ALWAYS:**
- ✅ Keep `.env.local` in `.gitignore` (already done)
- ✅ Use separate keys for dev/production
- ✅ Monitor your usage at OpenAI dashboard
- ✅ Revoke keys if they're exposed

---

## 🎉 That's It!

You're all set to use SKILLSYNC AI with OpenAI integration!

**Questions?** Check TROUBLESHOOTING.md or OPENAI_SETUP.md for more details.
