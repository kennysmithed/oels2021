
/******************************************************************************/
/*** L-maze, two-list version ************************************************/
/******************************************************************************/



function make_maze_trial(sentence_distractor_pairs) {
  var choices_sequence = []; //empty stimulus sequence to start
  for (ordered_choices of sentence_distractor_pairs) {
    shuffled_choices = jsPsych.randomization.shuffle(ordered_choices); //randomise the order
    combined_choices = shuffled_choices.join(" "); //paste the two choices together in one string separated by space
    choices_sequence.push({'stimulus':combined_choices}); //this will be our stimulus
  }
  var trial = {type: 'html-keyboard-response', //make a trial with an embedded timeline
               timeline:[{prompt: "<em>Press z for the left choice, m for the right choice",
                          choices:['z','m'],
                          timeline: choices_sequence}]};
  return trial; //return the trial you have built
};

/*
Now it is very easy to build multiple trials using this function.
*/
var maze_trial_1 = make_maze_trial([["The","Dax"],["cat","fip"],["sat","wug"],["on","zo"],["the","dax"],["mat","pif"]]);
var maze_trial_2 = make_maze_trial([["This","Siht"],["is","si"],["a","u"],["sentence","tensnece"]]);

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
