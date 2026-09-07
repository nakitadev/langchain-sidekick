---
title: LangChain Sidekick
emoji: ⚡
colorFrom: blue
colorTo: indigo
sdk: static
short_description: Personal AI assistant worker in an evaluator loop
tags:
- langchain
- langgraph
- agents
- mcp
- gradio
---

# 🤖 LangChain Sidekick

> **Your personal AI co-worker:** A LangChain/LangGraph worker agent wrapped in an evaluator loop with human-in-the-loop approval, persistent MCP tools, and a live todo plan.

![Sidekick Header](https://img.shields.io/badge/LangChain-1.3+-blue.svg)
![LangGraph](https://img.shields.io/badge/LangGraph-1.2+-purple.svg)
![Gradio](https://img.shields.io/badge/Gradio-6.14+-orange.svg)
![MCP](https://img.shields.io/badge/Model_Context_Protocol-Playwright_%26_Filesystem-blueviolet.svg)

---

## 🌟 Highlights

1. **Layer 3 Worker Agent (`create_agent`)**:
   - Uses OpenRouter (`openai/gpt-5.4-mini` or any leading model) equipped with real-world tools.
2. **Homemade Evaluator Loop**:
   - Checks the worker's output against the user's explicit **Success Criteria**.
   - Evaluates whether criteria were met, if user input or human intervention is required, or gives constructive feedback and re-dispatches the worker.
3. **Multi-Server MCP (Model Context Protocol)**:
   - **Playwright MCP**: Headless/headed browser automation (`@playwright/mcp@latest --isolated`).
   - **Filesystem MCP**: Sandboxed file system access (`@modelcontextprotocol/server-filesystem`).
   - Persistent MCP sessions so the browser maintains cookies and state across multi-step tasks.
4. **Middleware Protection Stack**:
   - `TolerateToolErrors`: Prevents browser/web tool exceptions from crashing the agent run.
   - `TodoListMiddleware`: Generates and manages real-time status of todo tasks.
   - `PIIMiddleware`: Redacts sensitive emails and credit cards from inputs and tool results.
   - `ModelCallLimitMiddleware`: Guards against runaway loop costs with a strict call budget.
5. **Human-in-the-Loop Approval**:
   - Pauses execution and asks for approval before sensitive actions or when hitting captchas/2FA.

---

## 🚀 Live Demo Features in this Space

This Space provides an interactive client-side simulation and execution studio:
- **Interactive Simulation Studio**: Experience realistic runs (flight booking queries, Wikipedia knowledge research, competitor pricing scrapes).
- **Direct API Execution**: Plug in your OpenRouter API key to test prompt iterations in real time directly in your browser.
- **Live Plan / Todo Panel**: Watch the plan evolve in real time with status dots (`pending`, `in_progress`, `completed`).
- **Human-in-the-Loop Gateway**: Interactive approval drawer for sensitive tool actions.
- **Architecture Explorer**: Complete diagrams and Python source code viewer.

---

## 💻 Running the Full Python App Locally

1. **Clone the repository**:
   ```bash
   git clone https://huggingface.co/spaces/nakitadev/langchain-sidekick
   cd langchain-sidekick
   ```

2. **Configure Environment Variables**:
   Create a `.env` file with:
   ```env
   OPENROUTER_API_KEY=your_openrouter_key
   SERPER_API_KEY=your_google_serper_key  # optional for Google search
   PUSHOVER_TOKEN=your_pushover_token     # optional for phone notifications
   PUSHOVER_USER=your_pushover_user       # optional for phone notifications
   ```

3. **Install Dependencies & Run**:
   Using [uv](https://docs.astral.sh/uv/):
   ```bash
   uv run app.py
   ```
   Or using standard virtual environment:
   ```bash
   python -m venv .venv
   source .venv/bin/activate
   pip install -r requirements.txt
   python app.py
   ```

---

## 🛠️ Switching to Compute / ZeroGPU

When Hugging Face PRO or a community grant is active on this Space:
1. Update `sdk: gradio` in the `README.md` frontmatter.
2. Set `OPENROUTER_API_KEY` in **Settings > Variables and secrets**.
3. Re-deploy to run the backend Python server directly on Hugging Face compute!
