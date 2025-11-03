# ⚡ QUICK FIX - Get OpenAI Working in 60 Seconds

## 🚨 AI Not Working? Do This NOW:

### 1️⃣ Open `.env.local` File
Location: **Project root** (same folder as `package.json`)

### 2️⃣ Paste This Line:
```env
VITE_OPENAI_API_KEY=sk-proj-YOUR_KEY_HERE
```

### 3️⃣ Replace `YOUR_KEY_HERE` with Your Real OpenAI Key
Get it here: **https://platform.openai.com/api-keys**

### 4️⃣ Save the File
Press **Ctrl+S** (Windows/Linux) or **Cmd+S** (Mac)

### 5️⃣ Restart Dev Server
```bash
# Terminal:
# Press Ctrl+C to stop
npm run dev
```

### 6️⃣ Test It!
1. Open app in browser
2. Type: "How do I become a data scientist?"
3. Press Enter
4. See AI magic! ✨

---

## ✅ Success = You See This:
- 🤖 "Generating AI response..."
- Loading animation
- ✨ "AI Response Generated!"
- Personalized answer

## ❌ Not Working? Check This:
1. `.env.local` is in **project root** (not in any folder)
2. File name is **exactly** `.env.local` (no `.txt` extension)
3. API key starts with `sk-` or `sk-proj-`
4. You **restarted the server** (critical!)
5. Settings → AI Features shows **"Active"**

---

## 🆘 Still Broken?
Read: **TROUBLESHOOTING.md** or **API_KEY_SETUP_INSTRUCTIONS.md**

---

**That's it! 60 seconds and you're done!** ⚡
