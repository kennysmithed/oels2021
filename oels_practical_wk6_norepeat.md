---
title: Week 6 practical, no-repeat shuffling
description: An example of how to code this up
---

## The question

In the week 6 practical I set the following problem - note that it's marked as optional and challenging, although once you have seen it done once it's actually fairly simple.

- [Optional, hard] Can you figure out how to use the `jsPsych.randomization.shuffleNoRepeats` function [documented here](https://www.jspsych.org/6.3/core_library/jspsych-randomization/#jspsychrandomizationshufflenorepeats) to do a version where observation and test trials for multiple objects are interspersed, but you never see the same object twice in a row? NB this will only work if you have 3+ different objects in the experiment - it's too hard for the code to find randomisations with no repeats if you have a small number of objects, and impossible if you only have one object, so the code will hang while  endlessly searching!

## An answer

The first thing to do is check out the documentation for the `jsPsych.randomization.shuffleNoRepeats` function, where you'll see that that function takes two arguments - a list (in our case, a list of trials) to be shuffled, and then an equality test, a function that examines pairs of items in that list and tells you whether or not two items from the list constitute repeats. There's also a little example in the documentation of how to do this, which turns out to be very helpful. 

You can download my code through the following two links:
- <a href="code/word_learning_norepeat/word_learning_norepeat.html" download> Download word_learning_norepeat.html</a>
- <a href="code/word_learning_norepeat/word_learning_norepeat.js" download> Download word_learning_norepeat.js</a>

If you drop these into your `word_learning` folder they will be able to access the copy of `jspsych-6.3.1` plus the `images` folder that's already there.

There's nothing clever going on in the html file - it's just loading the required jsPsych plugins and the javascript file - so open the `word_learning_norepeat.js` file and take a look at how it works. If you work through that, you'll see that the functions for making observation and production trials are unchanged. The first difference from the basic code includes a bunch of lines to expand the observation and production tests from a single object to 3 objects - as per my instructions, you need 2+ objects to shuffle the list such that the same object never repeats on consecutive trials, and in practice you need 3+ objects to give the code a chance to find a valid shuffle, so I went for 3 objects. The simplest way of generating the observation trials is a bit laborious (I'll show you a more compact way below), here's how that's done.

```js
var observation_trial_object4_buv = make_observation_trial('object4','buv');
var observation_trial_object4_cal = make_observation_trial('object4','cal');

var observation_trial_object5_seb = make_observation_trial('object5','seb');
var observation_trial_object5_nuk = make_observation_trial('object5','nuk');

var observation_trial_object6_dap = make_observation_trial('object6','dap');
var observation_trial_object6_mig = make_observation_trial('object6','mig');



var observation_trial_object4_buv_repeated = jsPsych.randomization.repeat([observation_trial_object4_buv], 3);
var observation_trial_object4_cal_repeated = jsPsych.randomization.repeat([observation_trial_object4_cal], 2);

var observation_trial_object5_seb_repeated = jsPsych.randomization.repeat([observation_trial_object5_seb], 4);
var observation_trial_object5_nuk_repeated = jsPsych.randomization.repeat([observation_trial_object5_nuk], 1);

//0 variation for this one, just for fun
var observation_trial_object6_dap_repeated = jsPsych.randomization.repeat([observation_trial_object6_dap], 5);


/*
Stick them all together for shuffling...
*/
var observation_trials_unshuffled = [].concat(observation_trial_object4_buv_repeated,
                                              observation_trial_object4_cal_repeated,
                                              observation_trial_object5_seb_repeated,
                                              observation_trial_object5_nuk_repeated,
                                              observation_trial_object6_dap_repeated);
```

You can see I am just doing the same thing as I did in the basic code for a single-object version of the experiment, but bringing in extra object images, extra labels (which I got from the paper) and using `jsPsych.randomization.repeat` to make multiple copies of those trials; then I `concat` those all together to create my unshuffled list of observation trials, `observation_trials_unshuffled`. 

Now all I need to do is shuffle this to avoid the same object repeating on consecutive trials. I can do that using the `jsPsych.randomization.shuffleNoRepeats` function, but I need to tell it what counts as a repeated trial (so it can shuffle to avoid those). I want to avoid having the same object on consecutive trials, and I know that the object shown on a given trial will be contained in that trial's `stimulus` parameter. So I need to write a function that says "two trials count as a repeat if they both have the same `stimulus` parameter". Luckily this is very very close to the example in the jsPsych documentation, which involves shuffling a list and avoiding two entries with the same `colour` value, so I can adapt that pretty straightforwardly. 

There are two ways I can create my equality test function. I could create a named function that takes two trials and checks if they have the same `stimulus`, like this:
```js
function my_equality_test(trial1,trial2) {
  return trial1.stimulus==trial2.stimulus
}
```

So that's a function that takes 2 trials, looks up their `stimulus` parameter, and then returns the comparison of those two parameters (NB I am using `==` to test if they are the same, which is crucially different from the assignment operator, `=`!!!). If the `stimulus` is the same this function will return `true` (i.e. these two trials constitute a repeat), otherwise it'll return `false`. We could then use that to shuffle our observation trials, like this:

```js
var observation_trials = jsPsych.randomization.shuffleNoRepeats(observation_trials_unshuffled,my_equality_test)
```

That tells the shuffle function to use the `my_equality_test` function to test for repeats while shuffling `observation_trials_unshuffled`, so it will generate a trial list without any such repeats. 

The way they do it in the jsPsych documentation is actually slightly different, using what's known as an *anonymous function* - this is just a slightly more compact way of creating a temporary nameless function exactly where we need it (i.e. inside the call to `jsPsych.randomization.shuffleNoRepeats`). I have gone for that option in my example code, it looks like this:

```js
var observation_trials = jsPsych.randomization.shuffleNoRepeats(observation_trials_unshuffled,
                                                                function(trial1,trial2) {
                                                                  return trial1.stimulus==trial2.stimulus
                                                                });
```
`function(trial1,trial2) {...}` creates an anonymous function that takes 2 trials and tests for the quality of the `stimulus` parameter as before - you can see that the code for this anonymous function is virtually identical to the code for `my_equality_test`, but now it's all done inside the call to `jsPsych.randomization.shuffleNoRepeats` - we just put the function where it's needed and don't bother naming it. Either of these options is fine, and if you find the version using the named function less confusing, use that! 

So that's how we create `observation_trials`, our list of shuffled trials with no consecutive occurrences of the same object. You can see that on lines 77-78 of my code I am using `console.log` to show the unshuffled and shuffled trial lists in the console, so you can view those there and see if you can see the difference. Then in the rest of the code I use exactly the same process (once again involving an anonymous function) to shuffle the production trials; again, I console log those so you can look at the unshuffled and shuffled lists in the console. 

If that was too easy for you, a slightly harder option would be to try to shuffle the observation trials so that the same object can occur on consecutive trials, but you never see the same *label* twice in a row. To figure out how to do that, you might want to look at the console-logged trial lists and think about how you can retrieve the info you need from those in order to test for the relevant equality.


### A less laborious way of building the observation timeline

You might be looking at my code for generating the observation timeline...

```js
var observation_trial_object4_buv = make_observation_trial('object4','buv');
var observation_trial_object4_cal = make_observation_trial('object4','cal');

var observation_trial_object5_seb = make_observation_trial('object5','seb');
var observation_trial_object5_nuk = make_observation_trial('object5','nuk');

var observation_trial_object6_dap = make_observation_trial('object6','dap');
var observation_trial_object6_mig = make_observation_trial('object6','mig');



var observation_trial_object4_buv_repeated = jsPsych.randomization.repeat([observation_trial_object4_buv], 3);
var observation_trial_object4_cal_repeated = jsPsych.randomization.repeat([observation_trial_object4_cal], 2);

var observation_trial_object5_seb_repeated = jsPsych.randomization.repeat([observation_trial_object5_seb], 4);
var observation_trial_object5_nuk_repeated = jsPsych.randomization.repeat([observation_trial_object5_nuk], 1);

//0 variation for this one, just for fun
var observation_trial_object6_dap_repeated = jsPsych.randomization.repeat([observation_trial_object6_dap], 5);


/*
Stick them all together for shuffling...
*/
var observation_trials_unshuffled = [].concat(observation_trial_object4_buv_repeated,
                                              observation_trial_object4_cal_repeated,
                                              observation_trial_object5_seb_repeated,
                                              observation_trial_object5_nuk_repeated,
                                              observation_trial_object6_dap_repeated);
```

...and shaking your head - is there not a more efficient way to do this? Particularly given that in previous weeks I have emphasized that cut-and-paste repetition is potentially quite error-prone. It turns out there is, using `jsPsych.randomization.repeat` in a slightly different way. Consulting [the documentation](https://www.jspsych.org/6.3/reference/jspsych-randomization/index.html#jspsychrandomizationrepeat), I see that the trial list we pass to `jsPsych.randomization.repeat` can be a list (in my case it's just a list of one trial) and the repeat parameter (which tells it how many repeats we want of each item in the list) can be an integer *or a list*. In the former case it makes that many copies of every item in the trial list - e.g. if we give it a list of 2 trials and request 5 repeats it will give us 5 repeats of each. But if we make the repeats parameter a list of values rather than a single list, then it will read off the repeat numbers for each trial from that list - e.g. if my trial list is `[trial1,trial2]` and my repeat parameter is `[3,2]`, it will give me 3 repeats of trial1 and 2 of trial2. It'll also shuffle the resulting trial list for us (although it doesn't have a mechanism for shuffling the trial list to avoid repeats, so we'll still have to do that as additional step). So that means we can actually compress the process of building the observation trial list quite a lot, down to something like this:

```js
//we still have to define the basic trials we will use...
var observation_trial_object4_buv = make_observation_trial('object4','buv');
var observation_trial_object4_cal = make_observation_trial('object4','cal');

var observation_trial_object5_seb = make_observation_trial('object5','seb');
var observation_trial_object5_nuk = make_observation_trial('object5','nuk');

var observation_trial_object6_dap = make_observation_trial('object6','dap');
var observation_trial_object6_mig = make_observation_trial('object6','mig');

//...but then we stick them all together and generate the repeats in a single step
var observation_trials_unshuffled = jsPsych.randomization.repeat(
                                              [observation_trial_object4_buv_repeated,
                                               observation_trial_object4_cal_repeated,
                                               observation_trial_object5_seb_repeated,
                                               observation_trial_object5_nuk_repeated,
                                               observation_trial_object6_dap_repeated],
                                               [3,2,4,1,5]);
```
That should give us a trial list featuring 3 copies of `observation_trial_object4_buv_repeated`, 2 copies of `observation_trial_object4_cal_repeated`, and so on. It's a bit harder to read, but a lot more compact and involves far less laborious cut-and-paste.

## Re-use

All aspects of this work are licensed under a [Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/).
