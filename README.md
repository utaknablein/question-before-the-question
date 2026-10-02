# Vorfrage: The Question Before the Question

**AI answers what you ask. The expensive mistake is asking the wrong question.**

Large language models are optimized to be helpful on the question in front of them. In decision work, that is exactly the wrong behavior when the question itself is the mistake. A leader asks "What should we build next quarter to improve retention?" and gets a polished roadmap. Nobody checked whether churn is a product problem at all.

Vorfrage is a pre-answer layer. Before the model answers, it checks the question.

**[Try the demo](https://utaknablein.github.io/question-before-the-question/)**

```
Today:     Ask  ->  Answer
Vorfrage:  Ask  ->  Check the question  ->  Answer
```

In German law, a *Vorfrage* is the preliminary question a court must settle before it can rule on the main one.

## What it does

For any consequential question, Vorfrage returns:

1. **The question as asked**, restated neutrally.
2. **The decision behind it**, and who most likely owns that decision.
3. **The premises** the question takes as true, each rated by how much a useful answer depends on it.
4. **Three reframes**, each using one of seven shifts and each saying what answering it would change.
5. **The question before the question**: the one to settle first, with a one-line reason.

Then the person chooses: a reframe, their original question, or an edit. Vorfrage never blocks. It makes the choice visible.

## The seven shifts

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

## The demo

The page runs entirely in the browser and has three modes:

- **See examples.** Five questions leaders ask AI every week, each checked by Vorfrage. No key needed.
- **Reframe it yourself.** A worksheet that walks you through the seven shifts with no AI at all. Useful in a workshop.
- **Live with AI.** Paste your own Anthropic API key and check any question. The key goes straight from your browser to Anthropic and is never stored.

The system prompt used in live mode is published in full at [prompts/vorfrage-system-prompt.md](prompts/vorfrage-system-prompt.md). Transparency about the instructions is part of the method.

## Why this matters now

- **Answers are now free; framing is not.** When any question gets a fluent answer in seconds, the scarce input moves upstream to the question.
- **Models detect bad premises but rarely redirect.** Research on real patient questions found models often fail to redirect a flawed question even when they detect the flawed premise ([MedRedFlag, 2026](https://arxiv.org/pdf/2601.09853)). Asking models to raise clarifying questions first improved answers substantially in another study ([Easy Problems that LLMs Get Wrong, 2024](https://arxiv.org/html/2405.19616v1)).
- **Benchmarks stop at facts.** Current research tests false factual premises and missing details ([AskBench, 2026](https://arxiv.org/html/2602.11199)). The costly executive failure is a question that is factually fine and strategically mis-framed. That gap is not yet measured.

## Where it goes next

The demo shows the interaction. The product is a layer that sits in front of an organization's internal AI assistants for high-stakes questions, with a record of which reframes changed decisions. That record makes it possible to measure question quality over time, and it doubles as evidence of human oversight of AI-assisted decisions.

## Repository

```
index.html                          The demo (GitHub Pages)
METHOD.md                           The seven shifts, triage, and design principles
prompts/vorfrage-system-prompt.md   The exact prompt used in live mode
examples/                           Worked examples in the JSON output format
```

To publish: Settings, then Pages, then deploy from the `main` branch root.

## About

Built by [Uta Knablein](https://www.linkedin.com/in/utaknablein), former Chief Product Officer at iHeartMedia, named inventor on nine US patents, and advisor on AI operating models in the US and DACH. Part of a body of work on judgment in the AI era, alongside the [ENGINE AI maturity diagnostic](https://github.com/utaknablein/engine-diagnostic), the [product operating system](https://github.com/utaknablein/product-operating-system) and [agent workflows for leadership](https://github.com/utaknablein/agent-workflows).

To run a *Question Before the Question* session with a leadership team, in English or German, reach out on [LinkedIn](https://www.linkedin.com/in/utaknablein).

## License

Code: MIT. Method and text (METHOD.md, the seven shifts, examples): CC BY-NC 4.0. See [LICENSE](LICENSE).
