This is the webpage for the Honours/MSc Guided Research course Online Experiments for Language Scientists, running in academic year 2021/2022. I will add links to materials (readings, code) to this page; you will need to use Learn for electronic submission of your assessed work, and to keep an eye on announcements.

## Course summary

Many areas in the language sciences rely on collecting data from human participants, from grammaticality judgments to behavioural responses (key presses, mouse clicks, spoken responses). While data collection traditionally takes place face-to-face, recent years have seen an explosion in the use of online data collection: participants take part remotely, providing responses through a survey tool or custom experimental software running in their web browser, with surveys or experiments often being advertised on crowdsourcing websites like Amazon Mechanical Turk (MTurk) or Prolific. Online methods potentially allow rapid and low-effort collection of large samples, and are particularly useful in situations where face-to-face data collection is not possible (e.g. during a pandemic); however, building and running these experiments poses challenges that differ from lab-based methods.

This course will provide a rapid tour of online experimental methods in the language sciences, covering a range of paradigms, from survey-like responses (e.g. as required for grammaticality judgments) through more standard psycholinguistic methods (button presses, mouse clicks) up to more ambitious and challenging techniques (e.g. voice recording, real-time interaction through text and/or streaming audio, iterated learning). Each week we will read a paper detailing a study using online methods, and look at code (written in javascript using jsPsych) to implement a similar experiment - the examples will skew towards the topics I am interested in (language learning, communication, language evolution), but we'll cover more standard paradigms too (grammaticality judgments, self-paced reading) and the techniques are fairly general anyway. We’ll also look at the main platforms for reaching paid participants, e.g. MTurk and Prolific, and discuss some of the challenges around data quality and the ethics of running on those platforms.

No prior experience in coding is assumed, but you have to be prepared to dive in and try things out; the assessment will involve elements of both literature review and coding.

## The teaching team

The course is co-taught by [Kenny Smith](http://www.lel.ed.ac.uk/~kenny/) and [Alisdair Tullo](https://www.ed.ac.uk/profile/alisdair-tullo/). Kenny (that's me) is the main lecturer and the course organiser; Alisdair is the javascript/jsPsych guru and delivers the lab sessions with Kenny. Best way to get in touch with us is in one of the live sessions, see below, or by email to [kenny.smith@ed.ac.uk](mailto:kenny.smith@ed.ac.uk) or [alisdair.tullo@ed.ac.uk](mailto:alisdair.tullo@ed.ac.uk).

We'll also be supported in lab classes by some tutors, details to follow!

## Class times

The course runs in semester 1. We have lectures 10am-11am on Mondays, and lab classes 9am-11am on Wednesdays. The current plan (mid-August 2021) is that lectures will take place in person and lab classes will be online, but the University's guidance is rapidly evolving, we don't know the class size etc yet, so that may change. For the online labs the plan is to use Gather (the one where you have a little avatar and can wander around a 2D world, bump into other people etc) - we have used gather for virtual labs in other courses, it's great because it allows you to work alone or with friends, you can approach the tutor when you need help, talk live, share your screen to show your code, so it does pretty much everything you'd do in an in-person lab.

Lectures and labs are both essential to doing well on the course - the assessment involves an understanding both of the literature on online experiments (covered in the readings and lectures) and the practicalities of how to build them (covered in your own work on the practicals, with support available in the labs).

## Assessment

Two pieces, due on 11th November and 9th December.

Assessment 1 is an annotated bibliography reviewing and evaluating 4 articles typically drawn from the course set readings. Assessment 2 is a more open-ended project where you produce a working experiment implemented in jsPsych and an accompanying report explaining the motivation behind that experiment, justifying important design decisions you took in building the experiment, and appraising the experiment and ways it could be improved/extended.

Full details of the assessments will be included in the assignment brief, to appear here.

## Course Materials

Course content will appear here as we work through the course.

Each week there will be a set reading and a programming assignment. The reading involves a blog post introducing a published paper, you read both the blog and the paper, the lecture then provides an additional brief overview and an opportunity to ask questions/discuss the reading. The programming assignment involves working through a section of the [Online Experiments with jsPsych](https://softdev.ppls.ed.ac.uk/online_experiments/index.html) tutorial and then looking at (and editing) some code using those concepts to implement a language-related experiment; you can use the lab classes as dedicated time to work on the programming task and get help with programming difficulties or questions you have.

### Week 1 (commencing 20th September): Introduction

- *Scientific content:* minimal (but I'll go over the practicalities of the course, assessments etc)
- *Technical content:* jsPsych basics
- [Reading](oels_reading_wk1.md)
- [Programming task](oels_practical_wk1.md)

### Week 2 (27th September): Crowdsourcing experimental data

- *Scientific content:* lab vs online data collection
- *Technical content:* more jsPsych and javascript basics
- Reading
- Programming task

### Week 3 (4th October): Grammaticality judgements

- *Scientific content:* lab vs online grammaticality judgments; syntactic processing and acceptability
- *Technical content:* simple key- and button-press responses
- Reading
- Programming task

### Week 4 (11th October): Self-paced reading

- *Scientific content:* processing costs of syntactic dependencies
- *Technical content:* collecting reaction time data, more complex nested trials
- Reading
- Programming task

### Week 5 (18th October): Lab catchup week

In week 5 there is no lecture, but we have a lab as usual - use this time to catch up on labs from previous weeks, or to catch up on / get ahead with your reading.

### Week 6 (25th October): Word learning / frequency learning

- *Scientific content:* probability matching and regularisation
- *Technical content:* using trial data for contingent trials, filtering and saving data
- Reading
- Programming task

### Week 7 (1st November): Audio stimuli

- *Scientific content:* speech perception, social influences on phonetic adaptation
- *Technical content:* Audio, trial data again, saving data trial by trial
- Reading
- Programming task

### Week 8 (8th November): Confederate priming

- *Scientific content:* syntactic priming and alignment
- *Technical content:*  Audio recording, more randomisation stuff, custom preload lists, reading trial lists from CSV
- Reading
- Programming task

### Week 9 (15th November): Iterated Learning

- *Scientific content:* iterated learning and the evolution of compositional structure
- *Technical content:* reading trial lists from CSVs again, PHP scripts for iteration
- Reading
- Programming task

### Week 10 (15th November): Participant-to-participant interaction

- *Scientific content:* least effort and Zipf's Law of Abbreviation
- *Technical content:* web sockets, python servers, incrementally building a timeline
- Reading
- Programming task

### Week 11 (29th November): Interacting with MTurk

- *Scientific content:* None!
- *Technical content:* How to set up a server, launch and pay participants, manage qualifications, etc
- Combined reading/practical: how to get your experiment online

## Re-use

All aspects of this work are licensed under a [Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/).
