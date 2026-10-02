// Vorfrage MCP server.
// One tool, check_question, plus the method as a resource. No API key: the tool returns
// the triage result and the framing instructions, and the host model (ChatGPT, Claude,
// any MCP client) does the reframing itself. That keeps it model-neutral and free to run.
//
//   node server.js            HTTP (streamable) on PORT, endpoint /mcp   <- for ChatGPT apps
//   node server.js --stdio    stdio                                       <- for Claude Desktop and local use

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import express from "express";
import { z } from "zod";
import { SHIFTS, triage, FRAME_INSTRUCTIONS, WELL_FRAMED_INSTRUCTIONS } from "./method.js";

const METHOD_TEXT = `# The Vorfrage method\n\nSeven shifts:\n` +
  SHIFTS.map(s => `- ${s.name}: ${s.asks} Use when ${s.useWhen}.`).join("\n") +
  `\n\nSteps: restate; name the decision and owner; surface two to four premises rated High, Medium, Low; offer three reframes on three different shifts; pick the question to settle first. Offer, never block.`;

export function buildServer() {
  const server = new McpServer({ name: "vorfrage", version: "0.1.0" }, {
    instructions: "Vorfrage checks whether a question is the right question before you answer it. Call check_question whenever a user asks something that shapes a decision: strategy, hiring, budgets, roadmaps, vendor choices, 'how do I get my team to'. Skip it for factual lookups and drafting."
  });

  server.registerTool("check_question", {
    title: "Check the question before answering",
    description: "Checks whether a question is the right one to answer. Returns triage signals and, if the question deserves it, the exact framing to follow: the decision behind it, its premises, three reframes using the seven shifts, and the question to settle first. Use before answering any consequential question.",
    inputSchema: {
      question: z.string().min(3).max(2000).describe("The question the user is about to ask, verbatim."),
      context: z.string().max(2000).optional().describe("Optional: who is asking and what they are deciding, if known.")
    },
    annotations: { readOnlyHint: true, openWorldHint: false, idempotentHint: true }
  }, async ({ question, context }) => {
    const t = triage(question);
    const payload = {
      question,
      context: context ?? null,
      needsReframe: t.needsReframe,
      triageSignals: t.signals,
      shifts: t.needsReframe ? SHIFTS : [],
      instructions: t.needsReframe ? FRAME_INSTRUCTIONS : WELL_FRAMED_INSTRUCTIONS
    };
    return {
      content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
      structuredContent: payload
    };
  });

  server.registerResource("method", "vorfrage://method", {
    title: "The Vorfrage method",
    description: "The seven shifts and the five steps, for reference.",
    mimeType: "text/markdown"
  }, async (uri) => ({ contents: [{ uri: uri.href, mimeType: "text/markdown", text: METHOD_TEXT }] }));

  server.registerPrompt("vorfrage", {
    title: "Check this question first",
    description: "Run the Vorfrage check on a question before answering it.",
    argsSchema: { question: z.string().describe("The question to check") }
  }, ({ question }) => ({
    messages: [{ role: "user", content: { type: "text", text: `${FRAME_INSTRUCTIONS}\n\nShifts:\n${SHIFTS.map(s => `- ${s.name}: ${s.asks}`).join("\n")}\n\nThe question:\n\n${question}` } }]
  }));

  return server;
}

async function main() {
  if (process.argv.includes("--stdio")) {
    await buildServer().connect(new StdioServerTransport());
    return;
  }
  const app = express();
  app.use(express.json({ limit: "1mb" }));
  app.get("/", (_req, res) => res.type("text/plain").send("Vorfrage MCP server. Endpoint: POST /mcp"));
  app.get("/healthz", (_req, res) => res.json({ ok: true }));
  // Stateless: a fresh server and transport per request, so it runs on any serverless host.
  app.all("/mcp", async (req, res) => {
    const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });
    res.on("close", () => transport.close());
    await buildServer().connect(transport);
    await transport.handleRequest(req, res, req.body);
  });
  const port = Number(process.env.PORT) || 3000;
  app.listen(port, () => console.log(`Vorfrage MCP listening on http://localhost:${port}/mcp`));
}

if (import.meta.url === `file://${process.argv[1]}`) main().catch(e => { console.error(e); process.exit(1); });
