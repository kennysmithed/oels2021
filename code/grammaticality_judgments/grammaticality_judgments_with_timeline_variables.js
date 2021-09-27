/*
This is a version of the grammaticality judgment code that uses timeline variables
to lay out several yes/no trials, rather than laborious specifying each trial.
*/

// The sentences we want to test - each is labelled as a stimulus
var sentences = [{'stimulus':"This is a grammatical sentence"},
                  {'stimulus':"This sentence is fine"},
                  {'stimulus':"Sentence this is ungrammatical"}];

// The general format for a judgment trial - note the use of jsPsych.timelineVariable
// for the stimulus parameter
var judgment_trial = {
    type: 'html-keyboard-response',
    prompt: '<p><em>Could this sentence be spoken by a native speaker of English? Press y or n</em></p>',
    choices: ['y','n'],
    stimulus: jsPsych.timelineVariable('stimulus')
};

// Stitch the two together - use the sentences variable to fill in the stimulus field
var all_judgment_trials = {
    timeline: [judgment_trial],
    timeline_variables: sentences,
    randomize_order: true
};

// The rest is the same as before - consent + instruction screens.
var consent_screen = {
  type: 'html-button-response',
  stimulus: "<h3>Welcome to the experiment</h3>\
  <p style='text-align:left'>Experiments begin with an information sheet that explains to the participant\
  what they will be doing, how their data will be used, and how they will be\
  remunerated.</p>\
  <p style='text-align:left'>This is a placeholder for that information, which is normally reviewed\
  as part of the ethical review process.</p>",
  choices: ['Yes, I consent to participate'],
};

//This is html-button-response, just like the consent screen.
var instruction_screen_1 = {
  type: 'html-button-response',
  stimulus: "<h3>Instructions</h3> \
  <p style='text-align:left'>In this experiment you will read English sentences, and determine if they sound\
  grammatical to you. By grammatical, we mean whether you think a native speaker of\
  English could say this sentence in a conversation. In other words, do you think it\
  would sound odd for your friends to say this to you, as if they don't speak English natively?</p>\
  <p style='text-align:left'>We are <b>not</b> concerned with whether the sentence would be graded highly\
  by a writing teacher: we do not care about points of style or clarity, and we do\
  not care about the grammar rules that you learned in school (who versus whom,\
  ending a sentence with a preposition, etc). Instead, we are interested in whether\
  these sentences could be said by a native speaker of English in normal daily speech.</p>",
  choices:["Click to proceed to the next page"]
};

var instruction_screen_2 = {
  type: 'html-button-response',
  stimulus: "<h3>Instructions, continued</h3>\
  <p style='text-align:left'>For each sentence, simply press the <b>y</b> key (for yes) if you think the sentence\
  could be spoken by a native speaker, or the <b>n</b> key (for no) if you think that\
  the sentence could not be spoken by a native speaker.</p>\
  <p style='text-align:left'>Here are two examples: the first is a <b>no</b> for most speakers, and the\
  second is a <b>yes</b> for most speakers.</p>\
  <p> <span style='color:red'>The was insulted waitress frequently</span> <b>(no)</b></p>\
  <p> <span style='color:green'>This is a pen</span> <b>(yes)</b></p>",
  choices:["Click when you are ready to begin"]
};

var final_screen = {
  type: 'html-button-response',
  stimulus: "<h3>Finished!</h3>\
  <p style='text-align:left'>Experiments often end with a final screen, e.g. that contains a completion\
  code so the participant can claim their payment.</p>\
  <p style='text-align:left'>This is a placeholder for that information.</p>",
  choices:["Click to finish the experiment and see your raw data"]
};


var full_timeline = [consent_screen,instruction_screen_1,instruction_screen_2,all_judgment_trials,final_screen];


jsPsych.init({
    timeline: full_timeline,
    on_finish: function(){jsPsych.data.displayData('csv')}
});
