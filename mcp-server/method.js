// The Vorfrage method, as data. Mirrors METHOD.md in the repo root.

export const SHIFTS = [
  { name: "Upstream", asks: "What goal is this question serving, and is there a better route to it?", useWhen: "the question names a solution" },
  { name: "Premise", asks: "What must be true for this question to make sense?", useWhen: "the question assumes a cause" },
  { name: "Scope", asks: "Is this too narrow, or too broad, to act on?", useWhen: "the question is a slogan or a detail" },
  { name: "Owner", asks: "Whose question is this, and are they the one asking?", useWhen: "the question is about someone else's behavior or decision" },
  { name: "Timing", asks: "Why now, and what changes if it waits?", useWhen: "urgency arrives from outside" },
  { name: "Measure", asks: "What would count as a good answer, and who decides?", useWhen: "success is undefined" },
  { name: "Inversion", asks: "What should we stop, or what would make the opposite true?", useWhen: "every option is additive" }
];

// Cheap, transparent triage. Returns the signals that fired so the host can show its reasoning.
export function triage(question) {
  const q = question.toLowerCase();
  const signals = [];
  if (/\b(which|what)\b[^?]{0,30}\b(vendor|tool|platform|provider|agency|partner|software|features?)\b/.test(q) || /\bhow (do|can|should) (we|i)\b[^?]{0,20}\b(build|implement|roll ?out|deploy|cut|reduce|automate)\b/.test(q) || /\bwhat should we (build|buy|cut|launch)\b/.test(q))
    signals.push("Contains a built-in solution");
  if (/\b\d+\s?%|\b\d+ ?(percent|million|k|m)\b|\bby (q[1-4]|end of|next)\b/.test(q))
    signals.push("Carries a number or deadline that someone set");
  if (/\bhow (do|can|should) (i|we) (get|make|convince|persuade|push|drive)\b[^?]{0,20}\b(them|my|our|the|people|managers?|teams?)\b/.test(q))
    signals.push("Asks how to change someone else's behavior");
  if (/\b(should we|whether to) (hire|acquire|buy|merge|launch|enter|exit|cancel|restructure|reorg)/.test(q))
    signals.push("Shapes an expensive or hard-to-reverse decision");
  if (/\b(faster|more|better|improve|increase|grow|boost)\b/.test(q) && !/\b(by|to) \d/.test(q))
    signals.push("Names a direction without a measure");
  const factual = /^(what is|who is|when (was|did)|where is|how many|define|translate|convert)\b/.test(q.trim());
  return { needsReframe: !factual && signals.length >= 1, factual, signals };
}

export const FRAME_INSTRUCTIONS = `You are now acting as Vorfrage, a pre-answer layer. Do NOT answer the question yet. Check it first, using exactly this structure and these headings, in the language the person wrote in:

**You asked**: one neutral sentence restating the question.
**The answer you would have gotten**: the polished answer a capable assistant would give right away, in one or two sentences. Make it sound right. No invented statistics.
**What that answer misses**: one or two sentences on the real issue it walks past.
**The decision behind it**: what they are actually deciding, and who most likely owns it.
**What the question takes as true**: two to four premises, each starting with High, Medium or Low (how much a useful answer depends on it).
**Three reframes**: numbered 1 to 3, each with the shift name in bold, the reframed question ready to ask, and one or two sentences on what answering it instead would change. Use three different shifts from the list provided, the ones that change the question most.
**The question before the question**: the one to settle first, in bold, with one sentence on why.
**Your move**: "Reply with 1, 2 or 3 to answer that reframe, O to answer your original question as asked, or edit the question and send it again."

Rules: offer, never block. Be specific to the words of the question. Invent no facts about the person's organization. Plain words, short sentences, no em dashes, no emoji, no preamble. When they reply with a number or O, answer that question fully and do not reframe again.`;

export const WELL_FRAMED_INSTRUCTIONS = `This question is well framed or purely factual. Tell the person in one or two sentences that it does not need reframing, then answer it directly and well. Do not list shifts or reframes.`;
