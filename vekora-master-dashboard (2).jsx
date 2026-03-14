import { useState } from "react";

// ── DATA ──────────────────────────────────────────────────────────────────────

const verdictData = {
  score: 78,
  verdict: "It will work — with one condition.",
  summary: "Vekora is a real business with a real product solving a real problem. The positioning is sharp, the niche is specific, and the system actually works. The condition: you have to get it in front of people. Right now you're building in private. That's the only thing between you and a client.",
  strengths: [
    { label: "Niche specificity", detail: "Commercial security installation firms across the UK. Not 'all SMEs'. That precision makes outreach 5x more effective and your case study directly relevant." },
    { label: "Problem clarity", detail: "Trade business owners genuinely lose jobs to slow follow-up. You can prove it with their own Google reviews before you send a single message." },
    { label: "Working system", detail: "Demo nearly complete. Most competitors selling 'AI automation' have nothing live. You have a full demo under PrimeShield with a real website, CRM, and automation flow." },
    { label: "Pricing model", detail: "Setup + retainer is correct. Retainer creates recurring revenue. Competitors charge one-off project fees and lose the client. You keep them monthly." },
    { label: "Revised offer is leaner", detail: "Cutting dashboard, trimming to 3 emails, and making Calendly the centrepiece means Demo 1 ships in 2 days instead of 2 weeks. Speed to first client matters more than polish right now." },
    { label: "Your age is leverage", detail: "A 17-year-old with a live B2B system is a story. Use it consciously — it disarms prospects and makes you memorable before you've said a word about the product." },
  ],
  risks: [
    { label: "Zero social proof", detail: "You have no clients. Every prospect will ask if it's worked before. Fix: the demo IS the proof of concept. Offer risk reversal on client 1: 'if it's not live and working in 14 days, you don't pay the setup fee.'" },
    { label: "Portfolio layer not done", detail: "Demo is nearly built but 20% presentation-ready. Without the architecture diagram, screenshots, one-pager, and case study write-up, you have nothing to send before a call." },
    { label: "Outreach not started", detail: "Not a system problem — a doing problem. The outreach system is built in this dashboard. The only missing ingredient is you sending the messages." },
    { label: "Offer framing still technical", detail: "Internally call it whatever you want. To a prospect: 'A system that responds in 30 seconds and follows up until they book.' That's it. Nothing else until they ask." },
  ],
  killerInsight: "The business model is sound. The market exists. The system works. The only real risk is that you keep building and never start selling. Demo 1 ships in 2 days. Outreach starts the same day it ships.",
};

const vekoraFix = {
  immediate: [
    {
      priority: "P0",
      title: "Reframe the offer",
      color: "#EF4444",
      what: "Change how you describe Vekora to every prospect.",
      before: '"AI-Enhanced Client Capture System with automated lead qualification"',
      after: '"A system that responds to every enquiry in 30 seconds and follows up automatically until they book a survey. You stop losing jobs to slow response."',
      why: "Trade business owners don't buy technology. They buy time saved and jobs won. Lead with the outcome, never the mechanism.",
    },
    {
      priority: "P0",
      title: "Finish portfolio layer",
      color: "#EF4444",
      what: "Four assets needed before any outreach — do this today:",
      items: [
        "Architecture diagram — Whimsical (free), 45 min. Form → Make → HubSpot → Gmail → 3-email nurture → Calendly → Pipeline",
        "Screenshot sequence — 10 annotated screenshots of every system stage with one-line captions",
        "One-pager PDF — Canva. Before/after frame, 3 outcomes, 1 system screenshot, contact details. No pricing on it.",
        "Case study write-up — 1 page. PrimeShield: 14 leads, 6 surveys booked, 2 jobs closed at £4,200 in first month",
      ],
      why: "Without this you have nothing to send when a prospect says 'show me.' A prospect who asks for proof and gets silence is a lost client.",
    },
    {
      priority: "P1",
      title: "Build emails 2–3 + Calendly",
      color: "#F59E0B",
      what: "Revised offer = 3 emails only. Build these today:",
      items: [
        "Email 2 (Day 3) — Case Study: PrimeShield story with real-sounding numbers. This is the highest-converting single email.",
        "Email 3 (Day 7) — Final Push: short, one Calendly link, urgency without fake scarcity. Under 100 words.",
        "Calendly: free account, '20-Min Discovery Call' event type. Embed link in Email 1 AND Email 3.",
        "Make: Calendly webhook → HubSpot contact update → pipeline moves to 'Site Survey Booked' automatically.",
      ],
      why: "A prospect testing your demo right now gets one email then silence. 3 emails + self-booking is the complete sellable product.",
    },
    {
      priority: "P1",
      title: "Add numeric scoring",
      color: "#F59E0B",
      what: "Change High/Medium/Low to a 0–10 score alongside the label:",
      items: [
        "CCTV selected → +4 points",
        "Multi-site = Yes → +3 points",
        "Multiple services → +2 points",
        "Alarms only, single site → +1 point",
        "Access Control only, single site → 0 points",
      ],
      why: "'8/10 High Priority' in the notification email is more compelling than just 'High Priority'. Also sets up AI scoring comparison later.",
    },
    {
      priority: "P2",
      title: "Add OpenAI API (real clients only)",
      color: "#00FF87",
      what: "3 extra Make modules after form submission — do this on client 1, not in demo:",
      items: [
        "OpenAI module: send lead data with a structured prompt",
        "Returns: qualification summary, recommended next action, personalised Email 1 opening line",
        "Pass outputs into Gmail modules — notification gets AI summary, lead email gets personalised opener",
      ],
      why: "Same flow, 3 modules, pennies per lead. Difference between 'automated system' and 'AI-powered revenue infrastructure'.",
    },
  ],
  outreach: {
    aiProcess: {
      label: "AI Outreach Process",
      text: `HOW TO USE AI TO SCALE OUTREACH:

Step 1 — Research (Perplexity)
  Prompt: "Find 10 commercial CCTV installation companies 
  in [city], UK. Include website, phone, and any Google 
  review mentions of response times or missed enquiries."

Step 2 — Personalise (Claude)
  Prompt: "I'm going to outreach to [Company Name], a 
  commercial security firm in [city]. Their reviews mention 
  [X]. Write me a WhatsApp message under 80 words that asks 
  about their enquiry process without pitching. Sound like 
  a real person, not a marketer. No emojis."

Step 3 — Send in batches
  10 messages per day across WhatsApp + one other channel.
  Log every send in a Google Sheet: Company, Channel, 
  Date, Reply (Y/N), Outcome.

Step 4 — Follow up (Claude)
  Prompt: "They replied: '[paste reply]'. Write me a 
  follow-up that moves toward booking a call without 
  being pushy. Under 60 words."`,
    },
    whatsappCold: {
      label: "WhatsApp — Cold",
      text: `Hi [Name],

Came across [Company Name] while looking at security firms in [city]. Random question — when an enquiry comes in through your website, what happens next? Does someone follow up same day or does it sit there?

Reason I ask — I fix that exact problem for security firms. Happy to show you how if it's relevant.

[Your name]`,
    },
    whatsappWarm: {
      label: "WhatsApp — Warm (Reviews)",
      text: `Hi [Name],

Noticed [Company Name] does commercial installs across [area]. Had a look at your reviews — a few mentioned response times which is exactly the problem I solve for security firms.

Built a system that replies to every enquiry in 30 seconds and books surveys automatically. No chasing, no missed jobs.

Worth a quick chat?

[Your name]`,
    },
    email: {
      label: "Email — Cold",
      text: `Subject: Quick question about [Company Name]'s enquiry process

Hi [Name],

I'll keep this short.

I was looking at commercial security firms in [city] and came across [Company Name]. One question — when a potential client fills in your contact form, how long does it usually take before they hear back?

I ask because I build automated systems for security firms that respond in 30 seconds and follow up for 7 days without any manual effort. Means no lead goes cold while you're on a job.

Happy to send over a quick overview if it's relevant.

[Your name]
[Phone number]`,
    },
    linkedin: {
      label: "LinkedIn — DM",
      text: `Hi [Name],

Saw [Company Name] on LinkedIn — commercial security installs, looks like solid work.

Quick question out of interest: when an enquiry comes in through your website, is there a system for following up or does it depend on who picks it up that day?

I ask because I build automated lead systems specifically for security firms — happy to show you what it looks like if it's useful.

[Your name]`,
    },
    facebook: {
      label: "Facebook / Instagram",
      text: `Hi [Name],

Found [Company Name] on here — do you cover commercial installs in [area]?

Reason I'm asking: I build automated systems that handle enquiry follow-up for security firms. Every lead gets a response in 30 seconds and a survey booking link. Owners stop losing jobs to slow response.

Built a full demo — happy to send it over if useful.

[Your name]`,
    },
    reply: {
      label: "After Any Reply — Send This",
      text: `Basically the system does three things:

  → Responds to every enquiry in 30 seconds with a professional email
  → Follows up automatically over 7 days so no lead goes cold
  → Lets them book a survey themselves — no phone tag

You get notified instantly with their details and priority score. Everything else runs without you touching it.

I built a full working demo for a security firm — want me to send it over so you can see exactly what your leads would experience?`,
    },
  },
  valueFrame: "A commercial CCTV install is typically £2,000–£8,000. If the system helps them close ONE extra job per month they'd have lost to slow follow-up, the ROI is 3–10x the £600/mo retainer. The question isn't 'is £600 expensive?' — it's 'how much is one lost job worth to you per month?'",
};

const pricingTimeline = [
  {
    tier: "Client 1",
    setup: "£800",
    retainer: "£600/mo",
    color: "#00FF87",
    trigger: "First signed client — offer as-is",
    includes: ["Single-page website", "Lead capture form", "Priority scoring + owner notification", "3-email nurture sequence", "Calendly self-booking", "HubSpot pipeline tracking"],
  },
  {
    tier: "Clients 2–3",
    setup: "£1,200",
    retainer: "£800/mo",
    color: "#60A5FA",
    trigger: "One real case study with real numbers",
    includes: ["Everything in Client 1", "SMS notification to owner", "Missed call text-back automation", "Monthly performance report PDF", "OpenAI API lead qualification"],
  },
  {
    tier: "Clients 4–6",
    setup: "£1,500",
    retainer: "£1,000/mo",
    color: "#A78BFA",
    trigger: "Strong testimonial + 3 retained clients",
    includes: ["Everything in Clients 2–3", "AI-written personalised first-touch emails", "Re-engagement sequence for 30-day cold leads", "Google review request automation post-job", "Cleaning companies added as second niche"],
  },
  {
    tier: "Clients 7–10",
    setup: "£2,500",
    retainer: "£1,500/mo",
    color: "#F59E0B",
    trigger: "Multiple case studies, proven delivery",
    includes: ["Everything in Clients 4–6", "Multi-step qualification with AI scoring comparison", "Basic client portal (pipeline visibility)", "US market outreach begins", "n8n for privacy-sensitive client flows"],
  },
  {
    tier: "GOS Tier (10+)",
    setup: "£3,500–£5,000",
    retainer: "£2,000–£3,000/mo",
    color: "#EF4444",
    trigger: "3+ retained clients, documented results, GOS tech skills built",
    includes: ["Full RAG-based AI qualification engine", "SQL-backed structured databases", "Vector embeddings + memory systems", "Google Ads / Meta Ads integrated into pipeline", "Client portal with live revenue tracking", "Optional rev share (10–15%) for proven clients", "Internal workflow automation (quotes, scheduling, invoices)"],
  },
];

const offerEvolution = [
  { phase: "Now", label: "Core Capture", desc: "Website + form + qualification + 3-email nurture + Calendly booking + HubSpot pipeline. The complete lead capture machine.", price: "£800 + £600/mo" },
  { phase: "Month 2–3", label: "Add Notification Layer", desc: "SMS alerts, missed call text-back, monthly report. Makes the retainer feel justified every single month.", price: "£1,200 + £800/mo" },
  { phase: "Month 4–6", label: "Add AI Layer", desc: "OpenAI personalisation, re-engagement sequences, post-job review automation. Now it's genuinely AI-powered, not just automated.", price: "£1,500 + £1,000/mo" },
  { phase: "Month 6–12", label: "Add Ads Integration", desc: "Google/Meta ads feed directly into the pipeline. Same qualification + nurture applies to paid leads. You now control their growth, not just their follow-up.", price: "£2,500 + £1,500/mo" },
  { phase: "Year 2+", label: "GOS — Full Infrastructure", desc: "RAG pipelines, SQL databases, client portal, internal workflow automation, rev share option. A completely different product for a different buyer.", price: "£3,500–5,000 + £2–3k/mo" },
];

const aiLearning = [
  {
    stage: "Stage 1",
    title: "Python + Claude API",
    weeks: "Weeks 1–4",
    color: "#00FF87",
    status: "start here",
    description: "Everything else runs on Python. Get this solid first.",
    learn: [
      "Python core: variables, dicts, loops, functions, f-strings, file I/O",
      "pip + virtual environments (venv)",
      "requests library — HTTP calls from Python",
      "Claude API: client.messages.create(), system prompts, parsing response content",
      "Error handling, rate limits, .env for secrets",
    ],
    resources: [
      { name: "CS50P (Harvard)", note: "Weeks 0–4 only. ~10 hours. Best Python intro that exists." },
      { name: "docs.anthropic.com", note: "Getting Started + Messages API. Primary source, always current." },
      { name: "Anthropic Prompt Eng. course", note: "Do alongside CS50P. Apply each lesson to Vekora same day." },
    ],
    project: {
      name: "Vekora Lead Qualifier",
      description: "Python script that takes lead data (name, service, multi_site), sends to Claude API, gets back: priority score 1–10, one-sentence summary, recommended next action, personalised email opening line. Saves to JSON.",
      why: "This is the exact logic you'll plug into Make for real clients. Direct Imperial portfolio piece.",
    },
  },
  {
    stage: "Stage 2",
    title: "JavaScript Properly + API Integration",
    weeks: "Weeks 5–8",
    color: "#60A5FA",
    status: "in progress",
    description: "You're learning JS already. Fill the specific gaps that Vekora needs.",
    learn: [
      "async/await and Promises — critical for any API work",
      "fetch() — calling external APIs from JS",
      "Array methods: .map(), .filter(), .reduce()",
      "Error handling: try/catch blocks",
      "Node.js basics — running JS outside the browser",
      "npm — installing and using packages",
      "How REST APIs work: methods, endpoints, headers, auth",
    ],
    resources: [
      { name: "javascript.info", note: "Read: Promises, async/await, Fetch API sections specifically." },
      { name: "HubSpot API docs", note: "Build a script that creates a HubSpot contact via API. Real practice." },
      { name: "The Odin Project (JS)", note: "Asynchronous JS section only. Skip DOM stuff for now." },
    ],
    project: {
      name: "HubSpot Pipeline Updater",
      description: "Node.js script that reads your Google Sheet lead log (CSV), calls HubSpot API to update each lead's pipeline stage, logs all updates to JSON. Has proper error handling — logs errors and continues rather than crashing.",
      why: "Real GOS-tier work. Custom API integrations between tools that don't natively connect. Shows async JS, API auth, error handling in one.",
    },
  },
  {
    stage: "Stage 3",
    title: "Agents + Tool Use",
    weeks: "Weeks 9–14",
    color: "#A78BFA",
    status: "upcoming",
    description: "Where Make automations become real code and Claude can actually do things.",
    learn: [
      "Claude tool_use: defining tools as JSON schemas, handling tool_use response blocks",
      "Agent loop: Claude calls tool → you execute → return result → Claude continues",
      "ReAct pattern: Reason → Act → Observe → Repeat",
      "When to use single vs multi-agent",
      "Human-in-the-loop: when agents should pause and ask",
      "FastAPI — building a Python endpoint that Make can POST to",
      "Make HTTP module — calling your Python scripts from Make flows",
    ],
    resources: [
      { name: "Anthropic Tool Use docs", note: "Read every example. Build each one yourself. Primary source." },
      { name: "FastAPI docs", note: "Build your first API endpoint in 30 minutes. Then call it from Make." },
      { name: "Latent Space podcast", note: "Listen while commuting. Deepens intuition for what agents can/can't do." },
    ],
    project: {
      name: "Vekora Prospecting Agent",
      description: "Give it a city + business type. Agent uses web_search tool to find companies, scrape_website tool for contact details, qualify_prospect tool to score each one. Returns ranked prospect list saved to CSV.",
      why: "Replaces 2hrs manual research per outreach batch. Multi-tool agent architecture. Direct Imperial interview material.",
    },
  },
  {
    stage: "Stage 4",
    title: "RAG + SQL + GOS-Ready",
    weeks: "Weeks 15–24",
    color: "#F59E0B",
    status: "upcoming",
    description: "What unlocks GOS delivery. Don't rush here — Stages 1–3 must be solid first.",
    learn: [
      "SQL: SELECT, INSERT, UPDATE, DELETE, JOIN, GROUP BY",
      "Schema design: how to structure a leads database",
      "SQLite first (no server), then PostgreSQL",
      "RAG: chunking, embedding (OpenAI embeddings API), vector stores",
      "Pinecone (hosted) or Chroma (local) for vector storage",
      "Retrieval: similarity search, injecting context into Claude prompt",
      "Railway/Render for hosting Python APIs",
    ],
    resources: [
      { name: "CS50 SQL (Harvard)", note: "4-week course. Exactly the right depth for GOS work." },
      { name: "SQLiteOnline.com", note: "Practice SQL in browser. No setup. First 20 SQLZoo exercises." },
      { name: "Pinecone quickstart", note: "First vector store in under an hour with their tutorial." },
    ],
    project: {
      name: "Vekora Proposal Generator",
      description: "SQLite database of past proposal templates and pricing. Takes prospect details, RAG pipeline retrieves relevant proposals, Claude uses retrieved context to draft personalised proposal. Output: formatted markdown saved to file.",
      why: "SQL + RAG + Claude API in one project. This IS the GOS proposal generation feature — you're building the product while learning the skill.",
    },
  },
];

const quantPhases = [
  {
    phase: "Phase 1",
    title: "Setup + First Strategy",
    weeks: "Weeks 1–6",
    steps: [
      "Install Python, pandas, yfinance, matplotlib, vectorbt. GitHub repo: 'quant-research'.",
      "Data literacy first: download FTSE 100 data, plot charts, calculate returns — understand before coding.",
      "Momentum strategy: long when price > 50-day MA, flat when below. Backtest 5 years, 10 FTSE stocks.",
      "Your econ edge: write 500 words on WHY momentum works (behavioural economics: anchoring, trend-following). This separates you from coders backtesting blindly.",
    ],
  },
  {
    phase: "Phase 2",
    title: "Signals + Risk Management",
    weeks: "Weeks 7–14",
    steps: [
      "Add RSI signal: only enter long if momentum positive AND RSI < 70.",
      "Add stop-loss: exit if price drops 5% below entry. Measure Sharpe ratio and max drawdown change.",
      "Macro signal (your econ edge): download UK CPI + BoE rate data. Test if strategy performs differently in high vs low inflation periods.",
      "Add transaction costs (0.1% per trade) — most beginners skip this and their results are useless in practice.",
    ],
  },
  {
    phase: "Phase 3",
    title: "ML Layer",
    weeks: "Weeks 15–20",
    steps: [
      "Feature engineering: 10 features from price data — 5-day return, 20-day volatility, RSI, MACD, volume z-score, distance from 52-week high.",
      "XGBoost classifier: predict 'will this stock be higher in 10 days?' 70/30 train/test split.",
      "Use Claude: upload feature engineering code + backtest results. Ask it to identify overfitting risks. Document the conversation — shows AI as thinking partner.",
      "Final writeup: strategy description, backtest results with charts, limitations, what you'd do with live data. Imperial portfolio piece.",
    ],
  },
];

const imperialData = {
  criteria: [
    { criterion: "Grades (A*AA, A* Maths)", status: "gap", note: "Currently A in Maths. This is the gate — everything else is secondary to getting it to A*." },
    { criterion: "CS passion beyond curriculum", status: "strong", note: "Vekora, API work, agents, quant project. Real builds, not extra reading." },
    { criterion: "Problem-solving ability", status: "strong", note: "Demonstrated through live systems. Must articulate technically in interview." },
    { criterion: "Independent learning", status: "strong", note: "CS A-level + self-teaching Python, APIs, Make. Document everything on GitHub." },
    { criterion: "Admissions test (ENGAA)", status: "gap", note: "Research current format now. Start practising in Year 13." },
  ],
  projects: [
    {
      id: "vekora-system",
      name: "Project 1 — Vekora Revenue System",
      tag: "Business + Automation",
      color: "#00FF87",
      stage: "Build now → ongoing",
      oneLiner: "A done-for-you lead capture, qualification, and nurture system for B2B trade businesses — built and operated at 17 as a live commercial product.",
      whyItMatters: "This isn't a school project. It's a real business you founded, built, and are actively selling. Imperial wants evidence of CS thinking applied to real problems. Vekora is that evidence at a level almost no other applicant can match.",
      ucasFrame: "Built and operated a B2B AI revenue infrastructure firm at 17, designing and implementing webhook-based automation architectures, LLM API integrations, and CRM pipeline systems that handle real commercial data flows.",
      skills: [
        { skill: "Webhook architecture", detail: "HubSpot form → Make webhook → routing logic → multiple downstream systems. You designed this flow." },
        { skill: "API integration", detail: "HubSpot API, Gmail API, Calendly API, OpenAI API — connecting systems that don't natively talk to each other." },
        { skill: "Data routing + conditional logic", detail: "Priority scoring system with multi-branch routing. Structured decision logic at scale." },
        { skill: "LLM prompt engineering", detail: "Structured prompts that return consistent JSON outputs for lead qualification — production-grade, not experimental." },
        { skill: "Systems architecture", detail: "Designing the full flow before building it. Knowing what connects to what and why." },
      ],
      tools: ["Make (Integromat)", "HubSpot CRM", "Gmail API", "Calendly", "OpenAI API", "Google Sheets", "GitHub Pages", "Claude API"],
      resources: [
        { name: "Anthropic API docs", note: "Primary source for Claude API integration into Make flows." },
        { name: "HubSpot developer docs", note: "API reference for CRM integration and webhook setup." },
        { name: "Make Academy", note: "Advanced scenarios, error handling, data stores — fills the gaps in what you already know." },
      ],
      roadmap: [
        { step: "Now", action: "Finish Demo 1 — emails 2–3, Calendly, portfolio layer. 2 days of work." },
        { step: "Month 1", action: "First paying client signed. System deployed on real business data." },
        { step: "Month 2", action: "Add OpenAI API to Make flow — AI-written qualification summaries and personalised email openers." },
        { step: "Month 3", action: "First case study documented with real numbers. GitHub repo with full architecture README." },
        { step: "By UCAS", action: "2–3 retained clients, documented results, live system you can demo in an interview." },
      ],
      interviewQs: [
        "Walk me through the data flow from form submission to the business owner receiving a notification.",
        "How does your priority scoring logic work? Could you extend it with a machine learning model?",
        "What happens in your system when the webhook fails? How would you add error handling?",
        "How would you redesign this system to handle 1,000 leads per day instead of 10?",
      ],
    },
    {
      id: "lead-qualifier",
      name: "Project 2 — AI Lead Qualifier (Claude API)",
      tag: "Python + LLM APIs",
      color: "#60A5FA",
      stage: "Build in AI Stage 1 (Weeks 1–4)",
      oneLiner: "A Python script that takes raw lead data, sends it to the Claude API with a structured prompt, and returns a priority score, qualification summary, recommended action, and personalised email opener.",
      whyItMatters: "This is the transition from 'uses AI tools' to 'builds AI systems'. It proves you can call an LLM API programmatically, handle structured outputs, and integrate the result into a real workflow — exactly what Imperial's AI/ML modules build on.",
      ucasFrame: "Developed a production-ready lead qualification system using the Anthropic Claude API, engineering structured prompts that return consistent JSON outputs for real-time triage of commercial sales leads.",
      skills: [
        { skill: "Python", detail: "Functions, dicts, file I/O, error handling, virtual environments — all applied to a real task." },
        { skill: "API authentication", detail: "ANTHROPIC_API_KEY in .env file, loaded with python-dotenv. Proper secrets management." },
        { skill: "Prompt engineering", detail: "System prompts that constrain output format. Role definition, output schema, edge case handling." },
        { skill: "JSON parsing", detail: "Extracting structured data from LLM responses reliably. Handling malformed outputs gracefully." },
        { skill: "Integration thinking", detail: "The script isn't standalone — it's designed to be called by Make via a FastAPI endpoint later." },
      ],
      tools: ["Python 3", "Anthropic Claude API", "python-dotenv", "JSON", "GitHub", "Cursor / Claude Code"],
      resources: [
        { name: "CS50P (Harvard)", note: "Weeks 0–4 only. ~10 hours. Best Python intro that exists. Free on edX." },
        { name: "docs.anthropic.com", note: "Messages API reference. Read 'Getting Started' and 'Tool Use' sections." },
        { name: "Anthropic Prompt Engineering course", note: "Apply each lesson to the qualifier prompt same day. Primary source." },
        { name: "Real Python — dotenv guide", note: "Proper secrets management. Never hardcode API keys." },
      ],
      roadmap: [
        { step: "Week 1", action: "Complete CS50P Weeks 0–2. Write Python functions, dicts, loops from scratch." },
        { step: "Week 2", action: "Read Anthropic Getting Started docs. Make first API call — basic message, parse response." },
        { step: "Week 3", action: "Build the qualifier prompt. Test with 10 fake leads. Iterate until output is consistent." },
        { step: "Week 4", action: "Add error handling, .env secrets, save to JSON. Write GitHub README with architecture explanation." },
        { step: "Later", action: "Wrap in FastAPI endpoint so Make can call it via HTTP module — this is the GOS AI engine." },
      ],
      interviewQs: [
        "How do you ensure the Claude API returns a consistent JSON format every time?",
        "What's the difference between a system prompt and a user message in the API?",
        "How would you handle the case where Claude returns malformed JSON?",
        "How would you add a confidence score to the qualifier output?",
      ],
    },
    {
      id: "prospecting-agent",
      name: "Project 3 — Vekora Prospecting Agent",
      tag: "AI Agents + Tool Use",
      color: "#A78BFA",
      stage: "Build in AI Stage 3 (Weeks 9–14)",
      oneLiner: "A multi-tool AI agent that takes a city and business type, autonomously researches prospect companies using web search and scraping tools, scores each one, and returns a ranked outreach list — no human steps between input and output.",
      whyItMatters: "Multi-tool agent architecture is one of the most technically advanced things you can build at A-level. It maps directly to concepts in Imperial's Year 2 AI modules. You're arriving having already built what they'll teach. That's rare.",
      ucasFrame: "Designed and implemented a multi-tool AI agent using Claude's tool_use API, capable of autonomous multi-step reasoning, web research, and structured data extraction with no human intervention between steps.",
      skills: [
        { skill: "Claude tool_use API", detail: "Defining tools as JSON schemas, parsing tool_use content blocks in responses, executing tool calls and returning results." },
        { skill: "Agent loop design", detail: "The ReAct pattern: Claude reasons → calls tool → you execute → return result → Claude continues. Knowing when to break the loop." },
        { skill: "FastAPI", detail: "Building HTTP endpoints so tools can be called by the agent via your Python backend." },
        { skill: "Web scraping", detail: "requests + BeautifulSoup to extract contact details and review text from company websites." },
        { skill: "State management", detail: "Maintaining context across multi-step reasoning without losing track of what's been found." },
      ],
      tools: ["Python 3", "Anthropic Claude API (tool_use)", "FastAPI", "requests", "BeautifulSoup", "JSON", "GitHub", "Claude Code CLI"],
      resources: [
        { name: "Anthropic Tool Use docs", note: "Read every single example. Build each one yourself before moving to the agent." },
        { name: "FastAPI docs (fastapi.tiangolo.com)", note: "Build your first endpoint in 30 minutes. Essential for exposing tools to the agent." },
        { name: "Beautiful Soup docs", note: "Web scraping library. Simple and well-documented. Start with the quickstart." },
        { name: "Latent Space podcast", note: "Listen for intuition on what agents can/can't do. Episode on 'agents in production' is most relevant." },
      ],
      roadmap: [
        { step: "Week 9", action: "Read all Anthropic tool_use docs. Build basic tool_use example: single tool, single call." },
        { step: "Week 10", action: "Build FastAPI server with one endpoint. Agent calls it, gets response. Verify the loop works." },
        { step: "Week 11", action: "Add web_search tool using a search API (SerpAPI free tier or DuckDuckGo). Agent finds company names." },
        { step: "Week 12", action: "Add scrape_website tool with BeautifulSoup. Agent extracts contact details from company sites." },
        { step: "Week 13", action: "Add qualify_prospect tool that scores each company 1–10 based on website quality and review evidence." },
        { step: "Week 14", action: "End-to-end test: input 'CCTV firms in Leeds' → get back ranked CSV. Write GitHub README. Document what was hard." },
      ],
      interviewQs: [
        "Explain the tool_use flow — what does the Claude API response look like when it wants to call a tool?",
        "How do you prevent the agent from getting stuck in an infinite loop?",
        "What's the difference between a single-agent and multi-agent system? When would you use each?",
        "How would you add memory to this agent so it remembers prospects it's already researched?",
      ],
    },
    {
      id: "quant-strategy",
      name: "Project 4 — Quant Momentum + ML Strategy",
      tag: "Python + Finance + ML",
      color: "#F59E0B",
      stage: "Build in Quant Phases 1–3 (parallel track)",
      oneLiner: "A systematic trading strategy combining rule-based momentum signals with an XGBoost ML classifier, backtested on 5 years of FTSE 100 data with macro economic regime filters drawn from your Economics A-level.",
      whyItMatters: "Almost no CS applicant has a finance + ML crossover project. The economics angle — using macro indicators as regime filters — shows interdisciplinary thinking that admissions tutors remember. It's a story, not just a project.",
      ucasFrame: "Built a systematic quantitative trading strategy combining momentum signals and an XGBoost classifier trained on engineered price features, incorporating macroeconomic regime filters derived from A-level Economics to test whether inflation cycles affect momentum strategy performance.",
      skills: [
        { skill: "pandas", detail: "Data manipulation, time-series indexing, rolling calculations, merging multiple data sources." },
        { skill: "yfinance", detail: "Downloading historical price and volume data for FTSE 100 stocks programmatically." },
        { skill: "vectorbt", detail: "Backtesting framework — simulating strategy performance on historical data with realistic transaction costs." },
        { skill: "Feature engineering", detail: "Creating 10+ technical indicators from raw price data: RSI, MACD, momentum, volatility, z-scores." },
        { skill: "XGBoost / sklearn", detail: "Training a binary classifier. Train/test split. Evaluating precision, recall, and avoiding overfitting." },
        { skill: "Statistical interpretation", detail: "Sharpe ratio, max drawdown, Calmar ratio — knowing what the numbers mean, not just computing them." },
      ],
      tools: ["Python 3", "pandas", "yfinance", "vectorbt", "matplotlib", "scikit-learn", "XGBoost", "GitHub", "Jupyter Notebook"],
      resources: [
        { name: "Quantitative Momentum (book)", note: "Wesley Gray. Explains the academic evidence for momentum. Essential for your econ write-up." },
        { name: "vectorbt docs", note: "Best backtesting library for this project. Excellent documentation with worked examples." },
        { name: "Towards Data Science — feature engineering", note: "Search 'technical indicator feature engineering pandas'. Multiple solid articles." },
        { name: "sklearn XGBoost docs", note: "Official docs for the classifier. Focus on: fit, predict, feature_importances_." },
        { name: "Bank of England — data portal", note: "Free UK CPI and base rate data. Your macro regime filter data source." },
      ],
      roadmap: [
        { step: "Weeks 1–2", action: "Install stack. Download FTSE 100 data. Plot price charts. Calculate returns. Understand before coding strategy." },
        { step: "Weeks 3–4", action: "Momentum strategy: long when price > 50-day MA. Backtest on 10 stocks, 5 years. Document: total return, Sharpe, max drawdown." },
        { step: "Weeks 5–6", action: "Write 500-word economics analysis of WHY momentum works. Anchoring, trend-following behaviour, institutional herding." },
        { step: "Weeks 7–10", action: "Add RSI signal, stop-loss, transaction costs. Download BoE/CPI data. Test macro regime filter. Document findings." },
        { step: "Weeks 11–14", action: "Feature engineering — 10 indicators. XGBoost classifier. 70/30 split. Evaluate. Use Claude to check for overfitting." },
        { step: "Weeks 15–16", action: "Final writeup: strategy description, backtest charts, limitations, what live data would change. Full GitHub README." },
      ],
      interviewQs: [
        "Why does momentum work? What's the behavioural economics explanation?",
        "How did you prevent overfitting in your XGBoost model?",
        "What's the Sharpe ratio and why is it a better metric than raw return?",
        "How does your macro regime filter affect strategy performance? What did you find?",
        "How would you extend this to a live trading system?",
      ],
    },
  ],
  psStructure: [
    { section: "Opening hook", words: "~40 words", guidance: "A specific moment or problem. NOT 'I've always been interested in computers.' Something concrete — a problem you saw, a system you built, a question that wouldn't leave you alone." },
    { section: "Vekora — technical depth", words: "~120 words", guidance: "Name the technologies. Explain a specific problem you solved. 'The lead qualification logic required me to design a webhook architecture that...' Show CS thinking, not just entrepreneurship." },
    { section: "AI learning journey", words: "~100 words", guidance: "Claude API, agents, tool use. What you've built and what you still want to understand. Frame gaps as curiosity: 'Building this exposed me to RAG pipelines which I've started exploring...'" },
    { section: "Quant project", words: "~80 words", guidance: "Connect economics and CS explicitly. 'My A-level study of behavioural economics gave me a framework for understanding why momentum strategies work — I then tested this hypothesis computationally by...'" },
    { section: "Why Imperial specifically", words: "~60 words", guidance: "Research specific Imperial CS modules or research groups. Generic 'world-class university' statements are invisible. Name a professor, a module, a research group." },
    { section: "Closing", words: "~40 words", guidance: "Where you're going, what you want to understand, why Imperial is the place to do it. Forward-looking, not summary." },
  ],
  timeline: [
    { period: "Now → Jul", milestone: "Vekora client 1", what: "Demo 1 complete, portfolio layer done, first client signed." },
    { period: "Now → Jul", milestone: "AI Stages 1 & 2", what: "Python solid, Claude API project built, JS async done." },
    { period: "Now → Jul", milestone: "Quant Phase 1", what: "Momentum strategy backtested, documented, on GitHub." },
    { period: "Aug → Sep", milestone: "Personal statement", what: "Draft written, teacher feedback, iterated. Done before Sep." },
    { period: "Sep → Oct", milestone: "UCAS submission", what: "Submit by mid-October. All projects live on GitHub with READMEs." },
    { period: "Sep → Dec", milestone: "AI Stage 3", what: "Agents + tool use. Prospecting agent built." },
    { period: "Sep → Mar", milestone: "Maths A*", what: "Past paper every week from September. Non-negotiable." },
    { period: "Jan → Mar", milestone: "Interview prep", what: "Explain every project out loud, under 3 minutes each, no notes." },
  ],
};

const weeklySchedule = [
  { day: "Mon", focus: "Vekora build — one demo component finished", color: "#00FF87", tag: "Vekora" },
  { day: "Tue", focus: "Anthropic course + apply to Vekora same day", color: "#00FF87", tag: "AI" },
  { day: "Wed", focus: "Agent or quant project work", color: "#60A5FA", tag: "Projects" },
  { day: "Thu", focus: "A-levels + NotebookLM revision", color: "#A78BFA", tag: "School" },
  { day: "Fri", focus: "Outreach — 10 targeted WhatsApp messages", color: "#F59E0B", tag: "Vekora" },
  { day: "Sat", focus: "Deep build session — longest uninterrupted block", color: "#F59E0B", tag: "Build" },
  { day: "Sun", focus: "Review progress, plan week, read newsletters", color: "#6B7280", tag: "Review" },
];

const tools = [
  { name: "Claude.ai Projects", use: "Vekora context always loaded", tier: "Core", color: "#00FF87" },
  { name: "Claude Code CLI", use: "Build demo components + dashboard", tier: "Core", color: "#00FF87" },
  { name: "Cursor", use: "JS + API work for Make modules", tier: "Core", color: "#00FF87" },
  { name: "NotebookLM", use: "A-level revision tutor", tier: "Core", color: "#00FF87" },
  { name: "Make (Integromat)", use: "Primary automation — live", tier: "Automate", color: "#F472B6" },
  { name: "n8n", use: "Self-hosted flows for GOS clients", tier: "Automate", color: "#F472B6" },
  { name: "HubSpot", use: "CRM + pipeline — live", tier: "Automate", color: "#F472B6" },
  { name: "OpenAI API", use: "AI qualification engine in Make", tier: "Agents", color: "#A78BFA" },
  { name: "Pinecone / Mem0", use: "Vector store for RAG (GOS)", tier: "Agents", color: "#A78BFA" },
  { name: "Perplexity", use: "Prospect research before outreach", tier: "Research", color: "#60A5FA" },
  { name: "Vercel v0", use: "Generate client portal UI fast", tier: "Build", color: "#F59E0B" },
  { name: "Supabase", use: "SQL database layer for GOS", tier: "Build", color: "#F59E0B" },
];

// ── COMPONENTS ────────────────────────────────────────────────────────────────

const tabs = [
  { id: "verdict", label: "Vekora Verdict", icon: "⚡" },
  { id: "fix", label: "Fix & Outreach", icon: "🔧" },
  { id: "pricing", label: "Pricing & Offer", icon: "💰" },
  { id: "learning", label: "AI Learning", icon: "🧠" },
  { id: "imperial", label: "Imperial", icon: "🎓" },
  { id: "weekly", label: "Weekly OS", icon: "📅" },
];

// Score ring
function ScoreRing({ score }) {
  const r = 52;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  return (
    <div style={{ position: "relative", width: 140, height: 140, flexShrink: 0 }}>
      <svg width="140" height="140" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="70" cy="70" r={r} fill="none" stroke="#1A1A1A" strokeWidth="10" />
        <circle cx="70" cy="70" r={r} fill="none" stroke="#00FF87" strokeWidth="10"
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontSize: 32, fontWeight: 800, color: "#00FF87", lineHeight: 1 }}>{score}</div>
        <div style={{ fontSize: 10, color: "#555", letterSpacing: "0.1em", marginTop: 2 }}>/ 100</div>
      </div>
    </div>
  );
}

// Verdict tab
function VerdictTab() {
  const [activeCard, setActiveCard] = useState(null);
  const fixedScore = 91;
  return (
    <div>
      {/* Hero verdict */}
      <div style={{ background: "#0F0F0F", border: "1px solid #1A1A1A", borderRadius: 16, padding: "32px", marginBottom: 24, display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: 20, alignItems: "center", flexShrink: 0 }}>
          <div style={{ textAlign: "center" }}>
            <ScoreRing score={verdictData.score} />
            <div style={{ fontSize: 10, color: "#555", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 6 }}>Now</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div style={{ fontSize: 18, color: "#333" }}>→</div>
            <div style={{ fontSize: 9, color: "#444", letterSpacing: "0.1em", textTransform: "uppercase", textAlign: "center", maxWidth: 60 }}>fix problems</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <ScoreRing score={fixedScore} />
            <div style={{ fontSize: 10, color: "#00FF87", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 6 }}>Fixed</div>
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 240 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.2em", color: "#00FF87", marginBottom: 8, textTransform: "uppercase" }}>Vekora Viability Score</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#F0F0F0", marginBottom: 12, lineHeight: 1.3, fontFamily: "Georgia, serif" }}>"{verdictData.verdict}"</div>
          <p style={{ color: "#888", fontSize: 14, lineHeight: 1.7, margin: 0 }}>{verdictData.summary}</p>
          <div style={{ marginTop: 14, background: "#0A1A0A", border: "1px solid #1A2A1A", borderRadius: 8, padding: "10px 14px" }}>
            <span style={{ fontSize: 11, color: "#00FF87", fontWeight: 700 }}>+13 points unlocked by: </span>
            <span style={{ fontSize: 12, color: "#777" }}>first client signed, portfolio layer done, outreach started, offer reframed in plain English</span>
          </div>
        </div>
      </div>

      {/* Strengths + Risks */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
        {/* Strengths */}
        <div style={{ background: "#0A0F0A", border: "1px solid #1A2A1A", borderRadius: 14, overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #1A2A1A", display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#00FF87" }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: "#00FF87", letterSpacing: "0.1em", textTransform: "uppercase" }}>What works</span>
          </div>
          {verdictData.strengths.map((s, i) => (
            <div key={i} onClick={() => setActiveCard(activeCard === `s${i}` ? null : `s${i}`)}
              style={{ padding: "14px 20px", borderBottom: i < verdictData.strengths.length - 1 ? "1px solid #0F1A0F" : "none", cursor: "pointer", transition: "background 0.15s", background: activeCard === `s${i}` ? "#101A10" : "transparent" }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#C0C0C0" }}>{s.label}</div>
              {activeCard === `s${i}` && <div style={{ fontSize: 12, color: "#777", marginTop: 6, lineHeight: 1.6 }}>{s.detail}</div>}
            </div>
          ))}
        </div>

        {/* Risks */}
        <div style={{ background: "#0F0A0A", border: "1px solid #2A1A1A", borderRadius: 14, overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #2A1A1A", display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#EF4444" }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: "#EF4444", letterSpacing: "0.1em", textTransform: "uppercase" }}>Risks to fix</span>
          </div>
          {verdictData.risks.map((r, i) => (
            <div key={i} onClick={() => setActiveCard(activeCard === `r${i}` ? null : `r${i}`)}
              style={{ padding: "14px 20px", borderBottom: i < verdictData.risks.length - 1 ? "1px solid #1A0F0F" : "none", cursor: "pointer", transition: "background 0.15s", background: activeCard === `r${i}` ? "#1A1010" : "transparent" }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#C0C0C0" }}>{r.label}</div>
              {activeCard === `r${i}` && <div style={{ fontSize: 12, color: "#777", marginTop: 6, lineHeight: 1.6 }}>{r.detail}</div>}
            </div>
          ))}
        </div>
      </div>

      {/* Killer insight */}
      <div style={{ background: "linear-gradient(135deg, #0A1A0A, #0A0A1A)", border: "1px solid #1E2A1E", borderRadius: 14, padding: "20px 24px" }}>
        <div style={{ fontSize: 10, letterSpacing: "0.2em", color: "#00FF87", textTransform: "uppercase", marginBottom: 8 }}>Bottom Line</div>
        <p style={{ margin: 0, fontSize: 15, color: "#D0D0D0", lineHeight: 1.7, fontStyle: "italic" }}>"{verdictData.killerInsight}"</p>
      </div>
    </div>
  );
}

// Fix tab
function FixTab() {
  const [activeItem, setActiveItem] = useState(0);
  const [activeTemplate, setActiveTemplate] = useState("aiProcess");
  const [copied, setCopied] = useState(false);
  const item = vekoraFix.immediate[activeItem];
  const template = vekoraFix.outreach[activeTemplate];

  const copy = () => {
    navigator.clipboard.writeText(template.text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500); });
  };

  const channelIcons = { aiProcess: "🤖", whatsappCold: "💬", whatsappWarm: "💬", email: "📧", linkedin: "💼", facebook: "📱", reply: "↩️" };

  return (
    <div>
      {/* Priority fixes */}
      <div style={{ fontSize: 11, letterSpacing: "0.2em", color: "#555", textTransform: "uppercase", marginBottom: 12 }}>Priority Fixes — Do These In Order</div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {vekoraFix.immediate.map((item, i) => (
          <button key={i} onClick={() => setActiveItem(i)} style={{
            padding: "8px 14px", borderRadius: 8, border: `1px solid ${activeItem === i ? item.color : "#222"}`,
            background: activeItem === i ? item.color + "15" : "transparent", cursor: "pointer",
            color: activeItem === i ? item.color : "#666", fontSize: 12, fontWeight: 600, transition: "all 0.15s",
          }}>
            <span style={{ opacity: 0.7, marginRight: 4 }}>{item.priority}</span>{item.title}
          </button>
        ))}
      </div>

      <div style={{ background: "#0F0F0F", border: `1px solid ${item.color}33`, borderRadius: 14, padding: "24px", marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <div style={{ background: item.color, color: "#000", fontSize: 10, fontWeight: 800, padding: "3px 8px", borderRadius: 4, letterSpacing: "0.1em" }}>{item.priority}</div>
          <div style={{ fontSize: 17, fontWeight: 700, color: "#F0F0F0" }}>{item.title}</div>
        </div>
        <p style={{ color: "#888", fontSize: 14, marginBottom: 16, margin: "0 0 16px" }}>{item.what}</p>
        {item.before && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 11, color: "#EF4444", letterSpacing: "0.1em", marginBottom: 6, textTransform: "uppercase" }}>Before</div>
            <div style={{ background: "#150A0A", border: "1px solid #2A1010", borderRadius: 8, padding: "12px 16px", fontSize: 13, color: "#EF444490", fontStyle: "italic" }}>{item.before}</div>
            <div style={{ fontSize: 11, color: "#00FF87", letterSpacing: "0.1em", marginTop: 12, marginBottom: 6, textTransform: "uppercase" }}>After</div>
            <div style={{ background: "#0A150A", border: "1px solid #102A10", borderRadius: 8, padding: "12px 16px", fontSize: 13, color: "#00FF8790", fontStyle: "italic" }}>{item.after}</div>
          </div>
        )}
        {item.items && (
          <ul style={{ margin: "0 0 16px", padding: "0 0 0 0", listStyle: "none" }}>
            {item.items.map((it, i) => (
              <li key={i} style={{ display: "flex", gap: 10, padding: "6px 0", borderBottom: i < item.items.length - 1 ? "1px solid #151515" : "none" }}>
                <span style={{ color: item.color, flexShrink: 0, marginTop: 2 }}>→</span>
                <span style={{ fontSize: 13, color: "#AAA", lineHeight: 1.6 }}>{it}</span>
              </li>
            ))}
          </ul>
        )}
        <div style={{ background: "#0A0A0A", borderRadius: 8, padding: "12px 16px", borderLeft: `3px solid ${item.color}` }}>
          <span style={{ fontSize: 11, color: item.color, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>Why: </span>
          <span style={{ fontSize: 13, color: "#777" }}>{item.why}</span>
        </div>
      </div>

      {/* Outreach system */}
      <div style={{ fontSize: 11, letterSpacing: "0.2em", color: "#555", textTransform: "uppercase", marginBottom: 12 }}>Multi-Channel Outreach System</div>

      {/* Channel selector */}
      <div style={{ display: "flex", gap: 6, marginBottom: 0, flexWrap: "wrap" }}>
        {Object.entries(vekoraFix.outreach).map(([key, val]) => (
          <button key={key} onClick={() => setActiveTemplate(key)} style={{
            padding: "7px 13px", borderRadius: "8px 8px 0 0",
            border: `1px solid ${activeTemplate === key ? "#60A5FA" : "#222"}`,
            borderBottom: "none",
            background: activeTemplate === key ? "#60A5FA15" : "#0A0A0A",
            color: activeTemplate === key ? "#60A5FA" : "#444",
            fontSize: 11, cursor: "pointer", fontWeight: 600, transition: "all 0.15s",
          }}>
            {channelIcons[key]} {val.label}
          </button>
        ))}
      </div>

      <div style={{ background: "#0A0F1A", border: "1px solid #1A2A3A", borderRadius: "0 8px 8px 8px", padding: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#60A5FA" }}>{channelIcons[activeTemplate]} {template.label}</div>
          {activeTemplate !== "aiProcess" && (
            <button onClick={copy} style={{
              background: copied ? "#00FF8720" : "#1A2A3A", border: `1px solid ${copied ? "#00FF87" : "#2A3A4A"}`,
              borderRadius: 6, padding: "4px 12px", color: copied ? "#00FF87" : "#666",
              fontSize: 11, cursor: "pointer", transition: "all 0.2s",
            }}>
              {copied ? "✓ Copied" : "Copy"}
            </button>
          )}
        </div>
        <pre style={{ margin: 0, fontSize: 13, color: "#A0B8CC", lineHeight: 1.85, whiteSpace: "pre-wrap", fontFamily: "'Courier New', monospace" }}>{template.text}</pre>
      </div>

      {/* Value frame */}
      <div style={{ marginTop: 16, background: "#0A0A0F", border: "1px solid #1A1A2A", borderRadius: 14, padding: "18px 22px" }}>
        <div style={{ fontSize: 10, letterSpacing: "0.2em", color: "#A78BFA", textTransform: "uppercase", marginBottom: 8 }}>Pricing Confidence — Know This Cold</div>
        <p style={{ margin: 0, fontSize: 14, color: "#AAA", lineHeight: 1.8 }}>{vekoraFix.valueFrame}</p>
      </div>
    </div>
  );
}

// Pricing tab
function PricingTab() {
  const [activeTier, setActiveTier] = useState(0);
  const [view, setView] = useState("tiers");

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {["tiers", "evolution"].map(v => (
          <button key={v} onClick={() => setView(v)} style={{
            padding: "8px 16px", borderRadius: 8,
            border: `1px solid ${view === v ? "#F59E0B" : "#222"}`,
            background: view === v ? "#F59E0B15" : "transparent",
            color: view === v ? "#F59E0B" : "#555",
            fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "all 0.15s",
          }}>
            {v === "tiers" ? "💰 Pricing Tiers" : "📈 Offer Evolution"}
          </button>
        ))}
      </div>

      {view === "tiers" && (
        <div>
          {/* Tier selector */}
          <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
            {pricingTimeline.map((t, i) => (
              <button key={i} onClick={() => setActiveTier(i)} style={{
                padding: "10px 14px", borderRadius: 10, border: `1px solid ${activeTier === i ? t.color : "#1A1A1A"}`,
                background: activeTier === i ? t.color + "12" : "#0F0F0F",
                color: activeTier === i ? t.color : "#666", fontSize: 12, fontWeight: 700,
                cursor: "pointer", transition: "all 0.15s", textAlign: "center",
              }}>{t.tier}</button>
            ))}
          </div>

          {/* Active tier detail */}
          {(() => {
            const t = pricingTimeline[activeTier];
            return (
              <div style={{ background: "#0F0F0F", border: `1px solid ${t.color}33`, borderRadius: 16, overflow: "hidden" }}>
                <div style={{ padding: "24px", borderBottom: `1px solid ${t.color}22`, background: t.color + "08" }}>
                  <div style={{ fontSize: 11, color: t.color, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 8 }}>{t.tier}</div>
                  <div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
                    <div>
                      <div style={{ fontSize: 11, color: "#555", marginBottom: 4 }}>Setup fee</div>
                      <div style={{ fontSize: 32, fontWeight: 800, color: t.color }}>{t.setup}</div>
                    </div>
                    <div style={{ fontSize: 24, color: "#333" }}>+</div>
                    <div>
                      <div style={{ fontSize: 11, color: "#555", marginBottom: 4 }}>Monthly retainer</div>
                      <div style={{ fontSize: 32, fontWeight: 800, color: t.color }}>{t.retainer}</div>
                    </div>
                  </div>
                  <div style={{ marginTop: 16, background: "#0A0A0A", borderRadius: 8, padding: "10px 14px", borderLeft: `3px solid ${t.color}` }}>
                    <span style={{ fontSize: 11, color: t.color, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>Unlock trigger: </span>
                    <span style={{ fontSize: 13, color: "#777" }}>{t.trigger}</span>
                  </div>
                </div>
                <div style={{ padding: "20px 24px" }}>
                  <div style={{ fontSize: 11, color: "#555", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>What's included</div>
                  {t.includes.map((item, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, padding: "8px 0", borderBottom: i < t.includes.length - 1 ? "1px solid #111" : "none" }}>
                      <span style={{ color: t.color, flexShrink: 0 }}>✓</span>
                      <span style={{ fontSize: 13, color: "#C0C0C0", lineHeight: 1.5 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {view === "evolution" && (
        <div>
          <p style={{ fontSize: 14, color: "#777", marginBottom: 20, lineHeight: 1.7 }}>How the offer grows from a lean core product to full GOS infrastructure. Each phase only unlocks after the previous one is proven.</p>
          {offerEvolution.map((o, i) => (
            <div key={i} style={{ display: "flex", gap: 0, marginBottom: 0 }}>
              {/* Timeline line */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: 16, flexShrink: 0 }}>
                <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#F59E0B", flexShrink: 0, marginTop: 18 }} />
                {i < offerEvolution.length - 1 && <div style={{ width: 2, flex: 1, background: "#1A1A1A", minHeight: 24 }} />}
              </div>
              <div style={{ flex: 1, background: "#0F0F0F", border: "1px solid #1A1A1A", borderRadius: 12, padding: "16px 20px", marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
                  <div>
                    <div style={{ fontSize: 10, color: "#F59E0B", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 4 }}>{o.phase}</div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#F0F0F0" }}>{o.label}</div>
                  </div>
                  <div style={{ background: "#F59E0B20", border: "1px solid #F59E0B40", borderRadius: 6, padding: "4px 10px", fontSize: 12, fontWeight: 700, color: "#F59E0B", whiteSpace: "nowrap" }}>{o.price}</div>
                </div>
                <p style={{ margin: 0, fontSize: 13, color: "#777", lineHeight: 1.6 }}>{o.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Learning tab
function LearningTab() {
  const [activeStage, setActiveStage] = useState(0);
  const [activeSection, setActiveSection] = useState("learn");
  const [showQuant, setShowQuant] = useState(false);
  const stage = aiLearning[activeStage];

  return (
    <div>
      {/* Stage selector */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 24 }}>
        {aiLearning.map((s, i) => (
          <button key={i} onClick={() => { setActiveStage(i); setActiveSection("learn"); }} style={{
            padding: "14px 12px", borderRadius: 10, border: `1px solid ${activeStage === i ? s.color : "#1A1A1A"}`,
            background: activeStage === i ? s.color + "12" : "#0F0F0F", cursor: "pointer", textAlign: "left", transition: "all 0.15s",
          }}>
            <div style={{ fontSize: 10, color: activeStage === i ? s.color : "#444", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>{s.stage}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: activeStage === i ? "#F0F0F0" : "#888" }}>{s.title}</div>
            <div style={{ fontSize: 11, color: activeStage === i ? s.color + "AA" : "#333", marginTop: 4 }}>{s.weeks}</div>
          </button>
        ))}
      </div>

      {/* Stage detail */}
      <div style={{ background: "#0F0F0F", border: `1px solid ${stage.color}22`, borderRadius: 14, overflow: "hidden", marginBottom: 24 }}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #151515", background: stage.color + "08" }}>
          <div style={{ fontSize: 10, color: stage.color, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 4 }}>{stage.stage} · {stage.weeks}</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "#F0F0F0" }}>{stage.title}</div>
          <div style={{ fontSize: 13, color: "#666", marginTop: 4 }}>{stage.description}</div>
        </div>

        {/* Section tabs */}
        <div style={{ display: "flex", borderBottom: "1px solid #151515" }}>
          {["learn", "resources", "project"].map(s => (
            <button key={s} onClick={() => setActiveSection(s)} style={{
              flex: 1, padding: "10px", background: "transparent", border: "none",
              borderBottom: activeSection === s ? `2px solid ${stage.color}` : "2px solid transparent",
              color: activeSection === s ? stage.color : "#444", cursor: "pointer", fontSize: 12,
              fontWeight: 600, letterSpacing: "0.05em", textTransform: "capitalize", transition: "all 0.15s",
            }}>{s === "project" ? "🔨 Build This" : s === "resources" ? "📚 Resources" : "📖 What to Learn"}</button>
          ))}
        </div>

        <div style={{ padding: "20px 24px" }}>
          {activeSection === "learn" && stage.learn.map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 12, padding: "10px 0", borderBottom: i < stage.learn.length - 1 ? "1px solid #111" : "none" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: stage.color, flexShrink: 0, marginTop: 6 }} />
              <div style={{ fontSize: 13, color: "#C0C0C0", lineHeight: 1.6 }}>{item}</div>
            </div>
          ))}
          {activeSection === "resources" && stage.resources.map((r, i) => (
            <div key={i} style={{ display: "flex", gap: 16, padding: "12px 0", borderBottom: i < stage.resources.length - 1 ? "1px solid #111" : "none", alignItems: "flex-start" }}>
              <div style={{ background: stage.color + "20", border: `1px solid ${stage.color}40`, borderRadius: 6, padding: "4px 10px", fontSize: 12, fontWeight: 700, color: stage.color, flexShrink: 0, whiteSpace: "nowrap" }}>{r.name}</div>
              <div style={{ fontSize: 13, color: "#888", lineHeight: 1.6 }}>{r.note}</div>
            </div>
          ))}
          {activeSection === "project" && (
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#F0F0F0", marginBottom: 12 }}>🔨 {stage.project.name}</div>
              <p style={{ fontSize: 14, color: "#AAA", lineHeight: 1.7, marginBottom: 16 }}>{stage.project.description}</p>
              <div style={{ background: "#0A0A0A", borderLeft: `3px solid ${stage.color}`, borderRadius: "0 8px 8px 0", padding: "12px 16px" }}>
                <div style={{ fontSize: 11, color: stage.color, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>Why build this</div>
                <div style={{ fontSize: 13, color: "#777", lineHeight: 1.6 }}>{stage.project.why}</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quant toggle */}
      <button onClick={() => setShowQuant(!showQuant)} style={{
        width: "100%", padding: "14px 20px", background: showQuant ? "#0A0F1A" : "#0F0F0F",
        border: `1px solid ${showQuant ? "#60A5FA40" : "#1A1A1A"}`, borderRadius: 12, cursor: "pointer",
        display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: showQuant ? 0 : 0,
      }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <span style={{ fontSize: 16 }}>📈</span>
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: showQuant ? "#60A5FA" : "#888" }}>Quant Project — Step by Step</div>
            <div style={{ fontSize: 11, color: "#555", marginTop: 2 }}>3 phases · Econ edge · Imperial portfolio piece</div>
          </div>
        </div>
        <span style={{ color: "#555", fontSize: 18 }}>{showQuant ? "▲" : "▼"}</span>
      </button>
      {showQuant && (
        <div style={{ background: "#0A0F1A", border: "1px solid #1A2A3A", borderTop: "none", borderRadius: "0 0 12px 12px", padding: "20px 24px" }}>
          {quantPhases.map((phase, pi) => (
            <div key={pi} style={{ marginBottom: pi < quantPhases.length - 1 ? 24 : 0 }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12 }}>
                <div style={{ background: "#60A5FA20", border: "1px solid #60A5FA40", borderRadius: 6, padding: "3px 10px", fontSize: 11, fontWeight: 700, color: "#60A5FA" }}>{phase.phase}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#D0D0D0" }}>{phase.title}</div>
                <div style={{ fontSize: 11, color: "#60A5FA60" }}>{phase.weeks}</div>
              </div>
              {phase.steps.map((step, si) => (
                <div key={si} style={{ display: "flex", gap: 12, padding: "8px 0", borderBottom: si < phase.steps.length - 1 ? "1px solid #0F1A2A" : "none" }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", border: "1px solid #60A5FA50", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#60A5FA", flexShrink: 0 }}>{si + 1}</div>
                  <div style={{ fontSize: 13, color: "#A0B8CC", lineHeight: 1.6 }}>{step}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Deep project breakdown component
function ProjectsDeep() {
  const [activeProject, setActiveProject] = useState(0);
  const [activeSection, setActiveSection] = useState("overview");
  const p = imperialData.projects[activeProject];
  const sections = ["overview", "skills", "tools", "resources", "roadmap", "interview"];
  const sectionLabels = { overview: "Overview", skills: "Skills", tools: "Tools", resources: "Resources", roadmap: "Roadmap", interview: "Interview Qs" };

  return (
    <div>
      {/* Project selector */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8, marginBottom: 20 }}>
        {imperialData.projects.map((proj, i) => (
          <button key={i} onClick={() => { setActiveProject(i); setActiveSection("overview"); }} style={{
            padding: "12px 14px", borderRadius: 10, border: `1px solid ${activeProject === i ? proj.color : "#1A1A1A"}`,
            background: activeProject === i ? proj.color + "12" : "#0F0F0F",
            cursor: "pointer", textAlign: "left", transition: "all 0.15s",
          }}>
            <div style={{ fontSize: 10, color: activeProject === i ? proj.color : "#444", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 3 }}>{proj.tag}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: activeProject === i ? "#F0F0F0" : "#777", lineHeight: 1.3 }}>{proj.name.split(" — ")[1] || proj.name}</div>
            <div style={{ fontSize: 10, color: activeProject === i ? proj.color + "AA" : "#333", marginTop: 4 }}>{proj.stage}</div>
          </button>
        ))}
      </div>

      {/* Section tabs */}
      <div style={{ background: "#0F0F0F", border: `1px solid ${p.color}22`, borderRadius: 14, overflow: "hidden" }}>
        <div style={{ padding: "18px 22px", borderBottom: `1px solid ${p.color}22`, background: p.color + "08" }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8, flexWrap: "wrap" }}>
            <div style={{ fontSize: 10, color: p.color, letterSpacing: "0.15em", textTransform: "uppercase" }}>{p.tag}</div>
            <div style={{ fontSize: 10, background: p.color + "20", color: p.color, padding: "2px 8px", borderRadius: 4, fontWeight: 700 }}>{p.stage}</div>
          </div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#F0F0F0", marginBottom: 8 }}>{p.name}</div>
          <p style={{ margin: 0, fontSize: 13, color: "#888", lineHeight: 1.6 }}>{p.oneLiner}</p>
        </div>

        <div style={{ display: "flex", borderBottom: "1px solid #151515", overflowX: "auto" }}>
          {sections.map(s => (
            <button key={s} onClick={() => setActiveSection(s)} style={{
              padding: "10px 14px", background: "transparent", border: "none",
              borderBottom: activeSection === s ? `2px solid ${p.color}` : "2px solid transparent",
              color: activeSection === s ? p.color : "#444", cursor: "pointer",
              fontSize: 11, fontWeight: 700, whiteSpace: "nowrap", transition: "all 0.15s",
            }}>{sectionLabels[s]}</button>
          ))}
        </div>

        <div style={{ padding: "20px 22px" }}>
          {activeSection === "overview" && (
            <div>
              <div style={{ marginBottom: 18 }}>
                <div style={{ fontSize: 10, color: p.color, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>Why this project matters for Imperial</div>
                <p style={{ margin: 0, fontSize: 14, color: "#C0C0C0", lineHeight: 1.8 }}>{p.whyItMatters}</p>
              </div>
              <div style={{ background: "#0A0A0A", border: `1px solid ${p.color}30`, borderRadius: 10, padding: "16px 18px" }}>
                <div style={{ fontSize: 10, color: p.color, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>UCAS Personal Statement Frame</div>
                <p style={{ margin: 0, fontSize: 13, color: "#AAA", lineHeight: 1.8, fontStyle: "italic" }}>"{p.ucasFrame}"</p>
              </div>
            </div>
          )}

          {activeSection === "skills" && (
            <div>
              <p style={{ fontSize: 13, color: "#666", marginBottom: 16, lineHeight: 1.6 }}>Every skill this project builds — and exactly how it demonstrates CS depth to Imperial.</p>
              {p.skills.map((s, i) => (
                <div key={i} style={{ display: "flex", gap: 14, padding: "12px 0", borderBottom: i < p.skills.length - 1 ? "1px solid #111" : "none", alignItems: "flex-start" }}>
                  <div style={{ background: p.color + "20", border: `1px solid ${p.color}40`, borderRadius: 6, padding: "3px 10px", fontSize: 11, fontWeight: 700, color: p.color, flexShrink: 0, whiteSpace: "nowrap", marginTop: 1 }}>{s.skill}</div>
                  <div style={{ fontSize: 13, color: "#999", lineHeight: 1.6 }}>{s.detail}</div>
                </div>
              ))}
            </div>
          )}

          {activeSection === "tools" && (
            <div>
              <p style={{ fontSize: 13, color: "#666", marginBottom: 16 }}>Name these in your personal statement and be able to explain each one technically in an interview.</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {p.tools.map((t, i) => (
                  <div key={i} style={{ background: "#111", border: `1px solid ${p.color}30`, borderRadius: 8, padding: "8px 14px", fontSize: 13, color: "#C0C0C0", fontWeight: 600 }}>{t}</div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "resources" && (
            <div>
              <p style={{ fontSize: 13, color: "#666", marginBottom: 16 }}>Exact resources in order of priority. Don't collect them — use them.</p>
              {p.resources.map((r, i) => (
                <div key={i} style={{ display: "flex", gap: 14, padding: "12px 0", borderBottom: i < p.resources.length - 1 ? "1px solid #111" : "none", alignItems: "flex-start" }}>
                  <div style={{ background: p.color + "15", border: `1px solid ${p.color}30`, borderRadius: 6, padding: "3px 10px", fontSize: 11, fontWeight: 700, color: p.color, flexShrink: 0, whiteSpace: "nowrap" }}>{i + 1}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#D0D0D0", marginBottom: 3 }}>{r.name}</div>
                    <div style={{ fontSize: 12, color: "#666", lineHeight: 1.5 }}>{r.note}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeSection === "roadmap" && (
            <div>
              <p style={{ fontSize: 13, color: "#666", marginBottom: 16 }}>Exact steps in order. Each step has one output. Don't move on until it's done.</p>
              {p.roadmap.map((r, i) => (
                <div key={i} style={{ display: "flex", gap: 14, padding: "12px 0", borderBottom: i < p.roadmap.length - 1 ? "1px solid #111" : "none", alignItems: "flex-start" }}>
                  <div style={{ minWidth: 70, flexShrink: 0 }}>
                    <div style={{ fontSize: 11, color: p.color, fontWeight: 700 }}>{r.step}</div>
                  </div>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: p.color, flexShrink: 0, marginTop: 5 }} />
                  <div style={{ fontSize: 13, color: "#AAA", lineHeight: 1.6 }}>{r.action}</div>
                </div>
              ))}
            </div>
          )}

          {activeSection === "interview" && (
            <div>
              <p style={{ fontSize: 13, color: "#666", marginBottom: 16 }}>Prepare a clear answer to each of these before your Imperial interview. Practice out loud, not in your head.</p>
              {p.interviewQs.map((q, i) => (
                <div key={i} style={{ display: "flex", gap: 14, padding: "12px 0", borderBottom: i < p.interviewQs.length - 1 ? "1px solid #111" : "none", alignItems: "flex-start" }}>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", border: `1px solid ${p.color}60`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: p.color, flexShrink: 0 }}>Q{i + 1}</div>
                  <div style={{ fontSize: 13, color: "#C0C0C0", lineHeight: 1.6 }}>{q}</div>
                </div>
              ))}
              <div style={{ marginTop: 16, background: "#0A0A0A", borderLeft: `3px solid ${p.color}`, borderRadius: "0 8px 8px 0", padding: "12px 16px" }}>
                <div style={{ fontSize: 11, color: p.color, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>When you don't know the answer</div>
                <div style={{ fontSize: 13, color: "#777", lineHeight: 1.6 }}>"I haven't implemented that specifically — but based on how [X] works, I'd approach it by..." Shows thinking process. Never say you don't know and stop there.</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Imperial tab
function ImperialTab() {
  const [activeSection, setActiveSection] = useState("criteria");

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {["criteria", "projects", "ps", "timeline"].map(s => (
          <button key={s} onClick={() => setActiveSection(s)} style={{
            padding: "8px 16px", borderRadius: 8, border: `1px solid ${activeSection === s ? "#A78BFA" : "#222"}`,
            background: activeSection === s ? "#A78BFA15" : "transparent", cursor: "pointer",
            color: activeSection === s ? "#A78BFA" : "#555", fontSize: 12, fontWeight: 600, transition: "all 0.15s",
          }}>{{ criteria: "Selection Criteria", projects: "Your Projects", ps: "Personal Statement", timeline: "Timeline" }[s]}</button>
        ))}
      </div>

      {activeSection === "criteria" && (
        <div>
          <p style={{ fontSize: 14, color: "#777", marginBottom: 16, lineHeight: 1.7 }}>Honest assessment against Imperial CS's actual selection criteria. Tap each row.</p>
          {imperialData.criteria.map((c, i) => (
            <div key={i} style={{ background: "#0F0F0F", border: `1px solid ${c.status === "strong" ? "#00FF8720" : "#EF444420"}`, borderRadius: 10, padding: "16px 20px", marginBottom: 8, display: "flex", gap: 16, alignItems: "flex-start" }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: c.status === "strong" ? "#00FF87" : "#EF4444", flexShrink: 0, marginTop: 4 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#D0D0D0", marginBottom: 4 }}>{c.criterion}</div>
                <div style={{ fontSize: 13, color: "#777", lineHeight: 1.6 }}>{c.note}</div>
              </div>
              <div style={{ fontSize: 11, padding: "3px 8px", borderRadius: 4, background: c.status === "strong" ? "#00FF8720" : "#EF444420", color: c.status === "strong" ? "#00FF87" : "#EF4444", fontWeight: 700, flexShrink: 0 }}>{c.status === "strong" ? "STRONG" : "GAP"}</div>
            </div>
          ))}
        </div>
      )}

      {activeSection === "projects" && (
        <ProjectsDeep />
      )}

      {activeSection === "ps" && (
        <div>
          <div style={{ background: "#0A0A0F", border: "1px solid #1A1A2A", borderRadius: 12, padding: "16px 20px", marginBottom: 20 }}>
            <div style={{ fontSize: 10, color: "#A78BFA", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 8 }}>The One Rule</div>
            <p style={{ margin: 0, fontSize: 14, color: "#D0D0D0", lineHeight: 1.7 }}>Every claim needs a specific technical example. Admissions tutors read hundreds of statements from people who "built AI projects." The ones who get offers name the tools, describe the architecture, and explain what was hard.</p>
          </div>
          {imperialData.psStructure.map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 16, padding: "14px 0", borderBottom: i < imperialData.psStructure.length - 1 ? "1px solid #111" : "none", alignItems: "flex-start" }}>
              <div style={{ minWidth: 44, textAlign: "right" }}>
                <div style={{ fontSize: 11, color: "#A78BFA", fontWeight: 700 }}>{s.words}</div>
              </div>
              <div style={{ width: 1, background: "#1A1A2A", alignSelf: "stretch", flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#D0D0D0", marginBottom: 4 }}>{s.section}</div>
                <div style={{ fontSize: 13, color: "#777", lineHeight: 1.6 }}>{s.guidance}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeSection === "timeline" && (
        <div>
          {imperialData.timeline.map((t, i) => (
            <div key={i} style={{ display: "flex", gap: 16, padding: "12px 0", borderBottom: i < imperialData.timeline.length - 1 ? "1px solid #111" : "none", alignItems: "flex-start" }}>
              <div style={{ minWidth: 80, flexShrink: 0 }}>
                <div style={{ fontSize: 11, color: "#A78BFA", fontWeight: 700 }}>{t.period}</div>
              </div>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#A78BFA", flexShrink: 0, marginTop: 5 }} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#D0D0D0", marginBottom: 2 }}>{t.milestone}</div>
                <div style={{ fontSize: 12, color: "#666", lineHeight: 1.5 }}>{t.what}</div>
              </div>
            </div>
          ))}
          <div style={{ marginTop: 20, background: "#0F0A0F", border: "1px solid #2A1A2A", borderRadius: 10, padding: "14px 18px" }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#EF4444" }}>Non-negotiable: </span>
            <span style={{ fontSize: 12, color: "#888" }}>Maths A* is the gate. A past paper every week from September, no exceptions. Everything else in this document is secondary to that grade.</span>
          </div>
        </div>
      )}
    </div>
  );
}

// Weekly tab
function WeeklyTab() {
  return (
    <div>
      {/* Day grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 10, marginBottom: 28 }}>
        {weeklySchedule.map((d, i) => (
          <div key={i} style={{ background: "#0F0F0F", border: `1px solid ${d.color}25`, borderRadius: 12, padding: "16px", borderTop: `3px solid ${d.color}` }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: d.color, marginBottom: 4 }}>{d.day}</div>
            <div style={{ fontSize: 10, background: d.color + "20", color: d.color, padding: "2px 6px", borderRadius: 4, display: "inline-block", marginBottom: 8, fontWeight: 700, letterSpacing: "0.05em" }}>{d.tag}</div>
            <div style={{ fontSize: 12, color: "#777", lineHeight: 1.5 }}>{d.focus}</div>
          </div>
        ))}
      </div>

      {/* Tools grid */}
      <div style={{ fontSize: 11, letterSpacing: "0.2em", color: "#444", textTransform: "uppercase", marginBottom: 14 }}>Tools Stack</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 8 }}>
        {tools.map((t, i) => (
          <div key={i} style={{ background: "#0F0F0F", border: "1px solid #1A1A1A", borderRadius: 10, padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#D0D0D0" }}>{t.name}</div>
              <div style={{ fontSize: 11, color: "#555", marginTop: 3 }}>{t.use}</div>
            </div>
            <div style={{ fontSize: 10, color: t.color, border: `1px solid ${t.color}50`, borderRadius: 4, padding: "2px 7px", whiteSpace: "nowrap", flexShrink: 0 }}>{t.tier}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────────────────
export default function MasterDashboard() {
  const [activeTab, setActiveTab] = useState("verdict");

  const renderTab = () => {
    switch (activeTab) {
      case "verdict": return <VerdictTab />;
      case "fix": return <FixTab />;
      case "pricing": return <PricingTab />;
      case "learning": return <LearningTab />;
      case "imperial": return <ImperialTab />;
      case "weekly": return <WeeklyTab />;
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#080808", color: "#F0F0F0", fontFamily: "'DM Mono', 'Courier New', monospace", overflowX: "hidden" }}>
      {/* Header */}
      <div style={{ borderBottom: "1px solid #141414", padding: "28px 32px 0", background: "linear-gradient(180deg, #0D0D0D 0%, #080808 100%)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 28 }}>
            <div>
              <div style={{ fontSize: 10, letterSpacing: "0.25em", color: "#00FF87", marginBottom: 10, textTransform: "uppercase" }}>Master Playbook · Vekora</div>
              <h1 style={{ fontSize: "clamp(26px, 4vw, 44px)", fontWeight: 800, margin: 0, fontFamily: "Georgia, serif", lineHeight: 1.1, color: "#F0F0F0" }}>
                From 17 →{" "}
                <span style={{ color: "#00FF87" }}>Elite AI Operator</span>
              </h1>
              <p style={{ color: "#555", marginTop: 10, fontSize: 13, maxWidth: 480 }}>
                Vekora founder · Econ + Maths + CS A-level · Revenue infrastructure → GOS → Imperial
              </p>
            </div>
            <div style={{ background: "#0F0F0F", border: "1px solid #1A1A1A", borderRadius: 12, padding: "14px 18px", fontSize: 12, lineHeight: 2 }}>
              <div style={{ color: "#00FF87", fontWeight: 700, marginBottom: 2 }}>Status</div>
              <div style={{ color: "#666" }}>🏗️ Demo 1 — 2 days from done</div>
              <div style={{ color: "#666" }}>🇬🇧 Niche — UK security firms</div>
              <div style={{ color: "#666" }}>📬 Outreach — not started</div>
              <div style={{ color: "#666" }}>🎯 Target — Imperial CS</div>
            </div>
          </div>

          {/* Tab nav */}
          <div style={{ display: "flex", gap: 2, overflowX: "auto" }}>
            {tabs.map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
                padding: "10px 20px", background: "transparent", border: "none",
                borderBottom: activeTab === t.id ? "2px solid #00FF87" : "2px solid transparent",
                color: activeTab === t.id ? "#00FF87" : "#555", cursor: "pointer", fontSize: 12,
                fontWeight: 700, letterSpacing: "0.05em", whiteSpace: "nowrap", transition: "color 0.15s",
              }}>
                {t.icon} {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "28px 32px 48px" }}>
        {renderTab()}
      </div>
    </div>
  );
}
