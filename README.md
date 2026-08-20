# langchain-sidekick

A personal assistant agent built with LangChain / LangGraph: a `create_agent` worker
wrapped in a homemade evaluator loop. The worker has a real web browser (Playwright MCP),
a sandboxed filesystem (filesystem MCP), web search, Wikipedia, and push notifications.
It plans its work with a visible todo list, pauses for human approval before sensitive
actions, and self-checks its answers against your success criteria before replying.

## Setup

```bash
uv sync
cp .env.example .env   # fill in your API keys
```

Required environment variables (`.env`):

- `OPENROUTER_API_KEY` — the worker and evaluator models ([openrouter.ai](https://openrouter.ai))
- `SERPER_API_KEY` — web search ([serper.dev](https://serper.dev))
- `PUSHOVER_TOKEN` / `PUSHOVER_USER` — push notifications ([pushover.net](https://pushover.net)), optional

The browser and filesystem tools run via MCP over `npx`, so Node.js must be installed.

## Run

```bash
uv run app.py
```

Opens a Gradio UI in your browser. Type a request and success criteria, hit Go, and
watch the plan panel update as the Sidekick works. If it needs to send a push
notification or ask for your help in the browser, it pauses for your approval.

## Files

- `app.py` — Gradio UI
- `sidekick.py` — the worker agent and evaluator loop
- `sidekick_tools.py` — tool setup: MCP servers (browser, filesystem), web search, Wikipedia, push notifications
- `styles.py` — theme, CSS and JS for the UI
