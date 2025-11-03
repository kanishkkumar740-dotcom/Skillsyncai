# 🔧 TROUBLESHOOTING GUIDE - SKILLSYNC AI

## OpenAI Integration Not Working?

If your OpenAI API isn't being called when you search, follow these steps:

---

## ✅ Step 1: Verify Your `.env.local` File

### Location Check
The file **MUST** be in your project root (same folder as `package.json`):

```
your-project/
├── .env.local          ← HERE!
├── package.json
├── App.tsx
├── components/
└── ...
```

### File Name Check
- **CORRECT:** `.env.local`
- **WRONG:** `ai.env.local.tsx`, `.env.local.txt`, `env.local`, `.env`

### Content Check
Open `.env.local` and verify it contains:

```env
VITE_OPENAI_API_KEY=sk-proj-YOUR_ACTUAL_API_KEY_HERE
```

**Important:**
- No spaces around the `=` sign
- No quotes around the key
- Key must start with `sk-` or `sk-proj-`
- Replace `YOUR_ACTUAL_API_KEY_HERE` with your real OpenAI API key

---

## ✅ Step 2: Restart Your Development Server

**This is critical!** Environment variables are only loaded when the server starts.

```bash
# In your terminal:
# 1. Stop the server (press Ctrl+C or Cmd+C)
# 2. Restart:
npm run dev
```

---

## ✅ Step 3: Check AI Settings in the App

1. Open SKILLSYNC AI in your browser
2. Click **Profile** (bottom right)
3. Click **Settings** (gear icon, top right)
4. Scroll to **"AI Features"** section
5. Verify:
   - Status shows **"Active"** with green badge ✅
   - Toggle for "AI-Generated Responses" is **ON** (enabled)

If you see "Not Configured" instead of "Active", the API key is not being read correctly.

---

## ✅ Step 4: Test the Integration

1. Go back to **Home** screen
2. Type a question in the search box:
   - Example: "How do I become a cloud architect?"
3. Click search or press Enter
4. You should see:
   - Toast notification: "🤖 Generating AI response..."
   - Loading animation
   - Toast notification: "✨ AI Response Generated!"
   - Personalized AI answer

---

## 🐛 Common Issues & Solutions

### Issue: "Not Configured" Status

**Possible Causes:**
- `.env.local` file is in the wrong location
- File name is incorrect (check for hidden extensions)
- You haven't restarted the dev server
- API key doesn't start with `sk-`

**Solution:**
1. Delete the old `.env.local` file
2. Create a new one in project root
3. Add: `VITE_OPENAI_API_KEY=sk-your-key-here`
4. Save and restart dev server

---

### Issue: "Invalid API Key" Error

**Possible Causes:**
- Wrong API key format
- Expired or revoked key
- Copy/paste error (extra spaces)

**Solution:**
1. Go to https://platform.openai.com/api-keys
2. Create a new API key
3. Copy it carefully (no extra spaces)
4. Paste it into `.env.local`
5. Restart dev server

---

### Issue: "Rate Limit Exceeded"

**Possible Causes:**
- You've made too many API requests
- Free tier limits reached

**Solution:**
1. Wait a few minutes
2. Check your OpenAI usage at https://platform.openai.com/usage
3. Consider upgrading your OpenAI plan if needed

---

### Issue: AI Toggle is Disabled (Grayed Out)

**Cause:** OpenAI API key is not configured

**Solution:**
1. Add your API key to `.env.local`
2. Restart dev server
3. The toggle will become enabled

---

### Issue: Console Shows API Key Not Found

Open your browser's Developer Console (F12) and look for messages like:

```
🔑 OpenAI API Key Status: {
  exists: false,
  isString: false,
  ...
}
```

If `exists: false`, the API key is not being loaded. Check:
1. File location (must be in root)
2. File name (must be `.env.local`)
3. Server restart (required after changes)

---

## 🧪 Manual Testing Checklist

Copy this checklist and verify each step:

- [ ] `.env.local` file exists in project root
- [ ] File name is exactly `.env.local` (no extra extensions)
- [ ] File contains `VITE_OPENAI_API_KEY=sk-...`
- [ ] API key is valid (get it from OpenAI dashboard)
- [ ] Dev server has been restarted
- [ ] Settings page shows "Active" status
- [ ] AI toggle is ON and enabled
- [ ] Search triggers "Generating AI response" toast
- [ ] AI response is displayed successfully

---

## 🔍 Advanced Debugging

### Check Environment Variable in Browser Console

Open browser console (F12) and type:

```javascript
console.log(import.meta.env.VITE_OPENAI_API_KEY);
```

**Expected:** Your API key (starting with `sk-`)
**If undefined:** Environment variable not loaded - check file location and restart server

---

### Check Network Requests

1. Open browser DevTools (F12)
2. Go to **Network** tab
3. Search for a question
4. Look for request to `api.openai.com`
5. Check the request/response for errors

---

## 💡 Best Practices

1. **Never commit `.env.local` to Git**
   - It's already in `.gitignore`
   - Keep your API key secret!

2. **Use a separate API key for development**
   - Don't use production keys in development

3. **Monitor your usage**
   - Check https://platform.openai.com/usage regularly

4. **Keep your key secure**
   - Don't share it in screenshots, chat, or emails

---

## 🆘 Still Having Issues?

If none of these solutions work:

1. **Check the console logs:**
   - Open browser DevTools (F12)
   - Look for error messages
   - Look for the "🔑 OpenAI API Key Status" message

2. **Verify your OpenAI account:**
   - Go to https://platform.openai.com/api-keys
   - Ensure your API key is active
   - Check you have credits/billing set up

3. **Try a fresh restart:**
   ```bash
   # Stop server
   # Delete .env.local
   # Create new .env.local with API key
   npm run dev
   ```

---

## ✅ Success Indicators

You'll know everything is working when:

1. ✅ Settings page shows "AI Features: **Active**"
2. ✅ Console shows API key status with `exists: true`
3. ✅ Search triggers AI generation toast
4. ✅ You see personalized AI responses
5. ✅ Responses are marked as "AI Generated"

---

**Remember: Environment variables only load when the server starts. Always restart after making changes to `.env.local`!**
