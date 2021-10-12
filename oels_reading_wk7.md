---
title: Week 7 reading
description: Speech perception, social influences on phonetic adaptation
---

## The plan for week 7

This week we are looking at Lev-Ari (2017). This paper reports an online perceptual learning experiment, where participants are exposed to manipulated speech (featuring weird /d/ or /t/ phonemes with an unusual Voice Onset Time, VOT) and then tested on a categorization task where they hear words spoken by the same speaker or a new speaker featuring ambiguous /d/-/t/ sounds and have to categorise those sounds as /d/ or /t/. The basic result is that the manipulated speech input influences how those sounds are perceived; the interesting new twist is that the level of phonetic adaptation appears to depend on the participants' social network size, with individuals with small social networks being more strongly influenced by the manipulated speech. As usual, in this week's practical you'll get a chance to look at a similar experiment in jsPsych, which will give you some experience of dealing with audio stimuli.

## Reading tasks for this week

Read:
- [Lev-Ari, S. (2017). Talking to fewer people leads to having more malleable linguistic representations. *PLoS ONE, 12,* e0183593.](https://doi.org/10.1371/journal.pone.0183593)

Just as a footnote: I actually edited this paper for PLoS ONE, which means it was assigned to me by the journal and I solicited reviews from other researchers, requested revisions to the paper, and made a final decision on the paper based on another round of revision.

As you read this paper make notes of any questions, criticisms or ideas it gives you, and I'll leave time in the Monday lecture slot so we can discuss these in class.

A couple of things to note as you work through the paper (basically trying to clarify things that take me a few minutes to figure out every time I read this paper!):
- The experiment consists of three stages:
  - A questionnaire on social networks.
  - A block of picture selection trials, where in each trial participants hear a description (e.g. "the fresh dill", "the orange telephone") and click on one of two images (e.g. pictures of fresh or dry dill, pictures of an orange or black telephone). The purpose of this block is to expose participants to exemplars of /d/ and /t/ being produced by a (female) speaker; in the manipulated-/d/ condition participants encounter instances of /d/ (e.g. in "the fresh dill") which have 24ms VOT, which is an unusually long VOT for a /d/ (i.e. they are somewhat /t/-like), conversely in the manipulated-/t/ condition participants encounter the 24ms VOT segment as a /t/ (e.g. in "the orange telephone), which is an unusually short VOT for a /t/ (i.e. it is somewhat /d/-like).
  - A block of phoneme categorization trials, where in each trial participants hear a voice (in the same speaker condition, the female speaker again; in the new speaker condition, a new male speaker) say a single word and then decide if that word is "dean" or "teen" (i.e. whether it started with a /d/ or a /t/); the word-initial consonants vary in VOT, so these trials allow us to assess whether the participants' perceptual boundary for /d/-/t/ has been shifted.
- A useful thing to bear in mind when interpreting e.g. Figure 1 is that "good" exemplars of /d/ have a VOT of 5-10ms, whereas good exemplars of /t/ have a VOT of 50-80ms. That explains why, in Fig 1, when VOT is low participants are classifying sounds as /d/ (i.e. not *teen*), and when it's high they classify sounds as /t/ (i.e. as *teen*). The ambiguous phoneme has a VOT of 24ms (so it's not a good example of either category, hence the ambiguity). Participants in the manipulated /d/ condition saw this ambiguous token used as if it were a good example of a /d/ - so they should learn that VOT for /d/ (at least for this speaker) can actually be quite high, and they should need an even higher VOT to flip them to hearing a sound as a /t/. That is what Fig 1 shows - for the manipulated /d/ condition (the dashed lines in Fig 1) the line rises more slowly, people are accepting even quite long VOTs (25-30ms) as being examples of /d/. In contrast, people in the manipulated /t/ condition are give the ambiguous 24ms VOT token as an example of a good /t/ - therefore they learn that /t/ can have quite low VOT, and so are happier to classify things even with quite a low VOT as a /t/, which is why the black line in Fig 1 climbs quite fast.

## Re-use

All aspects of this work are licensed under a [Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/).
