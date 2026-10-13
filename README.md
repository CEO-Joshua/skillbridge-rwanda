# SkillBridge Rwanda

SkillBridge Rwanda is a modern platform that connects candidates, employers, and training partners in Rwanda. The platform helps talent showcase skills, discover opportunities, and build practical experience while giving businesses a fair way to find emerging talent.

## Features
- Public candidate and employer-facing website.
- Role-based access for candidates, employers, and administrators.
- Opportunity search, filtering, and detail pages.
- Candidate profile and portfolio support.
- Employer organization and verification workflow.
- Application submission and status tracking.
- Recommendation engine for relevant opportunities.
- Notification system and demo seed data.

## Tech Stack
- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL
- Auth.js (Credentials provider)
- Zod for validation

## Prerequisites
- Node.js 18+
- PostgreSQL 14+
- npm or pnpm

## Installation
```bash
npm install
cp .env.example .env
```

## Database setup
```bash
npm run prisma:generate
npm run prisma:push
npm run prisma:seed
```

## Development
```bash
npm run dev
```

Open http://localhost:3000

## Build
```bash
npm run build
```

## Notes
This repository includes demo content clearly labeled as demo data. It is intended for development and local exploration rather than production use without review.
