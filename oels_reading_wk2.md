---
title: Week 2 reading
description: Crowdsourcing experimental data
---

## The plan for week 2

In this week's lecture/discussion we'll talk about crowdsourcing experimental data, some of the ethical and experimental control issues that arise when you crowdsource, and some general stuff on the demographics of crowdsourcing sites. Remember to do the reading and bring any questions/comments to the Monday class!

For [the practical component of week 2](oels_practical_wk2.md) we'll continue working through the basics of jsPych and javascript so we can jump in to building simple experiments in week 3.

## Reminder: crowdsourcing

As mentioned in week 1, one way to make the most of the potential of an online experiment is to recruit participants via a [crowdsourcing](https://en.wikipedia.org/wiki/Crowdsourcing) website. These sites allow you to set paid tasks for members of the public. The sites have a pool of people looking for tasks, and provide an infrastructure for paying people. In return they charge you a fee, which is often quite substantial (e.g. MTurk charges an additional 20-40% of the amount you pay the participants, Prolific charges 33%). The most widely used sites are [Amazon Mechanical Turk (MTurk)](https://www.mturk.com) and [Prolific](https://www.prolific.co). Until recently I exclusively used MTurk, I have switched to Prolific recently (partly because I got a bit pessimistic about data quality on MTurk in the summer of 2020, plus Prolific has a much nicer web interface that makes it easy to put stuff up quickly, although it lacks some of the automation possibilities you get with MTurk - we'll briefly cover that right at the end of the course).


## Why collect data online?

### Advantages

At this point of the course, when you've heard about various slightly scary-sounding technical hurdles you'll have to overcome (learning to code using jsPsych, getting your experiment on a server, recruiting via a crodsourcing site) you might be thinking "Hmm, this sounds like hard work, why do I want to do this at all?". There are a number of advantages of online data collection though.

One obvious advantage is that it allows you to collect data without interacting with people face to face, like in the middle of a pandemic. Face-to-fae data collection ony just restarted here in PPLS (September 2021) and is still quite restricted, so there are obvious advatanges to sidestepping those restrictions/risks by collecting data online.

Setting the pandemic aside, in normal times the most obvious advantage from my perspective is that online data collection is *fast*. In-person data collection is limited by the time of the person collecting data, the size of your lab, and the size of your participant pool. For example, when I run stuff in the lab I know that I can only book the lab for about 16 hours a week, and I can only test a maximum of 4 people at once (the lab I use only has 4 booths) - that means the maximum number of people I could run through a 1-hour experiment is 16x4=64 people in a week. That's actually pretty good, but I also know that in practice I can almost never recruit enough people from our participant population to be running at capacity all week, and even the people who sign up often don't show up, so in practice we might spend 16 hours in the lab and collect data from 20 people, and that would be a solid week. Worse, beceause we don't want to re-use participants across experiments we often end up with a smaller effective participant pool, and then things can really start to go slowly. In contrast, I know I can run basically as many people online as I want - I have never run more than 50 in a day, but that's just because I have chosen not to, and I know people who run hundreds of participants in a few hours. And because the participant pool is much much larger, cross-experiment exclusions are not a problem, and data collection doesn't slow down because you don't start running out of naive participants.

There are other advantages too, although these have mattered less to me in my research. The populations you access in crowdsourcing sites are different from and a bit more diverse than University populations, which might matter to you. You can potentially tap into larger populations of participants who have native languages other than English (e.g. Spanish speakers, Hindi speakers). You can definitely access older participants than you will get by recruiting from a student population.

One thing to flag up at this point is the thorny issue of payment. You will often see authors mentioning *affordability* as a major advantage of online data collection, particularly in the older papers we look at. One of the features of the early days of crowdsourcing in cognitive science was (in hindsight) a very thoughtless approach to participant payment. Typically in the lab we pay people at or above the local minimum wage, or participants are students who participate for free but extract educational value from participating (e.g. learning what experiments look like and what participant handling feels like to the participant). MTurk does not specify a minimum payment rate (although Prolific does), and as a result many early studies used shamefully low rates of pay, with effective rates of pay of $1-2 an hour. One of my own papers we will cover on the course (with data collected back in the bad old days of 2012) has a rate of pay I am now very ashamed of.

I am happy to say that my impression is that this payment issue is now resolving itself (although issues remain). *We* control what we pay participants, and in my group we now pay at UK minimum wage equivalents, which is what we'd pay in the lab and which makes our studies very well-paid on sites like MTurk. Because of the fees sites like MTurk charge, and the fact that you often end up running more participants, online studies in my experience therefore end up being *more* expensive than lab studies. I get the impression that more cognitive science researchers are moving in this direction too, and that the shockingly low early rates of pay were driven in part by a failure to understand who our online participants were and why they were participating (probably combined with a motivated lack of curiosity about what was going on behind all this cheap fast data). I think many researchers in the early days thought that workers on crowdsourcing sites were essentially volunteers, taking part for fun with a small token payment as an added bonus. It turns out this is usually not the case, and for at least some crowd workers the money they make from these tasks is an important part of their household income. There are some insights on this in the readings below.

### Disdvantages

See above on cost - assuming you are paying your participants fairly, online experiments should be relatively expensive, not cheap, although if you normally employ people to collect face-to-face data you need to factor in the time and money saved there.

Perhaps the most obvious disadvantage of collecting data online is that participants are participating remotely, so you have relatively little control over who they are and how they approach your task. For in-person data collection you can see who they are yourself, speak to them, keep an eye on them in the experiment booth, answer any questions they have on the spot, and wake them up if they fall asleep (happened to me once with a participant doing a very boring EEG experiment, you could tell from his brain activity he was having a nap, it was pretty funny but wasted 2 hours of lab time). But if they are participating remotely you have no idea where they are (at home? watching TV? on a packed commuter train?), who they are (are they really a native speaker of the language you are targeting? are they really in the age range you want?), or how they are doing the task (are they paying too little attention and watching TV? are they paying too much attention and taking written notes when you don't want them to?). As a result one of the challenges of online experiments is figuring out ways to fairly filter out participants you don't want (e.g. non-native speakers, random clickers) and making it easy for them to participate in the ways you do want (e.g. attending to each trial, providing rapid responses, or providing slower considered responses).

The population you are sampling from in an online experiment and the environment the participants are participating in is therefore quite different to a traditional lab study. As a result there has been some concern about whether results obtained in the lab will replicate online. The obvious solution to this is to check, and several of the papers we will look at in the first part of the course are about verifying that online data collection produces the same results as lab studies.

## Reading tasks for this week

There are several things to read/look at this week, to give you a feel for some of the issues around online vs lab data collection, demographics of online populations, what online experiments look like, and what a crowdsourcing site looks like from the participant's perspective.

Read:
- [The wikipedia page explaining what MTurk is.](https://en.wikipedia.org/wiki/Amazon_Mechanical_Turk)
- [Stewart, N., Chandler, J., & Paolacci, G. (2017). Crowdsourcing Samples in Cognitive Science.
*Trends in Cognitive Sciences, 21,* 736-748.](https://doi.org/10.1016/j.tics.2017.06.007)


Also read *at least one of*:
- [Monroe, R. et al. (2010). Crowdsourcing and language studies: the new generation of linguistic data. In *Proceedings of the NAACL HLT 2010 Workshop on Creating Speech and Language Data with Amazon’s Mechanical Turk*, pages 122–130.](https://www.aclweb.org/anthology/W10-0719.pdf)
- [Pavlick, E. et al. (2014). The Language Demographics of Amazon Mechanical Turk. *Transactions of the Association for Computational Linguistics, 2,* 79-92.](https://www.aclweb.org/anthology/Q14-1007)
- [A blogpost listing some downsides of MTurk](https://blog.prolific.co/stop-using-mturk-for-research/), although note that this is written by people at Prolific, who are an MTurk competitor! Doesn't mean some of the points aren't valid though.
- [A 2018 article in The Atlantic on worker exploitation on MTurk](https://www.theatlantic.com/business/archive/2018/01/amazon-mechanical-turk/551192/), although remember that we at least control what we pay workers and how we treat them.

It might also help to have a look at [a video of what the MTurk site looks like from a worker's perspective](https://youtu.be/ke9AEE8XGgA) - NB this video dates from December 2020. I'll show you around Prolific in class.

## Re-use

All aspects of this work are licensed under a [Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/).
