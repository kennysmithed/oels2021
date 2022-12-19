
Be aware, this is the 2021-2022 version of this course, which uses jsPsych 6.3. [The 2022-2023 version of the course is now available and complete](https://kennysmithed.github.io/oels2022/), which uses jsPsych 7.3.

This is the webpage for the Honours/MSc Guided Research course Online Experiments for Language Scientists, running in academic year 2021/2022. I will add links to materials (readings, code) to this page; you will need to use Learn for electronic submission of your assessed work, and to keep an eye on announcements.

## Course summary

Many areas in the language sciences rely on collecting data from human participants, from grammaticality judgments to behavioural responses (key presses, mouse clicks, spoken responses). While data collection traditionally takes place face-to-face, recent years have seen an explosion in the use of online data collection: participants take part remotely, providing responses through a survey tool or custom experimental software running in their web browser, with surveys or experiments often being advertised on crowdsourcing websites like Amazon Mechanical Turk (MTurk) or Prolific. Online methods potentially allow rapid and low-effort collection of large samples, and are particularly useful in situations where face-to-face data collection is not possible (e.g. during a pandemic); however, building and running these experiments poses challenges that differ from lab-based methods.

This course will provide a rapid tour of online experimental methods in the language sciences, covering a range of paradigms, from survey-like responses (e.g. as required for grammaticality judgments) through more standard psycholinguistic methods (button presses, mouse clicks) up to more ambitious and challenging techniques (e.g. voice recording, real-time interaction through text and/or streaming audio, iterated learning). Each week we will read a paper detailing a study using online methods, and look at code (written in javascript using jsPsych) to implement a similar experiment - the examples will skew towards the topics I am interested in (language learning, communication, language evolution), but we'll cover more standard paradigms too (grammaticality judgments, self-paced reading) and the techniques are fairly general anyway. We’ll also look at the main platforms for reaching paid participants, e.g. MTurk and Prolific, and discuss some of the challenges around data quality and the ethics of running on those platforms.

No prior experience in coding is assumed, but you have to be prepared to dive in and try things out; the assessment will involve elements of both literature review and coding.

## The teaching team

The course is co-taught by [Kenny Smith](http://www.lel.ed.ac.uk/~kenny/) and [Alisdair Tullo](https://www.ed.ac.uk/profile/alisdair-tullo/). Kenny (that's me) is the main lecturer and the course organiser; Alisdair is the PPLS javascript/jsPsych guru and delivers the lab sessions with Kenny. Best way to get in touch with us is in one of the live sessions, see below, or by email to [kenny.smith@ed.ac.uk](mailto:kenny.smith@ed.ac.uk) or [alisdair.tullo@ed.ac.uk](mailto:alisdair.tullo@ed.ac.uk).

We'll also be supported in lab classes by three excellent tutors: Jess Brough, Aislinn Keogh, and Vilde Reksnes. 

## Class times

The course runs in semester 1. We have lectures 10am-11am on Mondays, and lab classes 9am-11am on Wednesdays. 

Lectures and labs are both essential to doing well on the course - the assessment involves an understanding both of the literature on online experiments (covered in the readings and lectures) and the practicalities of how to build them (covered in your own work on the practicals, with support available in the labs).

### In-person lectures
Lectures take place *in person* on Monday mornings, 10am-10.55am, in [40 George Square Lecture Theatre B](https://campusmaps.edina.ac.uk/?building=0229). I am very excited about this but also a bit nervous - you might be too - so please let's do our best to look after each other. In particular:
- Hopefully this goes without saying, but *do not come to lectures if you are unwell or think you might be!* You can participate remotely (instructions on how to access live streams/recordings are on the course page on Learn), so you won't miss out and you'll be protecting the rest of us. If I am isolating or unwell (but still well enough lecture) we'll do the lecture remotely.
- Please wear a mask unless exempt from doing so. I will remove my mask to lecture, which is allowed by the regulations and improves comprehension, but at all other times I'll be wearing one.
- If you are not comfortable with attending in-person for any reason, you can also participate remotely.

### Online labs on Gather

Labs will take place online and we will use Gather (the one where you have a little avatar and can wander around a 2D world, bump into other people etc) - we have used gather for virtual labs in other courses, it's great because it allows you to work alone or with friends, you can approach the tutor when you need help, talk live, share your screen to show your code, so it does pretty much everything you'd do in an in-person lab. Details of how to access Gather are on the course page on Learn.


## Assessment

There are two pieces of assessment, due on 11th November and 9th December. Assessment 1 is an annotated bibliography reviewing and evaluating 4 articles typically drawn from the course set readings. Assessment 2 is a more open-ended project where you produce a working experiment implemented in jsPsych and an accompanying report explaining the motivation behind that experiment, justifying important design decisions you took in building the experiment, and appraising the experiment and ways it could be improved/extended. Full details are provided in [the assignment brief](AssignmentBrief.pdf), and frequently asked questions will be answered in [the FAQ](oels_assignment_faq).

## Course Materials

Course content will appear here as we work through the course.

Each week there will be a set reading and a programming assignment. The reading involves a blog post introducing a published paper, you read both the blog and the paper, the lecture then provides an additional brief overview and an opportunity to ask questions/discuss the reading. The programming assignment involves working through a section of the [Online Experiments with jsPsych](https://softdev.ppls.ed.ac.uk/online_experiments/index.html) tutorial and/or looking at (and editing) some code which implements a language-related experiment; you can use the lab classes as dedicated time to work on the programming task and get help with programming difficulties or questions you have.

### Week 1 (commencing 20th September): Introduction

- *Scientific content:* minimal (but I'll go over the practicalities of the course, assessments etc)
- *Technical content:* jsPsych basics
- [Reading](oels_reading_wk1.md)
- [Programming task](oels_practical_wk1.md)
- [Lecture slides](slides/oels2021_lecture1.pdf)

### Week 2 (27th September): Crowdsourcing experimental data

- *Scientific content:* lab vs online data collection
- *Technical content:* more jsPsych and javascript basics
- [Reading](oels_reading_wk2.md)
- [Programming task](oels_practical_wk2.md)
- [Lecture slides](slides/oels2021_lecture2.pdf)

### Week 3 (4th October): Grammaticality judgements

- *Scientific content:* lab vs online grammaticality judgments; syntactic processing and acceptability
- *Technical content:* simple key- and button-press responses
- [Reading](oels_reading_wk3.md)
- [Programming task](oels_practical_wk3.md)
- [Lecture slides](slides/oels2021_lecture3.pdf)

### Week 4 (11th October): Self-paced reading

- *Scientific content:* processing costs of syntactic dependencies
- *Technical content:* collecting reaction time data, more complex nested trials
- [Reading](oels_reading_wk4.md)
- [Programming task](oels_practical_wk4.md)
- [Lecture slides](slides/oels2021_lecture4.pdf)

### Week 5 (18th October): Lab catchup week

In week 5 there is no lecture, but we have a lab as usual - use this time to catch up on labs from previous weeks, or to catch up on / get ahead with your reading.

### Week 6 (25th October): Word learning / frequency learning

- *Scientific content:* probability matching and regularisation
- *Technical content:* using trial data for contingent trials, filtering and saving data
- [Reading](oels_reading_wk6.md)
- [Programming task](oels_practical_wk6.md)
- [Lecture slides](slides/oels2021_lecture5.pdf)

### Week 7 (1st November): Audio stimuli

- *Scientific content:* speech perception, social influences on phonetic adaptation
- *Technical content:* Audio, trial data again, preloading stimuli, saving data trial by trial
- [Reading](oels_reading_wk7.md)
- [Programming task](oels_practical_wk7.md)
- [Lecture slides](slides/oels2021_lecture6.pdf)

### Week 8 (8th November): Confederate priming

- *Scientific content:* syntactic priming and alignment
- *Technical content:*  Audio recording, more randomisation stuff, custom preload lists, reading trial lists from CSV
- [Reading](oels_reading_wk8.md)
- [Programming task](oels_practical_wk8.md)
- [Lecture slides](slides/oels2021_lecture7.pdf)

### Week 9 (15th November): Iterated Learning

- *Scientific content:* iterated learning and the evolution of compositional structure
- *Technical content:* looping trials, reading trial lists from CSVs again, PHP scripts for iteration
- [Reading](oels_reading_wk9.md)
- [Programming task](oels_practical_wk9.md)
- [Lecture slides](slides/oels2021_lecture8.pdf)

### Week 10 (22nd November): Participant-to-participant interaction

- *Scientific content:* least effort and Zipf's Law of Abbreviation
- *Technical content:* web sockets, python servers, incrementally building a timeline
- [Reading](oels_reading_wk10.md)
- [Programming task](oels_practical_wk10.md)
- [Lecture slides](slides/oels2021_lecture9.pdf)

### Week 11 (29th November): Interacting with MTurk

No lecture or lab in week 11, but there are some materials that will be useful for you to read if you are thinking of setting up a real experiment in the wild!

- *Scientific content:* None!
- *Technical content:* How to set up a server, launch and pay participants, manage qualifications, etc
- [Combined reading/practical: how to get your experiment online](oels_wk11.md)

### Additional drop-in labs for questions on Assessment 2 code

These will be on Gather. Obviously we won't write your code for you, but if you are having trouble interpreting an error message or finding a bug or want some tips on how to achieve a particular effect we can help you figure it out. Drop-in labs will be held at the following times:
- Wednesday 24th November, 2pm-4pm
- Thursday 25th November, 2pm-4pm
- Monday 29th November, 9am-11am
- Monday 6th December, 9am-11am



## Re-use

All aspects of this work are licensed under a [Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/).
