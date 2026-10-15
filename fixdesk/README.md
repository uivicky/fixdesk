# FixDesk - IT Support Guide

## Folder structure
fixdesk/
  index.html     -> poori website (yahan SB_URL aur SB_KEY badlo)
  api/ai.js      -> AI search backend (Vercel function)
  package.json
  README.md

## Setup (4 steps)
1. index.html kholo, upar SB_URL aur SB_KEY mein apni Supabase values daalo.
2. Supabase > Authentication > URL Configuration mein apna Vercel link Site URL + Redirect URL me daalo.
3. GitHub par push karo, Vercel par Import + Deploy karo.
4. Vercel > Settings > Environment Variables: ANTHROPIC_API_KEY add karo, phir Redeploy.

Optional: REQUIRE_LOGIN=true, SUPABASE_URL, SUPABASE_ANON_KEY (AI sirf login users ke liye).

## Naya issue add karna
index.html me D array mein ek line add karo:
['Category','Title','step1|step2|step3'],
