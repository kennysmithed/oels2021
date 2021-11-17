---
title: Week 9 practical, adding test trials, maximum generation, deduplication
description: An example of how to code this up
---

## "Model answer" code

There are three more challenging questions this week, so I will provide the code first (containing all three) then talk you through the questions in turn. As usual, note the scare quotes around "model answer" - this is one way to do these things, and it's what I had in mind when I wrote the questions, but it's certainly not the only or the best way to do it!

You can download my code through the following two links:
- <a href="code/iterated_learning_extended/iterated_learning_extended.html" download> Download iterated_learning_extended.html</a>
- <a href="code/iterated_learning_extended/iterated_learning_extended.js" download> Download iterated_learning_extended.js</a>

If you drop these into your `iterated_learning` folder they will be able to access the copy of `jspsych-6.3.1` plus the various stimuli folders that are already there.

## First question
- How could you insert a small number of test trials after each block of training trials, to keep the participant focussed on the task?

### An answer

`build_training_timeline` creates our training timeline for us - it contains a for-loop, where each iteration through the loop creates one block of training. So if we want to add test trials at the end of each block, we just need to add to that process, within each loop adding on a few test trials to the end of the block. Fortunately we already have some code which creates test trials, in the `build_testing_timeline` function, so we can just copy that quite closely - we'll pick a sample of objects to test on, then create a test trial for each of those and stick it at the end of the training block. The code to do this looks like this:

```js
function build_training_timeline(object_label_pairs, n_repetitions) {
  var training_timeline = []; //build up our training timeline here
  //this for-loop works through the n_repetitions blocks
  for (i = 0; i < n_repetitions; i++) {
    //randomise order of presentation in each block
    var shuffled_object_label_pairs =
      jsPsych.randomization.shuffle(object_label_pairs);
    //in each block, present each object-label pair once
    for (object_label_pair of shuffled_object_label_pairs) {
      var trial = make_observation_trial(
        object_label_pair.object,
        object_label_pair.label
      );
      training_timeline.push(trial);
    }
    //NEW BIT: once we have done the observation trials for this block, we can add some 
    //test trials - let's test on n_intermediate_tests of them, which is a variable set at the top 
    //of the code
    //first we select object_label_pairs to test on
    var object_label_pairs_to_test = jsPsych.randomization.sampleWithoutReplacement(object_label_pairs,n_intermediate_tests);
    //then we have a for loop to create test trials for each of these - note 
    //this works in basically exactly the same way as the loop in build_testing_timeline
    for (object_label_pair of object_label_pairs_to_test) {
      var test_trial = make_production_trial(object_label_pair.object,false);
      training_timeline.push(test_trial);
    }
  }
  return training_timeline;
}
```

The main thing to note is that we have our nested for-loop which we loop through once per block; within each block we create our observation trials (which itself involves a for-loop) and then we add our test trials, which also involves a for-loop - we pick some random objects to test on (creating the variable `object_label_pairs_to_test` by sampling from the `object_label_pairs` we trained on), then work through that list, pushing a test trial to the `training_timeline` for each of those items.

The only additional complication is that the original `make_production_trial` function will take every label produced and add it to `participant_final_label_set`, our building list of labels produced by participants during the final test, which we use to iterate. We really don't want to use these intermediate test items for iteration - they'll be very messy, particularly at first - so I have added an extra argument to the `make_production_trial` function: when that's set to `false`, as it is here, the productions are not saved to the final label set, and then when it's set to `true` (when creating the final test trials) they are.


## Second question
- Can you add a maximum generation number, so no chain goes beyond e.g. 10 generations?

### An answer

There was a very heavy hint about how to answer this in the comments in the original `iterated_learning.js` file, which said:

"Also note that there is no maximum generation number in this code - chains will
run forever! If you want to stop at e.g. 10 generations, this could also be implemented
in step 9a - check this participant's generation number, if they are at generation 10
then don't save their lexicon to the ready_to_iterate folder."

So that makes this fairly straightforward. First, at the top of the code I create a variable that holds our maximum generation number:

```js
var max_generations = 10;
```

Then in the tidy-up trial, which runs when the participant completes the experiment, we simply check the 
current generation number against the `max_generations` experiment and don't create a new input language file if this is the last participant in the chain:

```js
var tidy_up_trial = {
      type: "call-function",
      func: function () {
        //...some other stuff here to do with the deduplication filter you can ignore for now
        //THIS NOW CONTAINS A CHECK ON max_generations
        if (generation < max_generations) {
          save_output_language(participant_final_label_set);
        }
        move_input_language(
          input_language_filename,
          "undergoing_iteration",
          "completed_iteration"
        );
      },
    };
```

## Third question
- Can you implement a deduplication filter like that used by Beckner et al., to avoid presenting participants with ambiguous duplicate labels (where two distinct visual stims map to the same label)?

### An answer

This is pretty tricky, but again, there's some advice on this in the comments of the original `iterated_learning.js` file:

"An additional thing to note: I have not implemented the deduplication filter from
the Beckner et al. method here - I figured the code was complicated enough! If you
want to implement this you will need two extra steps:
1. Before implementing step 9a, saving the participant's produced language to the
ready_to_iterate folder, you need to check it is usable, i.e. contains enough distinct
labels. If so, you proceed as normal; if not, you recycle their input language and
try again.
2. On step 4, selecting object-label pairs to use for training, you would need to
select in a way that avoids duplicate labels, rather than selecting randomly."

The first thing to do is take a look at the Beckner et al. paper and check how they deduplicated and how many labels post-deduplication was considered enough to iterate from. The relevant information is on page 167, and I note with horror that they did it differently from us in the original paper (actually their approach is maybe better):

"In KCS Experiment 2, when identical forms occurred (and happened to be randomly selected for the next generation), all homonyms but one was removed from the training set. However, these filtered items were not replaced, thus leading to variable training set sizes (dipping as low as eight items out of twenty-seven) de- pending on how often the language repeated the exact same form. In the current study, we imposed a requirement that training languages must include a fixed number of training items (either N1=12 or N=15, out of a total space of twenty-seven possible meaning combinations). Thus, if homonyms were randomly selected as
training items for the next generation, all instances but one were assigned to the ‘unseen’ set. For each removed item, we then selected replacement candidates at random from the same language (while continuing to disallow identical forms as candidates), and used these as training items for the next generation.
We introduced a fixed size in our experiment for several reasons. First, we set out to investigate the effect of controlled adjustments to the training set size, given previous arguments that the ‘bottleneck size’ may be important to the emergence of structure (Kirby et al. 2007). Additionally, imposing consistency across different chains and generations is helpful for interpretive purposes. One of the KCS metrics—the amount of intergenerational change, by generation—is difficult to evaluate meaningfully if the amount of training input fluctuates. The amount of intergenerational change will inevitably increase if participants encounter a smaller portion of the previous generation’s language; holding the training set size provides a consistent measure by condition. Holding the training set size constant imposes an additional layer of data filtering beyond the filtering implemented by KCS. In our experiment, in cases where the output language contained fewer than N items, we discarded the output and reran the exact same experiment setup with a new participant."

OK, so I will have to create a function called `deduplicate` which will take the picture-label pairs a participant produces at the final test and deduplicates, then if the resulting deduplicated set is smaller than my bottleneck size (N, which in my code is represented by the variable `botttleneck_size`) I can't iterate and have to re-do that generation. Writing the deduplication function will be a bit tricky, but once that's created it's actually fairly straightforward to check if I have enough labels to iterate, in the `tidy_up_trial` after the participant completes the final test:

```js
var tidy_up_trial = {
      type: "call-function",
      func: function () {
        var deduplicated_final_label_set = deduplicate(participant_final_label_set)
        if (deduplicated_final_label_set.length >= bottleneck_size) {
          //iterate in the usual way (including checking this is not the last generation in this chain)
        }
        else {//if they failed the deduplication check then we have to re-run this generation,
          //so we just recycle their input file back to the ready_to_iterate folder as if they 
          //had abandoned
          move_input_language(
            input_language_filename,
            "undergoing_iteration",
            "ready_to_iterate"
          );
        } 
      },
    };
```

Then when we read in a new input language at the next generation, we can do the same trick - deduplicate the set of labels, then select our training items from the deduplicated set:
```js
// 3. We read in the input language from the appropriate file.
    var input_language = await read_input_language(input_language_filename);

    // 4. We use that input language to generate training trials for this participant.
    // We impose a bottleneck on transmission by taking a subset of the language
    // of the previous generation (here, 14 randomly-selected object-label pairs)
    // and using that to build the training timeline (here, repeating each of those
    // object-label pairs once)
    // THIS NOW REFERS TO THE bottleneck_size VARIABLE DEFINED AT THE TOP OF THE CODE,
    // making it easy to change the bottleneck size.
    // WE ALSO NEED TO DEDUPLICATE THE INPUT LANGUAGE BEFORE SELECTING TRAINING LABELS
    var deduplicated_input_language = deduplicate(input_language)
    var training_object_label_pairs =
      jsPsych.randomization.sampleWithoutReplacement(
        deduplicated_input_language,
        bottleneck_size
      );
    var training_timeline = build_training_timeline(
      training_object_label_pairs,
      1
    );
```
This ensures that we don't present deduplicated labels during training.

The tricky part is going to be writing the deduplication filter. Remember that `participant_final_label_set` is a list that looks like this:
```js
[
  {object:"o1_cB_n1",label:"tata"},
  {object:"o3_cG_n3",label:"sosovu"},
  {object:"o3_cB_n3",label:"sosoka"},
  ...
]
```
This list is just in the order that the participant produced the labels in the final test, so we probably want to randomise that order again so we don't systematically pick e.g. the first unique labels that the participant produced. Beyond that, there are actually a ton of options available in javascript to do this, including some libraries that contain useful functions - I googled "javascript remove duplicates from array" and the first hit is a stackoverflow question that contains a very comprehensive answer. Having said that, those solutions are a bit opaque, so I am going to code it in a simple way here. My basic idea is that I will build up a list of non-duplicate object-label pairs: this will start out as empty, I'll work through the list in `participant_final_label_set`, adding stuff to my list of unique pairs *unless* I can see I already have a pair in there using the label for the picture-label pairs I am considering, in which case I won't add that one. The simplest way to keep track of which labels have appeared is just to keep a separate list of labels, then I can just check that list using a built-in function called `includes`. So the deduplication function looks like this:

```js
function deduplicate(object_label_pairs) {
  //shuffle them so we don't end up picking the first unique labels
  var shuffled_object_label_pairs =
    jsPsych.randomization.shuffle(object_label_pairs);
  //need building list of deduplicated_object_label_pairs and deduplicated_labels
  var deduplicated_object_label_pairs = [];
  var deduplicated_labels = [];
  //now iterated through shuffled_object_label_pairs
  for (this_object_label_pair of shuffled_object_label_pairs) {
    var this_label = this_object_label_pair.label; //get the label
    //if the label is already in deduplicated_labels
    if (deduplicated_labels.includes(this_label)) {
      //do nothing!
    } else { //otherwise it's a label we haven't seen yet, so we can add it
      deduplicated_object_label_pairs.push(this_object_label_pair);
      deduplicated_labels.push(this_label);
    }
  }
  return deduplicated_object_label_pairs;
}
```





## Re-use

All aspects of this work are licensed under a [Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/).
