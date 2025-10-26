
# HouseHive.ai — Frontend (Vercel Ready)

Next.js 14 app wired to your backend API at:
**https://househive-backend-server-1.onrender.com/api**

## Quick start (local)
```bash
npm install
npm run dev
# open http://localhost:3000
```

## Deploy to Vercel
1. Push this folder to a GitHub repo.
2. Vercel → New Project → Import the repo.
3. Set Environment Variable:
   - `NEXT_PUBLIC_API_BASE` = `https://househive-backend-server-1.onrender.com/api`
4. Deploy.

## Pages
- `/` — Login / Register
- `/dashboard` — Welcome + plan
- `/properties` — Add/list properties
- `/tasks` — Add/list maintenance tasks
- `/messages` — HiveBot chat
- `/billing` — Stripe checkout/portal
