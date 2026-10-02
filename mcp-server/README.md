# Vorfrage MCP server

One tool, `check_question`. Give it a question; it returns whether the question deserves a reframe, which triage signals fired, the seven shifts, and the exact framing the host model should follow. The host model (ChatGPT, Claude, or any MCP client) does the reframing itself, so the server needs no API key and costs nothing to run.

This is the route to a listed ChatGPT app. It also works as a Claude connector and in Claude Desktop.

## Run it locally

```bash
cd mcp-server
npm install
npm start          # http://localhost:3000/mcp
npm test           # smoke test: lists the tool, calls it twice
```

## Deploy it (needed for ChatGPT)

ChatGPT needs a public HTTPS URL. Any Node host works. Two that take under ten minutes:

**Railway.** New project, deploy from GitHub, set the root directory to `mcp-server`. Railway reads `npm start` and sets `PORT` itself. Copy the public URL and add `/mcp`.

**Render.** New Web Service, root directory `mcp-server`, build `npm install`, start `npm start`. Free tier sleeps after inactivity, which is fine for testing and not fine for a listed app.

Check it: `curl https://YOUR-HOST/healthz` should return `{"ok":true}`.

## Connect it to ChatGPT

**For yourself and for testing (Developer mode):**

1. In ChatGPT, open Settings, then Apps and Connectors, then Advanced, and turn on Developer mode.
2. Click Create, give it the name Vorfrage, paste `https://YOUR-HOST/mcp`, set authentication to None.
3. In a new chat, pick Vorfrage from the tools menu and ask: "Which AI vendor should we choose for our chatbot?" ChatGPT calls `check_question` and follows the framing it gets back.

**For everyone (a listed app):** OpenAI's submission portal takes the production `/mcp` URL, a verified domain, a privacy policy and terms page, a logo, five positive and three negative test cases, and a short review. Use `chatgpt/icon.svg` for the logo and the questions in `chatgpt/CUSTOM_GPT.md` as the test cases. Plan support varies: at the time of writing, write actions were limited to Business, Enterprise and Edu plans. Vorfrage is read-only, so that limit does not apply.

Until the app is approved, the Custom GPT in `chatgpt/CUSTOM_GPT.md` is the public route, and it needs no server at all.

## Connect it to Claude

**Claude.ai and the desktop app:** Settings, then Connectors, then Add custom connector. Name Vorfrage, URL `https://YOUR-HOST/mcp`.

**Claude Desktop, local, no deployment:** add this to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "vorfrage": {
      "command": "node",
      "args": ["/absolute/path/to/question-before-the-question/mcp-server/server.js", "--stdio"]
    }
  }
}
```

**Claude Code:** `claude mcp add vorfrage -- node /absolute/path/to/mcp-server/server.js --stdio`

## What the server exposes

| Kind | Name | What it does |
| --- | --- | --- |
| Tool | `check_question` | Triage plus framing instructions. Read-only, idempotent. |
| Resource | `vorfrage://method` | The seven shifts and five steps as markdown. |
| Prompt | `vorfrage` | A ready-made prompt that runs the full check on a question. |

The triage in `method.js` is deliberately simple and readable: a handful of patterns that catch built-in solutions, imposed targets, "how do I get them to", hard-to-reverse decisions, and directions without a measure. Factual lookups and drafting requests pass through untouched. Edit the patterns to fit your organization's vocabulary.

## Where the data goes

The server stores nothing. Every call is stateless. The enterprise version described in the business plan adds one thing: a log of which reframe the person chose, which is the asset the product is built on.
