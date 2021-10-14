
/******************************************************************************/
/*** L-maze, two-list version ************************************************/
/******************************************************************************/



function make_maze_trial(sentence_as_word_list,distractors_as_word_list) {
  var choices_sequence = []; //empty stimulus sequence to start
  for (var i=0;i<sentence_as_word_list.length;i++) { //for each value of the counter i=0 to i=length-1
    correct_continuation = sentence_as_word_list[i];
    incorrect_continuation = distractors_as_word_list[i];
    ordered_choices = [correct_continuation,incorrect_continuation]; //put the two options together
    shuffled_choices = jsPsych.randomization.shuffle(ordered_choices); //randomise the order
    choices_sequence.push({'choices':shuffled_choices}); //these will be our choices
  }
  var trial = {type: 'html-button-response', //make a trial with an embedded timeline
               timeline:[{stimulus: "<em>Select a continuation</em>",
                         timeline: choices_sequence}]};
  return trial; //return the trial you have built
};

/*
Now it is very easy to build multiple trials using this function.
*/

var maze_trial_1 = make_maze_trial(["The","dog","chased","the","cat."],["x-x-x","thon","pirths","swax","yits."]);
var maze_trial_2 = make_maze_trial(["This","is","a","sentence."],["x-x-x","si","u","tensnece."]);


/******************************************************************************/
/*** Instruction trials *******************************************************/
/******************************************************************************/

/*
I'll just put in a consent screen and final screen.
*/

var consent_screen = {
  type: 'html-button-response',
  stimulus: "<h3>Welcome to the experiment</h3> \
  <p style='text-align:left'>Experiments begin with an information sheet that explains to the participant \
  what they will be doing, how their data will be used, and how they will be \
  remunerated.</p> \
  <p style='text-align:left'>This is a placeholder for that information, which is normally reviewed \
  as part of the ethical review process.</p>",
  choices: ['Yes, I consent to participate'],
};

var final_screen = {
  type: 'html-button-response',
  stimulus: "<h3>Finished!</h3>\
  <p style='text-align:left'>Experiments often end with a final screen, e.g. that contains a completion \
  code so the participant can claim their payment.</p>\
  <p style='text-align:left'>This is a placeholder for that information.",
  choices:["Click to finish the experiment and see your raw data"]};


/******************************************************************************/
/*** Build the timeline and run ***********************************************/
/******************************************************************************/


var full_timeline = [consent_screen,
                     maze_trial_1,maze_trial_2,
                     final_screen];

jsPsych.init({
    timeline: full_timeline,
    on_finish: function(){jsPsych.data.displayData('csv')}
});
