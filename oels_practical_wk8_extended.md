---
title: Week 8 practical, random conditions and declining random waits
description: An example of how to code this up
---

## "Model answer" code

There are two more challenging questions this week, so I will provide the code first (containing both) then talk you through the questions in turn. As usual, note the scare quotes around "model answer" - this is one way to do these things, and it's what I had in mind when I wrote the questions, but it's certainly not the only or the best way to do it!

You can download my code through the following two links:
- <a href="code/confederate_priming_extended/confederate_priming_readfromcsv_extended.html" download> Download confederate_priming_readfromcsv_extended.html</a>
- <a href="code/confederate_priming_extended/confederate_priming_readfromcsv_extended.js" download> Download confederate_priming_readfromcsv_extended.js</a>

You'll guess from the names that these both build on the readfromcsv version of the confederate priming code. If you drop these into your `confederate_priming` folder they will be able to access the copy of `jspsych-6.3.1` plus the various stimuli folders that are already there.

## First question
- how would you randomly allocate a participant to one of these two conditions, alternating vs DO confederate? (Hint: you could look at the `random_image_flip` function for inspiration).

### An answer

This one wasn't marked as hard (maybe it should have been) but random assignment to conditions is useful so I will walk through it here!

Hopefully at this point in the practical you figured out that the `read_trials_and_prepare_timeline` function at the end of the code takes a filename, either `alternating_ns_confederate.csv` or `doonly_ns_confederate.csv`, and if you use a different filename you get a different kind of confederate - if you use `alternating_ns_confederate.csv` you get a confederate who uses both DO and PO, if you use `doonly_ns_confederate.csv` you get a confederate who only produces DO. So in this experiment these constitute our two conditions, and we can assign people to a random condition just by picking one of those two files at random. We can write a simple function to do that, selecting from a list of two filenames at random, which looks like this:

```js
function random_condition() {
  var available_csvs = ["alternating_ns_confederate.csv","doonly_ns_confederate.csv"];
  var selected_csv = jsPsych.randomization.shuffle(available_csvs)[0];
  return selected_csv;
}
```

So when we call `random_condition()` it will select either `alternating_ns_confederate.csv` or `doonly_ns_confederate.csv` at random. We can then use that randomly-selected CSV when we read in the trial list:

```js
var this_condition = random_condition();
console.log(this_condition); //logging it so you can see it in the console

read_trials_and_prepare_timeline(this_condition);
```

Hopefully that is straightforward when you see it, but if not ask about it in the labs! I generally use this method for assigning people at random to conditions - I have a condition list, I pick randomly from that list, and then I do something using the randomly-selected condition name (could be reading a particular CSV file, as here, or could be doing something else differently in the code depending on the condition variable I have created).

## Second question
- [Harder, optional] Can you change the `random_wait` function so it generates longer waits early in the experiment and shorter waits later on? 

### An answer

In order to do this we need to know how far we are into the experiment, so we can make 
the length of wait depend on progress. In this code we actually already have a variable, 
`recording_counter`, which starts at 0 and increases by 1 every time the participant 
records a response - that's used to label the audio files so we can see the order the 
recordings were made in, but we can also cheat a little bit and use it here, making the 
length of the random wait contingent on `recording_counter`:

```js
unction random_wait() {
  if (recording_counter<5) { //first 5 pairs of trials, very slow
    var wait = 5000 + Math.floor(Math.random() * 3000); //this will be a number between 5000 and 8000
  }
  else if (recording_counter<10) { //next 5 trials, bit faster
    var wait = 3000 + Math.floor(Math.random() * 2000); //3000-5000
  } 
  else {//all other trials, quite quick
    var wait = 1000 + Math.floor(Math.random() * 2000); //1000-3000
  }
  console.log(recording_counter); //so you can see it in the console
  console.log(wait); //so you can see it in the console
  return wait;
}
```

If you wanted you could make the decline more gradual, having the minimum wait be some more complex transform of `recording_counter`, but this simple approach will work.

What would you do if your experiment didn't already have a `recording_counter` variable lying around that you could use? Well, you could easily create one - just declare a variable called e.g. `global_trial_counter` at the start of the experiment, then add a line of code to the `on_finish` of some of your trials increasing that counter, e.g.:

```js
//somewhere at the top of your code
var global_trial_counter = 1;

//then in trials where you want to increment the counter:
var my_trial = {
  type: 'html-button-response',
  stimulus: "Placeholder",
  choices: ["Continue"],
  on_finish: function () {
    global_trial_counter+=1;//adds 1 to global_trial_counter 
  }
}
```

Alternatively, you can use jsPsych's built-in trial counter - as you'll probably have realised from looking at data generated by jsPsych throughout this course, every trial in a jsPsych experiment has an index, and you can access that global trial counter as follows:
```js
jsPsych.progress().current_trial_global
```

See [the documentation for jsPsych.progress](https://www.jspsych.org/6.3/core_library/jspsych-core/#jspsychprogress) - this counter will increase with every trial (including e.g. instruction screens etc) so it might require a bit more thought to decide how the trial counter should relate to the length of the random wait, but it's another way to do it.



## Re-use

All aspects of this work are licensed under a [Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/).
