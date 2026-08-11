# Daily AI Blog Automation Guide

This portfolio includes a zero-manual-involvement, fully automated daily AI blog publishing system powered by **GitHub Actions**, **Groq API**, and **Vercel**.

---

## 1. How It Works

```
GitHub Actions (Cron / Manual)
       ↓
`scripts/generate_daily_blog.py`
       ↓
Groq API (Generates 1 high-quality JSON post)
       ↓
Validates schema & checks for duplicate topics/dates
       ↓
Saves to `data/posts/YYYY-MM-DD-slug.json`
       ↓
Commits & pushes to GitHub repository
       ↓
Vercel auto-deploys updated site
```

1. **Trigger**: Every day at `06:00 UTC`, GitHub Actions triggers `.github/workflows/daily-blog.yml`.
2. **Context & Duplicate Check**: The Python script scans `data/posts/` to retrieve existing post titles, dates, and excerpts.
3. **Generation**: The script calls the Groq API (`llama-3.3-70b-versatile`) with portfolio context (Roshan's actual projects & tech stack) and explicit duplicate prevention rules.
4. **Validation**: The script verifies that the generated JSON matches the strict `Post` schema.
5. **Publishing**: The workflow commits `data/posts/<filename>.json` with commit message `content: add daily blog - <title>` and pushes to GitHub.
6. **Deployment**: Vercel detects the new commit and automatically builds and deploys the site.

---

## 2. Setting Up `GROQ_API_KEY` in GitHub Secrets

Before the workflow can run successfully on GitHub:

1. Obtain an API key from [Groq Console](https://console.groq.com/keys).
2. Go to your GitHub repository: `https://github.com/rly09/porty-a-portfolio-website` (or your repository link).
3. Click **Settings** → **Secrets and variables** → **Actions**.
4. Click **New repository secret**.
5. Set Name: `GROQ_API_KEY`
6. Set Secret: `gsk_...` (your Groq API key).
7. Click **Add secret**.

---

## 3. How to Manually Trigger the Workflow

To test or generate a blog post on demand:

1. Open your repository on GitHub.
2. Navigate to the **Actions** tab.
3. Select **Daily AI Blog Generation** from the left sidebar.
4. Click **Run workflow** → **Run workflow**.

---

## 4. How Duplicate Prevention Works

- **Date Check**: The script checks if a post for today's date (`August 11, 2026`) or matching ISO date prefix (`2026-08-11`) already exists in `data/posts/`. If one exists, the workflow stops immediately with zero duplicate files created.
- **Topic Prevention**: All existing blog titles and excerpts are passed to the Groq prompt with strict instructions prohibiting duplication or minor topic variations.
- **Title Validation**: If the generated title matches any existing post title, the script fails safely without committing broken or redundant files.

---

## 5. How to Change the Schedule

The schedule is defined in `.github/workflows/daily-blog.yml` using standard cron syntax:

```yaml
on:
  schedule:
    - cron: '0 6 * * *' # 06:00 UTC every day
```

To change the time (e.g. to 12:00 PM UTC):
Edit `.github/workflows/daily-blog.yml` and change `'0 6 * * *'` to `'0 12 * * *'`.

---

## 6. How to Change the Groq Model

By default, the system uses `llama-3.3-70b-versatile`.

To change the model:
- **Option A (GitHub Repository Variable)**: Go to **Settings** → **Secrets and variables** → **Actions** → **Variables** → **New repository variable**. Set Name: `GROQ_MODEL` and Value: `mixtral-8x7b-32768` (or another supported Groq model name).
- **Option B (Code Default)**: Edit `DEFAULT_MODEL` in `scripts/generate_daily_blog.py`.
