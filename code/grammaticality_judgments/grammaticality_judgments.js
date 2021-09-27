/*
This is a javascript block comment - the interpreter ignores this stuff, it's for
you to read, although note that anyone looking at the source code of your experiment
will see these comments, including any curious participants!
*/

// Individual lines can be commented out like this.

/******************************************************************************/
/*** Judgment trials **********************************************************/
/******************************************************************************/

/*
First we lay out the critical trials.
These are type:'html-keyboard-response', because we are going to show the participant
some text on screen and then ask them to press a button.
stimulus is the sentence they will see.
choices are the keyboard responses that will be accepted - only the y or n keys
The prompt reminds them what to do on each trial. We use a little bit of html
formatting in the prompt so it appears in italics (that's what the <em> and </em>
tags do) and vertically seperated (in its own paragraph, using the <p> tags),
so make it stand out from the stimulus sentence.

We just have 4 judgment trials here, obviously a real experiment would typically have more!
*/

//Filler sentence
var judgment_trial_1 = {
    type: 'html-keyboard-response',
    stimulus: "Where did Blake buy the hat?",
    prompt: "<p><em>Could this sentence be spoken by a native speaker of English? Press y or n</em></p>",
    choices: ['y','n']
};

//Complex NP Island Effect, control
var judgment_trial_2 = {
    type: 'html-keyboard-response',
    stimulus: "What did you claim that Blake bought?",
    prompt: "<p><em>Could this sentence be spoken by a native speaker of English? Press y or n</em></p>",
    choices: ['y','n']
};

//Complex NP Island Effect, violation
var judgment_trial_3 = {
    type: 'html-keyboard-response',
    stimulus: "What did you make the claim that Blake bought?",
    prompt: "<p><em>Could this sentence be spoken by a native speaker of English? Press y or n</em></p>",
    choices: ['y','n']
};

//Filler sentence, ungrammatical
var judgment_trial_4 = {
    type: 'html-keyboard-response',
    stimulus: "Did where Blake buy the hat?",
    prompt: "<p><em>Could this sentence be spoken by a native speaker of English? Press y or n</em></p>",
    choices: ['y','n']
};

/******************************************************************************/
/*** Instruction trials *******************************************************/
/******************************************************************************/

/*
In addition to the critical trials, we need some screens which explain to the
participants what they are doing. I am using html-button-response trials for instructions,
there are other options.

The wording of instruction_screen_1 and instruction_screen_2 comes from a set of
example experiments provided by Jon Sprouse, downloaded from
https://sprouse.uconn.edu/courses/experimental-syntax/
*/

//Bit of html formatting in this one - a header and some left-aligning of the
//instructions, otherwise it is centered, which I think is hard to read.
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

//More html-button-response trials, just like the consent screen.
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


/******************************************************************************/
/*** Build the timeline *******************************************************/
/******************************************************************************/

/*
This experiment is very simple, and our timeline is just a list of the trials we
set up above. There's no randomisation, so our trials will always play in the same
order every time we run through the experiment - later we'll see how to do
randomisation.
*/
var full_timeline = [consent_screen,instruction_screen_1,instruction_screen_2,
                    judgment_trial_1,judgment_trial_2,judgment_trial_3,judgment_trial_4,
                    final_screen];

/*
Finally we call jsPsych.init to run the timeline we have created.
Nothing fancy going on in here, except that on_finish (so after the final_screen
trial) we use a built-in function to dump the raw data on the screen. Obviously
you wouldn't do this with a real experiment, and we will show you how to save data
in a subsequent example, but this at least allows you to see what the data looks
like behind the scenes.
*/

jsPsych.init({
    timeline: full_timeline,
    on_finish: function(){jsPsych.data.displayData('csv')}
});
