# Vorfrage: The Question Before the Question

**AI answers what you ask. The expensive mistake is asking the wrong question.**

AI has removed much of the friction between a decision and its execution. That makes a badly framed decision more dangerous, not less. Vorfrage is a pre-answer layer: before the model answers, it checks the question.

**[Try the demo](https://utaknablein.github.io/question-before-the-question/)**

## What it does

**The question**

> Should we build our own AI search or buy a vendor?

**The answer you would have gotten**

> Buy. A vendor gives you better relevance out of the box, faster time to market and lower maintenance. Here is a cost comparison over three years.

**What that answer misses**

> The new engine indexes the same messy metadata and content structure. Results stay poor, and now you also have a multi-year contract.

**The question before the question**

> What evidence shows the search engine is the constraint, rather than metadata, content structure, or nobody owning what a good result means?

That question changes what gets investigated before millions of dollars and engineering capacity are committed. Then the person chooses: answer the reframe, answer the original question as asked, or edit it. Vorfrage never blocks. It makes the choice visible.

In German law, a *Vorfrage* is the preliminary question a court must settle before it can rule on the main one.

## The larger idea: instrument judgment

The prototype reframes questions. The larger idea is to instrument judgment.

```
Original question → assumptions → reframe → decision → outcome
```

Over time, that creates a record of where an organization repeatedly asks the wrong question, and which reframes actually improve decisions. Model providers see prompts. They do not see the decision that followed. That record is the asset, and it doubles as evidence of human oversight of AI-assisted decisions.

## Five decisions in the demo

Each one has an answer that sounds right and walks past the real issue.

| The question | What Vorfrage asks first |
| --- | --- |
| Should we build our own AI search or buy a vendor? | What evidence shows the search engine is the constraint? |
| What feature should we launch to reduce churn? | Which customers are leaving, and are they the ones we want to keep? |
| Should we replace part of our support team with AI agents? | Which of our contacts should not exist at all? |
| Which AI initiative will generate the highest ROI? | What will count as return, by when, and who owns the number? |
| Should our AI agents be allowed to approve refunds without a human? | When the agent makes the wrong call, who answers for it? |

Full worked versions are in [examples/](examples/).

## How it gets there

Every check returns: the question restated, the answer you would have gotten and what it misses, the decision behind the question and who owns it, the premises it takes as true (rated by how much a useful answer depends on each), three reframes, and the one question to settle first.

The reframes come from seven possible shifts:

| Shift | The question it asks |
| --- | --- |
| Upstream | What goal is this question serving, and is there a better route to it? |
| Premise | What must be true for this question to make sense? |
| Scope | Is this too narrow, or too broad, to act on? |
| Owner | Whose question is this, and are they the one asking? |
| Timing | Why now, and what changes if it waits? |
| Measure | What would count as a good answer, and who decides? |
| Inversion | What should we stop, or what would make the opposite true? |

The full method, including when *not* to reframe, is in [METHOD.md](METHOD.md).

## Try it

The demo runs entirely in the browser:

- **See examples.** The five decisions above. No key needed.
- **Reframe it yourself.** A worksheet that walks through the seven shifts with no AI at all. Useful in a workshop.
- **Live with AI.** Paste your own Anthropic API key and check any question. The key goes straight from your browser to Anthropic and is never stored.

The system prompt used in live mode is published in full at [prompts/vorfrage-system-prompt.md](prompts/vorfrage-system-prompt.md). Transparency about the instructions is part of the method.

## Use it inside ChatGPT or Claude

- **Custom GPT** (no code): [chatgpt/CUSTOM_GPT.md](chatgpt/CUSTOM_GPT.md) has everything to paste into the GPT builder.
- **MCP server** (a ChatGPT app and a Claude connector): [mcp-server/](mcp-server/) is a one-tool server that needs no API key. It triages the question and hands the host model the framing to follow.

## Why now

- **Models detect bad premises but rarely redirect.** Research on real patient questions found models often fail to redirect a flawed question even when they detect the flawed premise ([MedRedFlag, 2026](https://arxiv.org/pdf/2601.09853)). Asking models to raise clarifying questions first improved answers substantially in another study ([Easy Problems that LLMs Get Wrong, 2024](https://arxiv.org/html/2405.19616v1)).
- **Benchmarks stop at facts.** Current research tests false factual premises and missing details ([AskBench, 2026](https://arxiv.org/html/2602.11199)). The costly executive failure is a question that is factually fine and strategically mis-framed. That gap is not yet measured.

## Repository

```
index.html                          The demo (GitHub Pages)
METHOD.md                           The seven shifts, triage and design principles
prompts/vorfrage-system-prompt.md   The exact prompt used in live mode
examples/                           The five demo decisions in the JSON output format
chatgpt/                            Custom GPT configuration and icon
mcp-server/                         MCP server for ChatGPT apps and Claude connectors
```

## About

Built by [Uta Knablein](https://www.linkedin.com/in/utaknablein), former Chief Product Officer at iHeartMedia and WW. Part of a body of work on what happens to management when machines make execution cheap, alongside [ENGINE](https://github.com/utaknablein/engine-diagnostic), the [Product Operating System](https://github.com/utaknablein/product-operating-system), [Board Devil's Advocate](https://github.com/utaknablein/board-devils-advocate) and [Agent Workflows](https://github.com/utaknablein/agent-workflows).

To run a *Question Before the Question* session with a leadership team, in English or German, reach out on [LinkedIn](https://www.linkedin.com/in/utaknablein).

## License

Code: MIT. Method and text (METHOD.md, the seven shifts, examples): CC BY-NC 4.0. See [LICENSE](LICENSE).
