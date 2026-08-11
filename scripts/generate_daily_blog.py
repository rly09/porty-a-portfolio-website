#!/usr/bin/env python3
"""
Automated Daily Blog Post Generator for Developer Portfolio
Uses Groq API to generate exactly one high-quality, non-duplicate technical blog post per day.
"""

import json
import os
import re
import sys
import urllib.request
import urllib.error
from datetime import datetime

# Path configuration
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
POSTS_DIR = os.path.join(PROJECT_ROOT, "data", "posts")

GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"
DEFAULT_MODEL = "llama-3.3-70b-versatile"

PROJECT_CONTEXT = """
Portfolio Owner: Roshan Lal Yogi (rly09)
Role: Software Engineer, Mobile & Web Developer, AI Practitioner
Core Technologies: Flutter, Next.js, React, Supabase, Python, FastAPI, TypeScript, LLMs, VS Code Extensions, Scikit-learn.

Projects in Portfolio:
- Bolo AI: Voice assistant and device automation platform built with Flutter, Supabase, HiveDb, and Gemini API.
- CodeLoom Explorer: Privacy-first VS Code extension generating interactive 2D knowledge graphs of codebase dependencies (AST, React Flow).
- Chanakya: Legal intelligence platform predicting legal outcomes using historical case data (Flutter, FastAPI, FAISS, Linear Regression).
- SyncMind: Chrome extension transferring conversation context between Claude, ChatGPT, Gemini, and Perplexity (Plasmo Framework, React, Tailwind CSS).
- Career Verse: Full-stack Flutter app with AI-powered career path recommendations and Supabase backend.
- ROT: Screen time tracker and accountability app (Flutter, Riverpod).
- Chennai House Price Prediction: Machine learning model for housing market trends (Python, Scikit-learn).
- Chalchitra: Cross-platform movie discovery app with recommendation algorithm (Flutter, Cosine Similarity).
- Mil: Modern social media platform with real-time updates (Flutter, BLoC, Firebase).
"""

def get_existing_posts():
    """Reads all existing post JSON files in POSTS_DIR."""
    if not os.path.exists(POSTS_DIR):
        os.makedirs(POSTS_DIR, exist_ok=True)
        return []

    posts = []
    for filename in os.listdir(POSTS_DIR):
        if filename.endswith(".json"):
            filepath = os.path.join(POSTS_DIR, filename)
            try:
                with open(filepath, "r", encoding="utf-8") as f:
                    data = json.load(f)
                    data["_filename"] = filename
                    posts.append(data)
            except Exception as e:
                print(f"Warning: Failed to read {filename}: {e}", file=sys.stderr)
    return posts

def generate_slug(title):
    """Generates a clean URL-friendly slug from title."""
    slug = title.lower()
    slug = re.sub(r'[^a-z0-9\s-]', '', slug)
    slug = re.sub(r'[\s-]+', '-', slug).strip('-')
    return slug[:50]

def slugify_date(date_str):
    """Converts 'Month DD, YYYY' to 'YYYY-MM-DD'."""
    try:
        dt = datetime.strptime(date_str, "%B %d, %Y")
        return dt.strftime("%Y-%m-%d")
    except Exception:
        return datetime.now().strftime("%Y-%m-%d")

def format_today_date():
    """Formats current date as 'Month DD, YYYY' (e.g. August 11, 2026)."""
    now = datetime.now()
    # Handle day formatting without leading zeros if needed
    day = now.day
    return now.strftime(f"%B {day}, %Y")

def main():
    api_key = os.environ.get("GROQ_API_KEY")
    if not api_key:
        print("Error: GROQ_API_KEY environment variable is not set.", file=sys.stderr)
        sys.exit(1)

    model_name = os.environ.get("GROQ_MODEL", DEFAULT_MODEL)
    today_formatted = format_today_date()
    today_iso = datetime.now().strftime("%Y-%m-%d")

    print(f"Starting daily blog post generation process for date: {today_formatted}")
    print(f"Using Groq model: {model_name}")

    existing_posts = get_existing_posts()
    print(f"Found {len(existing_posts)} existing blog post(s).")

    # Duplicate date check: Stop cleanly if blog for today already exists
    for post in existing_posts:
        post_date = post.get("date", "")
        # Compare formatted date or ISO slug date
        if post_date == today_formatted or post.get("_filename", "").startswith(today_iso):
            print(f"SUCCESS: A blog post for today ({post_date}) already exists ('{post.get('title')}'). Stopping without duplicate creation.")
            sys.exit(0)

    # Gather existing titles and excerpts for strict duplicate prevention prompt
    existing_titles = [p.get("title", "") for p in existing_posts if p.get("title")]
    existing_titles_formatted = "\n".join(f"- {t}" for t in existing_titles)

    # Determine max ID
    existing_ids = [p.get("id", 0) for p in existing_posts if isinstance(p.get("id"), int)]
    next_id = (max(existing_ids) + 1) if existing_ids else 1

    prompt = f"""
You are the technical writer for Roshan Lal Yogi's developer portfolio website (Porty).
Write EXACTLY ONE complete, high-quality, developer-focused blog post for today's date ({today_formatted}).

{PROJECT_CONTEXT}

STRICT DUPLICATE PREVENTION:
The following post titles ALREADY exist in the portfolio blog. Do NOT write about these exact topics, and do NOT create minor variations of them:
{existing_titles_formatted}

REQUIREMENTS FOR THE BLOG POST:
1. ORIGINAL & HANDS-ON: Focus on practical software engineering, AI/ML integration, mobile/web architecture, design systems, code quality, developer tooling, or real lessons learned from building software.
2. NATURAL & HUMAN-LIKE: Write in an insightful, reflective, grounded voice of a passionate developer. Avoid generic AI filler, buzzwords, or superficial bullet lists.
3. CONTEXTUALLY ACCURATE: You may reference Roshan's actual stack or projects (e.g., Flutter, Next.js, Supabase, LLMs, VS Code extensions) where relevant, but NEVER fabricate personal experiences or claim unverified projects.
4. STRUCTURE: Use paragraphs ('p'), section headers ('h3'), and optionally quotes ('blockquote').
5. STRICT JSON OUTPUT FORMAT ONLY:
Return ONLY a raw JSON object with NO markdown wrapping, NO markdown ```json blocks, NO commentary before or after.

JSON SCHEMA REQUIREMENT:
{{
  "id": {next_id},
  "title": "Clear, engaging title (5 to 10 words)",
  "excerpt": "A compelling 1 to 2 sentence summary of the article",
  "date": "{today_formatted}",
  "content": [
    {{ "type": "p", "text": "First paragraph text..." }},
    {{ "type": "h3", "text": "Subheading text" }},
    {{ "type": "p", "text": "Second paragraph text..." }},
    {{ "type": "blockquote", "text": "A notable quote or takeaway", "author": "Optional author or leave out" }},
    {{ "type": "p", "text": "Concluding paragraph text..." }}
  ]
}}

Provide between 4 to 8 content blocks in total for a complete, satisfying read.
Output raw JSON only.
"""

    payload = {
        "model": model_name,
        "messages": [
            {
                "role": "system",
                "content": "You are a specialized JSON generator for technical blog posts. You output only strict, valid JSON matching the requested schema without any markdown formatting or explanations."
            },
            {
                "role": "user",
                "content": prompt.strip()
            }
        ],
        "temperature": 0.7,
        "max_tokens": 2000
    }

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}"
    }

    print("Requesting blog post generation from Groq API...")
    req = urllib.request.Request(GROQ_API_URL, data=json.dumps(payload).encode("utf-8"), headers=headers)

    try:
        with urllib.request.urlopen(req, timeout=60) as response:
            res_body = response.read().decode("utf-8")
            res_json = json.loads(res_body)
            raw_content = res_json["choices"][0]["message"]["content"].strip()
    except urllib.error.HTTPError as e:
        err_text = e.read().decode('utf-8', errors='ignore')
        print(f"Error: Groq API call failed with status {e.code}: {err_text}", file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        print(f"Error calling Groq API: {e}", file=sys.stderr)
        sys.exit(1)

    # Clean potential markdown wrapping around JSON
    cleaned_json_str = raw_content
    if cleaned_json_str.startswith("```"):
        cleaned_json_str = re.sub(r"^```(?:json)?\n?", "", cleaned_json_str)
        cleaned_json_str = re.sub(r"\n?```$", "", cleaned_json_str)
    cleaned_json_str = cleaned_json_str.strip()

    # Parse and validate JSON structure
    try:
        post_data = json.loads(cleaned_json_str)
    except json.JSONDecodeError as e:
        print(f"Error: Failed to parse JSON response from Groq API: {e}", file=sys.stderr)
        print(f"Raw Output:\n{raw_content}", file=sys.stderr)
        sys.exit(1)

    # Field validations
    required_fields = ["id", "title", "excerpt", "date", "content"]
    missing = [field for field in required_fields if field not in post_data]
    if missing:
        print(f"Error: Generated post JSON is missing required fields: {missing}", file=sys.stderr)
        sys.exit(1)

    if not isinstance(post_data["content"], list) or len(post_data["content"]) == 0:
        print("Error: Generated post 'content' must be a non-empty list of blocks.", file=sys.stderr)
        sys.exit(1)

    # Validate each content block
    for idx, block in enumerate(post_data["content"]):
        if not isinstance(block, dict) or "type" not in block or "text" not in block:
            print(f"Error: Content block at index {idx} is invalid: {block}", file=sys.stderr)
            sys.exit(1)
        if block["type"] not in ["p", "h3", "blockquote"]:
            print(f"Error: Invalid block type '{block['type']}' at index {idx}.", file=sys.stderr)
            sys.exit(1)

    # Duplicate title safety check
    generated_title = post_data["title"].strip()
    for existing_title in existing_titles:
        if generated_title.lower() == existing_title.lower():
            print(f"Error: Generated title '{generated_title}' duplicates an existing title.", file=sys.stderr)
            sys.exit(1)

    # Ensure ID matches next_id
    post_data["id"] = next_id

    # Create post filename
    slug = generate_slug(generated_title)
    filename = f"{today_iso}-{slug}.json"
    output_path = os.path.join(POSTS_DIR, filename)

    # Save to file
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(post_data, f, indent=2, ensure_ascii=False)

    print(f"SUCCESS: Daily blog post successfully created!")
    print(f"Title: '{generated_title}'")
    print(f"File Path: {output_path}")

if __name__ == "__main__":
    main()
