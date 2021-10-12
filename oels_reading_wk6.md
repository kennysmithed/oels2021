---
title: Week 6 reading
description: Word learning / frequency learning
---

## The plan for week 6

This week we are looking at a paper first-authored by my former PhD student Vanesa Ferdinand, presenting work she did as part of her PhD with me and Simon Kirby. The paper describes a frequency-learning experiment, where participants are exposed to variants (in the linguistic condition, synonymous labels for objects) during an observation phase and then attempt to reproduce that variation (e.g. by labelling objects using those labels) in the production phase. There is some evidence that language learners tend to dislike this kind of free variation, and free variation tends to drop out of natural languages,  suggesting that these two observations might be linked; maybe languages lose free variation because learners are biased against it. In this paper we were looking at what drives that bias against variation - what factors influence whether participants will faithfully reproduce the variation in their input, or regularize (e.g. by over-producing the most frequent variant). We manipulated domain (are you learning frequencies of linguistic variants, or non-linguistic variants?) and load (are you tracking a single frequency distribution, or multiple distributions?) to see how these affected regularization, and in particular whether regularization was specific to linguistic stimuli. As usual, in this week's practical you'll get a chance to look at a similar frequency-learning experiment in jsPsych.


## Reading tasks for this week

Read:
- [Ferdinand, V., Kirby, S., & Smith, K. (2019). The cognitive roots of regularization in language.
*Cognition, 184,* 53-68.](https://doi.org/10.1016/j.cognition.2018.12.002)


As you read this paper make notes of any questions, criticisms or ideas it gives you, and I'll leave time in the Monday lecture slot so we can discuss these in class.

A couple of things to note as you work through the paper:
- Section 2 very carefully explains why we use *entropy drop* to measure regularization. It's worth taking a look and I think it helpfully demystifies entropy (which is a concept that pops up quite often as a measure of variability), but if you are find it heavy going you can work with the following summary. Entropy measures variability, high entropy means highly variable, 0 entropy means 0 variability. Entropy change compares the entropy of a participants' training (i.e. the variability of what they were *supposed* to learn) with the entropy of their productions (i.e. the variability of their attempted reproduction). If someone's productions are more variable than their training data the entropy change will be positive; if someone's productions are less variable than their training then the entropy change will be negative; since regularization involves a loss of variation, we therefore expect more regularization to show up as a negative change in entropy, and bigger negative change means more regularization.
- The paper isn't very long but there is a *lot* in it! For instance, Section 4.6 gives quite a detailed exploration of how different participants behave, and tests a hypothesis about why different people might respond differently in this task. Section 5 reports a model to try to predict, based on this experiment data, what would happen to these frequency distributions if you ran an experiment where data was passed from person to person in an iterated learning paradigm. I think these are really interesting areas and I am happy to chat about them in class, but do make sure you prioritise understanding the experiment and its main results (with these other bits as nice add-ons once you are happy with that).
- I'm afraid this is another paper where participants are scandalously underpaid - as explained in footnote 1, basically this was standard practice at the time and based (at least on our part) on a rather naive misunderstanding about what motivated participants on MTurk (as also discussed in the week 1 reading post). I am super embarrassed about it now.


## Re-use

All aspects of this work are licensed under a [Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/).
