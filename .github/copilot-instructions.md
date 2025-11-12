# Copilot / AI Agent Instructions for SKILLSYNC AI

Quick, actionable guidance to get an AI coding agent productive in this repository.

- Project type: React + Vite + TypeScript SPA (src/*.tsx). Dev server: `npm run dev` (Vite).
- Dev server default port is configured in `vite.config.ts` as port 3000 (open flag true).

Key concepts and where to look
- OpenAI integration (core): `src/utils/openai.ts` — contains the GPT prompt, model, temperature, token limits, and a DEMO_MODE flag. If DEMO_MODE === true the app uses internal mock responses; set to false and provide `VITE_OPENAI_API_KEY` to call the real API.
- Mock / enhanced AI logic: `src/services/aiCareerAdvisor.ts` — large library of domain knowledge, question detection, and `generateAIResponse`/`searchCareerQuestions`. Useful for offline testing and examples of expected AI outputs.
- Search & UI flow: `src/App.tsx` — orchestrates search + AI flow. Note: code was changed to use an "AI-first" behavior when AI is enabled (see comments in docs).
- Settings toggle and status: `src/components/SettingsPage.tsx` — controls the AI enabled/disabled toggle and shows Active / Not Configured badges.

Important workflows & commands
- Install: `npm i`. Dev: `npm run dev`. Build: `npm run build` (Vite). These are defined in `package.json`.
- To test live OpenAI calls:
  1. Create a `.env.local` in the project root with: `VITE_OPENAI_API_KEY=sk-...`
  2. Edit `src/utils/openai.ts`: set `DEMO_MODE = false`.
  3. Restart the dev server. The module logs OpenAI key status to the browser console for quick verification.

Project-specific conventions and gotchas
- Environment variable name: `VITE_OPENAI_API_KEY` (starts with VITE_ which exposes it to the client bundle). The repository currently contains a placeholder/hardcoded key in `utils/openai.ts` for demo—do not commit real keys. Docs and .gitignore references exist to protect `.env.local`.
- Debugging: `src/utils/openai.ts` prints a helpful console object: "🔑 OpenAI API Key Status" — use this to verify env/key loading quickly.
- AI-first flow: The app prefers generating AI responses when `isOpenAIConfigured()` && AI toggle enabled. If you need database-first behavior, edit `src/App.tsx` search logic accordingly (see IMPLEMENTATION_SUMMARY.md for rationale).

Where to change behavior (concrete examples)
- Adjust model / temperature / tokens: `src/utils/openai.ts` — change model, `temperature`, and `max_tokens` in the fetch body.
- Modify system prompt / persona: edit the `system` message content inside `utils/openai.ts`.
- Extend or tweak mock responses and detectors: `src/services/aiCareerAdvisor.ts` — functions like `detectCategory`, `detectQuestionType`, and `generateAIResponse` show patterns to follow.

Safety, security, and production notes (discoverable from repo)
- Current implementation exposes the API key client-side via Vite env (VITE_ prefixed). For production you should move OpenAI calls to a backend/edge function (this repo's docs mention that as a recommended change).
- Many docs are present: `OPENAI_SETUP.md`, `QUICK_START.md`, `QUICK_FIX.md`, `TROUBLESHOOTING.md`, `IMPLEMENTATION_SUMMARY.md`. Use them as canonical source for onboarding steps and to understand why AI-first behavior was adopted.

Quick examples you can reference in edits
- To add a new prompt variant: update `system` message in `src/utils/openai.ts` and run the app.
- To test without billing: keep `DEMO_MODE = true` in `src/utils/openai.ts` (mock module provides extensive sample outputs in `aiCareerAdvisor.ts`).

If something's unclear or you need more:
- Tell me whether you want stricter security guidance (move key server-side) or changes to the search flow (AI-first → DB-first), and I will update the instructions or implement the change.

---
References (files to inspect first):
- `src/utils/openai.ts` (core integration)
- `src/services/aiCareerAdvisor.ts` (mock AI + detectors)
- `src/App.tsx` (search + orchestration)
- `src/components/SettingsPage.tsx` (ui control for AI)
- `OPENAI_SETUP.md`, `IMPLEMENTATION_SUMMARY.md`, `QUICK_START.md`, `QUICK_FIX.md`, `TROUBLESHOOTING.md`
