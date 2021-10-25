/******************************************************************************/
/*** Preamble ************************************************/
/******************************************************************************/

/*
This is the standard word_learning experiment, but shuffling the observation and test 
trials so that the same object is never seen on consecutive trials, using 
jsPsych.randomization.shuffleNoRepeats
*/


/******************************************************************************/
/*** Observation trials ************************************************/
/******************************************************************************/

/*
As per the usual code
*/

function make_observation_trial(object,label) {
  var object_filename = 'images/' + object + '.jpg'; //build file name for the object
  trial = {type:'image-button-response',
           stimulus:object_filename,
           choices:[],
           timeline:[{prompt:'&nbsp;', //dummy text
                      trial_duration:1000},
                     {prompt:label,
                       trial_duration:2000,
                       data:{block:'observation'}
                      }]};
  return trial;
}

/*
Note that we need several objects in order to shuffle such that you never see the same object twice!
*/
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

/*
OK, so this is the critical point - shuffle so we never see the same object twice. The object is given by the 
stimulus parameter, so our equality test can be whether the two trials have the same stimulus or not.
*/
var observation_trials = jsPsych.randomization.shuffleNoRepeats(observation_trials_unshuffled,
                                                                function(trial1,trial2) {
                                                                  return trial1.stimulus==trial2.stimulus
                                                                });

//have a look before and after shuffling!
console.log(observation_trials_unshuffled);
console.log(observation_trials);

/******************************************************************************/
/*** Production trials ************************************************/
/******************************************************************************/

/*
Same as in the standard version
*/

function make_production_trial(object,label_choices) {
  var object_filename = 'images/' + object + '.jpg';
  var trial = {type:'image-button-response',
                stimulus:object_filename,
                timeline: [//subtrial 1: show the two labelled buttons and have the participant select
                          {choices: label_choices, //these will be shuffled on_start
                            //at the start of the trial, randomise the left-right order of the labels
                            //and note that randomisation in data as label_choices
                            on_start: function(trial) {
                              var shuffled_label_choices = jsPsych.randomization.shuffle(label_choices);
                              trial.choices = shuffled_label_choices;
                              trial.data = {block:'production',
                                            label_choices:shuffled_label_choices};
                          },
                            //at the end of the trial, use data.response to figure out
                            //which label they selected, and add that to data
                            on_finish: function(data) {
                              var button_number = data.response;
                              data.label_selected = data.label_choices[button_number];
                            }},
                          //subtrial 2: show the image plus selected label, make the participant click that label
                          //(to re-center their mouse)
                          {choices:[], //dummy choices to be over-written on_start
                            on_start:function(trial) {
                              //get the last trial response (the data generated by the button-click)
                              var last_trial_data = jsPsych.data.get().last(1).values()[0];
                              //look up the label_selected on that last trial
                              var last_trial_label = last_trial_data.label_selected;
                              trial.choices=[last_trial_label]; //this is your only choice
                            },
                        }]}
  return trial;
}

/*
Again, we need several objects to make this work.
*/
var production_trial_object4 = make_production_trial('object4',['buv','cal']);
var production_trial_object5 = make_production_trial('object5',['seb','nuk']);
var production_trial_object6 = make_production_trial('object6',['dap','mig']);


//This may include repeats
var production_trials_unshuffled = jsPsych.randomization.repeat([production_trial_object4,
                                                              production_trial_object5,
                                                              production_trial_object6], 5);

//Shuffle to avoid them, as before
var production_trials = jsPsych.randomization.shuffleNoRepeats(production_trials_unshuffled,
                                                                function(trial1,trial2) {
                                                                  return trial1.stimulus==trial2.stimulus
                                                                });

//have a look before and after shuffling!
console.log(production_trials_unshuffled);
console.log(production_trials);


/******************************************************************************/
/*** Instruction trials *******************************************************/
/******************************************************************************/

/*
As usual, your experiment will need some instruction screens.
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

var instruction_screen_observation = {
  type: 'html-button-response',
  stimulus: "<h3>Observation Instructions</h3>\
  <p>Instructions for the observation stage.</p>",
  choices:['Continue']
};

var instruction_screen_production = {
  type: 'html-button-response',
  stimulus: "<h3>Production Instructions</h3>\
  <p>Instructions for the production phase.</p>",
  choices:['Continue']
};

var final_screen = {
  type: 'html-button-response',
  stimulus: "<h3>Finished!</h3>\
  <p style='text-align:left'>Experiments often end with a final screen, e.g. that contains a completion\
  code so the participant can claim their payment.</p>\
  <p>Click Continue to finish the experiment and see your raw data. Your data will \
  also be saved to server_data.</p>",
  choices:['Continue']
};



/******************************************************************************/
/*** Build the timeline *******************************************************/
/******************************************************************************/


var full_timeline = [].concat(consent_screen,
                              instruction_screen_observation,
                              observation_trials,
                              instruction_screen_production,
                              production_trials,
                              final_screen);


/******************************************************************************/
/*** Run the timeline *******************************************************/
/******************************************************************************/

jsPsych.init({
    timeline: full_timeline,
    on_finish: function(){
      //use data.get and filter to select the trials we want
      var relevant_data = jsPsych.data.get().filter([{block: 'observation'}, {block:'production'}]);
      var relevant_data_as_csv = relevant_data.csv(); //convert that to a csv file
      save_data("wordlearning_data.csv", relevant_data_as_csv); //save it
      jsPsych.data.displayData('csv'); //and also dump *all* the data to screen
    }
});

/*
This is the saveData function provided in the tutorial, just renamed to match my naming convention
(using _ between words in variable names rather than capitalisation)
*/
function save_data(name, data_in){
    var url = 'save_data.php';
    var data_to_send = {filename: name, filedata: data_in};
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data_to_send),
        headers: new Headers({
                'Content-Type': 'application/json'
        })
    });
};
