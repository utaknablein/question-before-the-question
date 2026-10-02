// Smoke test: spawn the HTTP server, connect an MCP client, call the tool twice.
import { spawn } from "node:child_process";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

const port = 3456;
const proc = spawn("node", ["server.js"], { env: { ...process.env, PORT: String(port) }, stdio: ["ignore", "pipe", "inherit"] });
await new Promise(r => proc.stdout.on("data", d => d.toString().includes("listening") && r()));

try {
  const client = new Client({ name: "test", version: "0" });
  await client.connect(new StreamableHTTPClientTransport(new URL(`http://localhost:${port}/mcp`)));
  const tools = await client.listTools();
  console.log("tools:", tools.tools.map(t => t.name));

  for (const q of ["Which AI vendor should we choose for our chatbot?", "What is the capital of Australia?"]) {
    const r = await client.callTool({ name: "check_question", arguments: { question: q } });
    const s = r.structuredContent;
    console.log(`\n"${q}"\n  needsReframe=${s.needsReframe} signals=${JSON.stringify(s.triageSignals)}`);
  }
  const res = await client.readResource({ uri: "vorfrage://method" });
  console.log("\nresource ok:", res.contents[0].text.split("\n")[0]);
  await client.close();
  console.log("\nPASS");
} finally {
  proc.kill();
}
