# OpenAI Integration Setup Guide

## 🚀 Setting Up OpenAI API for SKILLSYNC AI

Your SKILLSYNC AI platform now supports real-time AI-powered career guidance using OpenAI's GPT models!

### Step 1: Get Your OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in to your account
3. Navigate to **API Keys** section
4. Click **"Create new secret key"**
5. Copy your API key (it starts with `sk-`)

⚠️ **IMPORTANT**: Keep your API key secret! Never share it or commit it to version control.

### Step 2: Configure Your Environment

1. **Create a `.env.local` file** in your project root directory (same level as `package.json`):

```bash
# Create the file
touch .env.local
```

2. **Add your API key** to `.env.local`:

```env
VITE_OPENAI_API_KEY=sk-your-actual-api-key-here
```

Replace `sk-your-actual-api-key-here` with your actual OpenAI API key.

3. **Add `.env.local` to `.gitignore`** to prevent committing secrets:

```
.env.local
.env
*.env.local
```

### Step 3: Restart Your Development Server

After adding the API key, restart your development server:

```bash
# Stop the server (Ctrl+C)
# Then restart
npm run dev
# or
yarn dev
```

### Step 4: Test the Integration

1. Go to your SKILLSYNC AI app
2. Type a career question in the search bar
3. If OpenAI is configured correctly, you'll see:
   - "🤖 Generating AI response..." toast notification
   - A personalized AI-generated answer
   - "✨ AI Response Generated!" success message

## 🎯 How It Works

### AI-First Search Flow

1. **User enters a question** → If AI is enabled and configured, generates AI response
2. **AI generates answer** → Uses GPT-3.5-turbo with SKILLSYNC AI system prompt
3. **Response displayed** → User gets personalized career guidance
4. **Fallback** → If AI is disabled, searches existing database

### Features

- ✅ **AI-First Approach**: Generates fresh, personalized responses for every question when AI is enabled
- ✅ **Category Detection**: Automatically categorizes questions (Tech, Business, Healthcare, Arts)
- ✅ **Error Handling**: Graceful fallback to database with user-friendly error messages
- ✅ **Toggle Control**: Enable/disable AI responses in Settings
- ✅ **Toast Notifications**: Real-time feedback during AI generation
- ✅ **Smart Fallback**: Uses database questions if AI is disabled or fails

## 💰 Pricing & Usage

OpenAI charges based on token usage:
- **GPT-3.5-turbo**: ~$0.002 per 1,000 tokens
- Average question/answer: ~500 tokens = **$0.001 per query**

**Free Tier**: New OpenAI accounts get **$5 free credit** (≈5,000 queries!)

Monitor your usage at: https://platform.openai.com/usage

## 🔧 Configuration Options

You can modify the AI behavior in `/utils/openai.ts`:

```typescript
// Change the model
model: 'gpt-4' // More powerful but more expensive

// Adjust creativity (0-2, higher = more creative)
temperature: 0.7

// Adjust response length
max_tokens: 600
```

## 🐛 Troubleshooting

### "OpenAI API key is not configured" Error

**Solution**: 
1. Check if `.env.local` exists in project root
2. Verify the key starts with `sk-`
3. Restart the dev server after adding the key

### "Invalid API key" Error (401)

**Solution**:
1. Verify your API key is correct
2. Check if the key is still active in OpenAI dashboard
3. Generate a new key if needed

### "Rate limit exceeded" Error (429)

**Solution**:
1. You've exceeded your quota
2. Wait a few minutes or upgrade your OpenAI plan
3. Check usage at https://platform.openai.com/usage

### "Network error"

**Solution**:
1. Check your internet connection
2. Verify firewall isn't blocking api.openai.com
3. Try again in a few moments

## 🔒 Security Best Practices

1. ✅ **Never commit `.env.local`** to version control
2. ✅ **Use environment variables** for API keys
3. ✅ **Rotate keys regularly** (every 90 days)
4. ✅ **Set usage limits** in OpenAI dashboard
5. ✅ **Monitor usage** to prevent unexpected charges

## 📊 Monitoring & Analytics

Track AI usage in your app:
- Recent searches are saved to localStorage
- Feedback data is stored for analytics
- View admin monitoring dashboard for user activity

## 🚀 Production Deployment

For production (NOT recommended for client-side):

**Better approach**: Use a backend/Supabase Edge Function
- Keeps API key secure (not exposed to browser)
- Better rate limiting control
- Additional security layers

Current implementation works for:
- ✅ Personal projects
- ✅ Internal tools
- ✅ Prototypes/demos
- ❌ Public-facing production apps (security risk)

## 📞 Support

Need help?
- OpenAI Docs: https://platform.openai.com/docs
- SKILLSYNC AI Help Center: Settings → Help & Support
- GitHub Issues: [Your repo issues page]

---

**Made with 💜 by SKILLSYNC AI Team**
