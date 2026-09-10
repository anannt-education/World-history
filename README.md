# Anannt AP World History: Modern

A course product from **Anannt Education** for **AP World History: Modern**, pinned to the **May 2027** exam.

This repository is a **limited Unit 2 (Networks of Exchange) pilot**. It is not a complete nine-unit course, not a mock-exam engine, and not a College Board product. The College Board is the official source of the AP World History: Modern Course and Exam Description. Anannt Education is not affiliated with or endorsed by the College Board.

## What this build is

One complete learning loop a student can finish in a sitting, with a live mentor report on the same device:

1. Public landing, About, and Help (crawlable) describing the Unit 2 loop and 2027 exam shape
2. Short onboarding (2027 default, weekly hours, Foundation / Standard / Revision as planning hypotheses)
3. Lesson with the required structure (objective, dated schematic map/timeline, explanation, worked comparison, sourced Pegolotti task, retrieval before explanations, monsoon transfer, exit check + scheduled review)
4. Stimulus-based MCQ set (original items, every-option rationales, 2027 format label, diagnosis-linked next practice)
5. Source-based short response (2027 SAQ note), provisional feedback, one-paragraph revision
6. Delayed check on a **fresh** Boccaccio plague source, plus an honest “Simulate 7-day delay” demo control
7. Mentor report distinguishing exposure, assisted work, independent work, retention, and pending scores

Learner work persists in **browser localStorage**. There is no account system and no remote database.

## How to run locally

Requires Node.js 20+ and npm.

```bash
npm install
npm run dev -- --port 43127 --hostname 0.0.0.0
```

Open [http://127.0.0.1:43127](http://127.0.0.1:43127). The first page is a public landing. The study loop lives under `/today`, `/course`, `/learn/unit-2`, and related routes after onboarding.

```bash
npm run build
npm start -- --port 43127
```

Optional: set `NEXT_PUBLIC_SITE_URL` to the public origin so metadata, canonical URLs, `sitemap.xml`, and JSON-LD use that host.

## Roles

Use **Student | Mentor** in the study-app header. Both views read the same local record so the mentor report is live.

## Sources

Primary extracts are public-domain translations (Pegolotti via Yule 1916; Ibn Battuta via Gibb 1929; Boccaccio via Rigg 1921). Modern teaching paraphrases are labeled **Teaching paraphrase (not a primary-source quotation).** No invented quotation is presented as a primary source.

## What is deliberately not here

Full 9-unit curriculum, 900 MCQs, mock engine, billing, AI tutor, CMS, and authentication. Those are later gates. Empty or locked pages say so instead of faking a complete course.
