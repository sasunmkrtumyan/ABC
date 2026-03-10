# ABC - Armenian Business Club

Next.js + Tailwind + Firebase portal for Armenian Business Club.

## Pages

- `/` landing page with animated sections and partner logo slider
- `/about` about Armenian business community
- `/partners` searchable/filterable/paginated partners table
- `/partner/[slug]` dynamic partner details page
- `/contact` contact information page
- `/admin` Armenian-only admin panel (login + CRUD)

## Stack

- Next.js (App Router)
- Tailwind CSS
- Firebase Auth + Firestore + Storage

## Setup

1. Copy env values:

```bash
cp .env.example .env.local
```

2. Install dependencies:

```bash
npm install
```

3. Run dev server:

```bash
npm run dev
```

## Firebase console steps (required)

Before using admin CRUD or seeding partners, complete these once:

1. In Firebase Console, enable **Authentication** and add a user with:
   - Email: same as `NEXT_PUBLIC_ADMIN_EMAIL`
   - Password: `Ernestabc1111`
2. Enable **Cloud Firestore** for project `abc1111-30d44`.
3. Enable **Firebase Storage** for project `abc1111-30d44`.

## Admin login

- Username: `abc1111`
- Password: `Ernestabc1111`

Important: Firebase Auth uses email/password internally.  
Set `NEXT_PUBLIC_ADMIN_EMAIL` to the email of your Firebase admin user and create that user in Firebase Authentication.

## Seed mock partners

This project includes ~20 mock partners.

```bash
npm run seed:partners
```
