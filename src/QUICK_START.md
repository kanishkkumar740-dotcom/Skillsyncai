# 🚀 Quick Start: OpenAI Integration

## ⚡ 3-Minute Setup

### 1️⃣ Get Your OpenAI API Key
- Visit: https://platform.openai.com/api-keys
- Click "Create new secret key"
- Copy the key (starts with `sk-`)

### 2️⃣ Create Environment File
In your project root, create `.env.local`:

```bash
VITE_OPENAI_API_KEY=sk-paste-your-key-here
```

### 3️⃣ Restart Your Server
```bash
# Stop server (Ctrl+C), then:
npm run dev
```

### 4️⃣ Test It!
1. Open your app
2. Search for: "How do I become an AI engineer?"
3. Watch the magic happen! ✨

---

## ✅ How to Know It's Working

### In the Settings Page:
- Go to **Profile → Settings**
- Look for **"AI Features"** section
- Should show: **"Active"** with green badge
- Toggle should be enabled

### When Searching:
1. Type a NEW question (not in database)
2. You'll see: **"🤖 Generating AI response..."**
3. Wait 2-3 seconds
4. Get personalized AI answer
5. See: **"✨ AI Response Generated!"**

---

## 🔍 Features Overview

### Smart Search Flow:
```
User asks question
    ↓
Search database first
    ↓
No match? → Use OpenAI
    ↓
Display AI answer
```

### What's Included:
- ✅ Real-time AI responses
- ✅ Smart category detection
- ✅ Toast notifications
- ✅ Settings toggle
- ✅ Error handling
- ✅ Cost-efficient (only calls when needed)

---

## 💡 Example Questions to Try

**Tech:**
- "How do I transition from web dev to AI/ML?"
- "What's the career path for a DevOps engineer?"

**Business:**
- "How do I break into product management with no experience?"
- "What skills do I need for a startup founder?"

**Healthcare:**
- "How do I become a physician assistant?"
- "What's the difference between RN and NP?"

**Creative:**
- "How do I build a portfolio for UX design?"
- "What does a day look like for a motion graphics designer?"

---

## 🐛 Troubleshooting

### "Not Configured" in Settings?
- Check `.env.local` exists
- Verify key starts with `sk-`
- Restart dev server

### No AI responses?
- Check Settings → AI Features toggle
- Verify OpenAI account has credits
- Check browser console for errors

### "Invalid API key" error?
- Key might be revoked
- Generate new key on OpenAI dashboard
- Update `.env.local`

---

## 💰 Cost Info

- **GPT-3.5-turbo:** ~$0.001 per question
- **Free tier:** $5 credit = ~5,000 questions
- **Monitor usage:** https://platform.openai.com/usage

---

## 🔒 Security Reminder

⚠️ **IMPORTANT:**
- Never share your API key
- Never commit `.env.local` to git
- Check `.gitignore` includes `.env.local`

---

## 📚 Next Steps

1. ✅ Set up OpenAI (you're here!)
2. 📖 Read full docs: `OPENAI_SETUP.md`
3. 🎨 Customize in: `/utils/openai.ts`
4. 🚀 Deploy with backend for production

---

**Need Help?**
- Full guide: See `OPENAI_SETUP.md`
- Code location: `/utils/openai.ts`
- Settings: `/components/SettingsPage.tsx`

**Made with 💜 by SKILLSYNC AI**
