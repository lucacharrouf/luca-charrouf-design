---
title: "The cave we keep describing"
description: "Language models have mastered the shadows on the wall without ever seeing the objects casting them — on why thinking may not live inside words, and what that means for the next chapter of AI."
date: "2026-04-19"
readTime: "9 min"
slug: "the-cave-we-keep-describing"
tags: ["Essay", "AI"]
draft: false
---

There’s a stroke patient in a study I read last week who can beat you at chess, navigate a city she’s never been to, and tell you what her friend is probably thinking right now. She also cannot produce a sentence. The language network in her brain has been almost entirely destroyed, and most of her cognition is intact anyway.

Meanwhile the frontier AI models that trillions of dollars are currently being spent to scale are, according to a paper that came out two weeks ago, hitting a wall on the same kind of reasoning she still does effortlessly. Six orders of magnitude of compute from a toy model to GPT-5.4, and four extra steps of silent planning to show for it.

This is strange, and I want to figure out why it's strange.

I remember a class at Berkeley where a professor spent most of a semester on semantics. Decades of work on how to get machines to understand what words mean. Frame semantics, lexical semantics, distributional hypotheses, the whole canon. Then transformers showed up and it felt like the whole field had been quietly sidestepped. Not solved — sidestepped. You didn't need to crack meaning anymore. You just needed enough text and enough compute and something that looked like understanding would fall out.

I've been thinking about this a lot lately, because I'm not sure the sidestep was as clean as it looked. The thing I keep coming back to is a question that feels almost too basic to ask: why language at all? We built language models because language was the data we had, not because language is where thinking happens. Those are very different reasons and we've stopped distinguishing between them.

The claim I want to make, and I'll try to earn it by the end: the assumption that thinking requires language may turn out to be the most consequential wrong turn in modern AI. If it's right, a lot of what the frontier labs are currently doing is pointed slightly off from where the next real gains are.

Language, if you squint at it long enough, is a codec. It's the format humans evolved to get thoughts out of one head and into another, across a channel with absurdly low bandwidth compared to what's actually happening inside the brain. About a hundred bits per second of speech versus whatever is going on in the cortex behind it. A recent paper on multimodal pretraining put it in a way I found hard to shake: text is a human abstraction — a lossy compression of reality, and language models have mastered the description of shadows on the wall without ever seeing the objects casting them [[arXiv]](https://arxiv.org/html/2603.03276v1). Plato's Cave, dressed up in a 2026 arxiv paper.

This isn't a philosophical complaint. It has a pragmatic edge. High-quality text data is finite and approaching exhaustion [[arXiv]](https://arxiv.org/html/2603.03276v1). Every frontier lab is now quietly rereading the same filtered corpus with different tricks. We are, in a fairly literal sense, running out of shadows to train on. Which raises the question of what happens when you stop being able to scale the thing you've been scaling.

A paper came out a couple of weeks ago called *The Depth Ceiling* that I can't stop thinking about. The setup is almost boring — path-finding on star graphs. Picture a central node with several arms radiating out like a starfish, each arm a chain of nodes. The model sees the graph, a starting point, and a destination, and has to output the right path. The only way to know which arm to commit to is to look several steps ahead down each one and check where it ends.

What makes the experiment interesting is the constraint. They trained the models with only final-answer supervision. No chain of thought. No scratchpad. Just the answer. Which means whatever reasoning the model does, it has to do silently, inside a single forward pass. No thinking out loud. No showing your work. The question the paper asks is: how deep can a transformer actually reason when you take away its ability to externalize the reasoning?

The answer is the thing I can't stop thinking about.

> Tiny transformers trained from scratch discover strategies requiring up to three latent steps. Fine-tuned GPT-4o and Qwen3-32B reach five. GPT-5.4 attains seven under few-shot prompting [[arXiv]](https://arxiv.org/abs/2604.06427).

Sit with that. A 1.6 million parameter toy model gets three steps. A frontier model gets seven. Six orders of magnitude of compute, four extra steps of silent reasoning. That is the entire return curve.

The paper has a subtler finding that I think is even more important. *This reveals a dissociation between the ability to discover a latent strategy under final-answer supervision alone and the ability to execute it once discovered* [[arXiv]](https://arxiv.org/abs/2604.06427v1). The machinery to run an eight-step plan exists in the weights. The training signal just can't find it. The bottleneck isn't the model's capacity to think. It's our ability to teach it to think silently, from supervision on the answer alone.

The authors' implication is the quiet part out loud: *strategies requiring multiple coordinated latent planning steps may need to be explicitly taught or externalized* [[arXiv]](https://arxiv.org/abs/2604.06427v1). Which is a nice way of saying: whatever deep reasoning these models do, it has to come out into language to happen at all. The model thinks in tokens, not behind them.

That struck me as a strange thing. If the machine can only reason by externalizing into language, and humans supposedly think in language too, then maybe that's just what thinking is. Everyone reasons in words, machines and humans alike, and the Depth Ceiling is just telling us something about the efficiency of transformer forward passes.

Then I started reading the neuroscience, and it turns out that premise is wrong. Not slightly wrong. Fundamentally, empirically wrong.

There's a neuroscientist at MIT named Evelina Fedorenko who has spent most of her career on this exact question, and the answer her lab has converged on is that humans — the species we're supposedly modeling — do not think in words.

The canonical paper is from 2024, in *Nature*, with the kind of title that tells you the authors are tired of being misunderstood: *Language is primarily a tool for communication rather than thought*. The argument, in her own framing: *language does not appear to be a prerequisite for complex thought, including symbolic thought* [[Gwern]](https://gwern.net/doc/psychology/linguistics/2024-fedorenko.pdf).

The evidence runs in two directions and both are pretty wild.

The first is fMRI. There's a specific network in the left hemisphere that lights up for language — reading, speaking, listening, signing. You'd expect this network to also light up when people do the things we associate with "verbal thinking." It doesn't. *The language network responds to written, spoken, or signed words and sentences, but not to mental arithmetic, music perception, executive function tasks, action or gesture perception, or computer programming* [[PubMed Central]](https://pmc.ncbi.nlm.nih.gov/articles/PMC10158592/).

Read that list again. Computer programming. A symbolic language, written in text, parsed by the same visual system that reads natural language. Does not activate the language network. It activates the general reasoning network, the one people use for mental arithmetic and logic puzzles and planning a route through a city. Whatever your brain is doing when you read code, it is not doing language.

The second line of evidence is more dramatic. There are patients with global aphasia, which is what happens when the language network is destroyed by stroke or injury. These patients cannot understand or produce sentences in any meaningful way. The language network is, for them, offline. And yet: *despite their near-total loss of language, these individuals are nonetheless able to add and subtract, solve logic problems, think about another person's thoughts, appreciate music, and successfully navigate their environments* [[PubMed]](https://pubmed.ncbi.nlm.nih.gov/27096882/).

They can do theory of mind. They can reason about what another person is thinking. Without language. The thing we assumed was the most linguistic cognitive task we have survives the destruction of the language network.

When Fedorenko was asked if this is still a controversial view in her field, her answer was: *"it's not controversial, as far as I'm concerned, but certainly will keep debating"* [[Substack]](https://mindandmatter.substack.com/p/neural-basis-of-language-in-the-human). Outside neuroscience, people still argue about it. Inside, it's settled.

This changes the shape of the problem completely. Humans evolved thought first, and language second, as an export format. We built machines the other way around. We gave them the export format and hoped thought would emerge from it. And to some extent it has, because language is a remarkably dense encoding of human cognition — when you learn to produce fluent language you inherit a lot of the structure of the thinking that produced it. But the emergence has limits, and the Depth Ceiling paper is one concrete measurement of those limits.

So what does it look like to try reasoning without words inside a machine?

It turns out people are trying. The most interesting attempt I've come across is from Meta, a paper from late 2024 called *Coconut*, for Chain of Continuous Thought. The pitch: *the language space may not always be optimal for reasoning. Most word tokens primarily ensure textual coherence and are not essential for reasoning, while some critical tokens require complex planning and pose challenges to LLMs* [[arXiv]](https://arxiv.org/abs/2412.06769).

The mechanism is elegant. Instead of decoding each reasoning step into text, Coconut takes the model's hidden state — a high-dimensional continuous vector, not a word — and feeds it back into the model as the next input directly, skipping the trip through language entirely. The reasoning never surfaces as tokens. It stays latent.

This is not a cosmetic change. A word commits. Once you've said "Paris" you've collapsed all the other possibilities. A continuous vector can hold superposition — multiple candidate paths at once — and resolve later. *Continuous thoughts can encode multiple alternative next steps, allowing the model to perform a breadth-first search rather than committing prematurely to a single deterministic path* [[arXiv]](https://arxiv.org/abs/2412.06769). Language-based reasoning is depth-first by necessity. You say one word, then the next, then the next. Latent reasoning can be breadth-first. That is a genuinely different computational style, and the Coconut paper shows it outperforms chain-of-thought on exactly the tasks that require substantial backtracking.

What made me smile was noticing what the Coconut authors cite to justify their architecture. *Neuroimaging studies show that human reasoning often occurs without heavy reliance on language, suggesting that language may not be the optimal medium for reasoning* [[Medium]](https://medium.com/data-science-in-your-pocket/metas-coconut-better-alternate-than-chain-of-thoughts-for-llm-reasoning-9634f9a070eb). That is Fedorenko's work. Meta researchers reaching for MIT's aphasia research to argue for building AIs that reason the way the stroke patient at the top of this essay already does.

There's a louder version of this argument coming from Yann LeCun, who spent most of 2025 saying publicly that LLMs are a dead end. His framing is blunter than mine: *using an LLM to understand the real world is like teaching someone to drive by just talking. You can memorize all the traffic rules, but you will never learn to drive for real, because language can't describe the feelings of friction, inertia, and blind spots* [[36Kr]](https://eu.36kr.com/en/p/3571987975018880). His bet is a different architecture entirely — world models trained on video and sensor data, learning to predict how the physical world evolves without any language in the loop. He left Meta in November 2025 to start a company around it.

I don't know if LeCun is right about the "dead end" part. The rhetoric is strong. But the underlying intuition — that reasoning should happen in an abstract representational space, not in tokens — is the same intuition Coconut is trying to operationalize at smaller scale inside the language-model paradigm. Different bets, same diagnosis.

Here's where I land, at least for now.

Language is how we escaped the cave. It's the thing that let humans externalize thought, share it, accumulate it across generations, write it down and build on it. Everything we've built in AI stands on that accumulation — the whole corpus of human writing is really a record of human thought that we were able to extract because language was the extraction mechanism. It's an astonishing data asset, and we were right to train on it.

But language was never where the thinking happened. It was the channel. And now we have empirical evidence, from both the neuroscience of humans and the behavior of frontier models, that pushing harder on the channel has sharply diminishing returns. You can't get to deep reasoning by making the transcript longer or the model bigger. At some point you have to build machines that think in the substrate, not the translation.

The uncomfortable part is that we don't have training data for the substrate. Humans never externalized their pre-linguistic cognition at scale. There is no internet-sized corpus of embodied reasoning, of sensorimotor prediction, of whatever the aphasia patient is doing when she reads her friend's face and knows what they're thinking. It has to be collected, or simulated, or learned from raw perception in ways we're still figuring out. This is why LeCun is training on video, why Meta is experimenting with continuous thought, why the whole field feels like it's reaching for something it doesn't quite have yet.

The interesting question isn't whether we need language models. We do. They're the best compression of human cognition we've ever produced. The question is whether the next chapter of AI stays inside the language space and keeps getting squeezed against the ceiling the Depth Ceiling paper just measured — or whether someone builds the thing that reasons the way humans actually reason, in a medium that doesn't have words in it.

The professor at Berkeley was right that semantics was the hard problem. Transformers didn't solve it. They found a way to borrow the answer from the people who wrote the training data. The next move is doing the work those researchers were doing — building machines that understand the world, not just describe it.

Language was how we got out of the cave. It may not be how the machines do.
