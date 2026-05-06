# Architecture

## Stack
- React
- TypeScript
- Tailwind CSS
- Node.js
- Express
- Supabase

## Data Flow
User Input → Audit Engine → Savings Calculation → AI Summary → Results Page → Lead Storage

## Future Scaling
For handling 10k audits/day:
- Add Redis caching
- Queue AI requests
- Optimize database indexing