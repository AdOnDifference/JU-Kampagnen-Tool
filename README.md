# JU Kampagnen‑Kit

Wahlkampf‑Planungs‑ und Haustür‑Tool als Next.js 14 App mit Prisma/SQLite & Tailwind.

## Schnellstart
```bash
# 1) Abhängigkeiten
npm install

# 2) .env anlegen
cp .env.example .env

# 3) DB migrieren
npm run prisma:migrate -- --name init

# 4) Dev starten
npm run dev
```

## Features (MVP)
- Walklists & Besuchsprotokoll
- Anliegen‑Board
- A/B‑Flyer‑Generator (Stub)
- Presse‑Draft‑Generator (Stub)
- Kampagnen‑Plan (Seed vom E‑Day), Schichtplanung, Content‑Kalender
- Exporte: CSV, ICS, Tableau‑CSV
- Budget‑Tracking (Varianz)

**Hinweis:** LLM‑Aufrufe sind als Stubs implementiert (`lib/llm.ts`).

## Env
```
DATABASE_URL="file:./dev.db"
```

## Prisma Studio (optional)
```bash
npx prisma studio
```
