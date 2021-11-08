---
title: Week 9 reading
description: Iterated learning and the evolution of compositional structure
---

## The plan for week 9

For our penultimate paper we'll be reading Beckner et al. (2017), which provides a reanalysis and online replication of Experiment 2 of Kirby, Cornish & Smith (2008). Beckner et al. start with a reanalysis of data from our paper, but the more relevant part here is their experiment, a large online iterated artificial language learning experiment. Participants are asked to learn an artificial language which provides labels/descriptions for groups of novel objects, where those objects come in 3 shapes, 3 colours, and appear in groups of 1, 2 or 3. After training on a language, participants are tested, producing a new set of labels/descriptions. Those descriptions are then used as training for another participant: the language is passed from participant to participant down a chain of transmission, potentially changing as it goes as a result of accumulated errors and innovations made by participants. Beckner et al. impose a *bottleneck* on transmission (participants are trained on labels/descriptions for a subset of the objects, but required to generalise to the entire object set at test time), and *filter out* ambiguous labels (to discourage the language from collapsing down to a single label, which was a result we got in Experiment 1 of our 2008 paper). They find, as in the original experiment, that compositional structure develops through this iterated learning process: the first participant in each chain is trained on a language where each label/description is random and completely idiosyncratic, but the languages gradually evolve regularities, e.g. where shape and number are consistently encoded separate morphemes which are combined to form a complex (well, 2-part) signal.  

As usual, in this week's practical you'll get a chance to look at a similar experiment in jsPsych, which will involve code from our week 4 word learning experiment again but also the infrastructure to run an iterated learning design, which involves manipulating CSV files on the server.

## Reading tasks for this week

Read:
- [Beckner, C., Pierrehumbert, J., & Hay, J. (2017). The emergence of linguistic structure in an online iterated learning task. *Journal of Language Evolution, 2*, 160–176.](https://doi.org/10.1093/jole/lzx001)

A couple of things to note:
- Reading the Kirby et al. (2008) paper might give you some broader context on the hypothesis that motivated us to run this kind of experiment in the first place - it's fairly short, 6 pages, and linked in the references section below.
- Beckner et al. give us a bit of a hard time for our small sample size and very basic stats in the 2008 paper, but I think they are actually pretty gentle! That was the first experimental study we ran, we had pretty limited resources and didn't really know what we were doing. I was particularly relieved that the results of our Experiment 2 replicated so well.
- Section 1.1.1 of Beckner et al. is a (much more competent) reanalysis of our 2008 data, with fancier stats to handle a non-linear increase in compositionality (i.e. it increases over generations but not at a constant rate) - don't stress if you don't fully follow the statistical method.
- Their experimental method (with a nice hide-and-seek framing for the task, various intermediate attention checks etc) is quite a lot fancier than what we normally do, and certainly fancier than the experiment I have implemented in the practical for this week.


## References

[Kirby, S., Cornish, H., & Smith, K. (2008). Cumulative cultural evolution in the laboratory:An experimental approach to the origins of structure in human language. *PNAS, 105*, 10681-10686.](http://www.lel.ed.ac.uk/~kenny/publications/kirby_08_cumulative.pdf)

## Re-use

All aspects of this work are licensed under a [Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/).
