/******************************************************************************/
/*** Preamble *****************************************************************/
/******************************************************************************/

/*
Based on confederate_priming_readfromcsv.js, but includes two additions:

1. Random assignment to condition (using one of two available trial lists) - the 
code for this is right at the end.
2. A simple way of making the confederate speed up as the experiment progresses - 
the code for this is right at the top.
*/

/******************************************************************************/
/*** Random waits, flipping images ***************************************************/
/******************************************************************************/

/*
At several points in the code we want to generate a random wait, to simulate the
confederate participant pondering what to say or hunting for the correct image. We'd
like the length of this delay to be quite long at first, and then decline as the 
experiment progresses, representing a participant who becomes more familiar with the 
task. 

In order to do this we need to know how far we are into the experiment, so we can make 
the length of wait depend on progress. In this code we actually already have a variable, 
recording_counter, which starts at 0 and increases by 1 every time the participant 
records a response - that's used to label the audio files so we can see the order the 
recordings were made in, but we can also use it here and have a simple if-statement that 
sets the random wait depending on the value of recording_counter.

The random_wait function below will return a number between 1000 and 3000, which
be used as the delay (in milliseconds) on screens where the "waiting for partner"
message appears.
*/

function random_wait() {
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

function random_image_flip(image_name) {
  var image_affixes = ["", "_r"];
  var selected_affix = jsPsych.randomization.shuffle(image_affixes)[0];
  var new_image_name = image_name + selected_affix;
  return new_image_name;
}

/******************************************************************************/
/*** Infrastructure for recording audio ***************************************/
/******************************************************************************/

/*
In confederate_priming_utilities.js as before.
*/

/******************************************************************************/
/*** Saving data trial by trial ***********************************************/
/******************************************************************************/

function save_data(name, data_in) {
  var url = "save_data.php";
  var data_to_send = { filename: name, filedata: data_in };
  fetch(url, {
    method: "POST",
    body: JSON.stringify(data_to_send),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  });
}

function save_confederate_priming_data(data) {
  // choose the data we want to save - this will also determine the order of the columns
  if (data.participant_task == "picture_selection") {
    var button_choices_as_string = data.button_choices.join(",");
    var data_to_save = [
      participant_id,
      data.trial_index,
      data.participant_task,
      data.recording_counter,
      data.time_elapsed,
      data.stimulus,
      button_choices_as_string,
      data.response,
      data.button_selected,
      data.rt,
    ];
  } else if (data.participant_task == "picture_description") {
    var data_to_save = [
      participant_id,
      data.trial_index,
      data.participant_task,
      data.recording_counter,
      data.time_elapsed,
      data.stimulus,
      "NA",
      "NA",
      "NA",
      "NA", //'missing' button_choices for description trials
      "NA", //'missing' data.response
      "NA", //'missing' button_selected
      data.rt,
    ];
  }
  // join these with commas and add a newline
  var line = data_to_save.join(",") + "\n";
  var this_participant_filename = "cp_" + participant_id + ".csv";
  save_data(this_participant_filename, line);
}

/******************************************************************************/
/*** Generate a random participant ID *****************************************/
/******************************************************************************/

var participant_id = jsPsych.randomization.randomID(10);



/******************************************************************************/
/*** Picture selection trials *************************************************/
/******************************************************************************/

function make_picture_selection_trial(sound, images) {
  var sound_file = "sounds/" + sound + ".mp3";
  var image_choices = [];
  for (image of images) {
    image_choices.push(random_image_flip(image));
  }
  //simple waiting message
  var waiting_for_partner = {
    type: "html-button-response",
    stimulus: "Waiting for partner to speak",
    choices: [],
    trial_duration: function () {
      return random_wait();
    },
  };
  //audio trial
  var selection_trial = {
    type: "audio-button-response",
    stimulus: sound_file,
    choices: image_choices,
    button_html:
      '<button class="jspsych-btn"> <img src="images/%choice%.jpg" width=250px></button>',
    post_trial_gap: 500, //a little pause after the participant makes their choice
    on_start: function (trial) {
      var shuffled_image_choices = jsPsych.randomization.shuffle(trial.choices);
      trial.choices = shuffled_image_choices;
      trial.data = {
        participant_task: "picture_selection",
        button_choices: shuffled_image_choices,
      };
    },
    on_finish: function (data) {
      var button_number = data.response;
      data.button_selected = data.button_choices[button_number];
      save_confederate_priming_data(data); //save the trial data
    },
  };
  var full_trial = { timeline: [waiting_for_partner, selection_trial] };
  return full_trial;
}

/******************************************************************************/
/*** Picture description trials ********************************************/
/******************************************************************************/

function make_picture_description_trial(target_image, verb) {
  var target_image_flipped = random_image_flip(target_image);
  var picture_plus_white_mic = {
    type: "image-button-response",
    stimulus: "images/" + target_image_flipped + ".jpg",
    stimulus_width: 500,
    prompt: verb,
    choices: ["mic"],
    button_html:
      '<button class="jspsych-btn" style="background-color: white;"> <img src="images/%choice%.png" width=75px></button>',
  };
  var picture_plus_orange_mic = {
    type: "image-button-response",
    stimulus: "images/" + target_image_flipped + ".jpg",
    stimulus_width: 500,
    choices: ["mic"],
    prompt: verb,
    button_html:
      '<button class="jspsych-btn" style="background-color: Darkorange;"> <img src="images/%choice%.png" width=75px></button>',
    on_start: function (trial) {
      trial.data = { participant_task: "picture_description" };
      start_recording(participant_id);
    },
    on_finish: function (data) {
      data.recording_counter = recording_counter;
      stop_recording();
      save_confederate_priming_data(data);
    },
  };
  var waiting_for_partner = {
    type: "html-button-response",
    stimulus: "Waiting for partner to select",
    choices: [],
    trial_duration: function () {
      return random_wait();
    },
    post_trial_gap: 500, //short pause after the confederate makes their selection
  };
  var full_trial = {
    timeline: [
      picture_plus_white_mic,
      picture_plus_orange_mic,
      waiting_for_partner,
    ],
  };
  return full_trial;
}

/******************************************************************************/
/*** Write headers for data file **********************************************/
/******************************************************************************/

/*
Same as the perceptual learning practical.
*/
var write_headers = {
  type: "call-function",
  func: function () {
    var this_participant_filename = "cp_" + participant_id + ".csv";
    save_data(
      this_participant_filename,
      "participant_id,trial_index,participant_task,recording_counter,time_elapsed,stimulus,button_choice0,button_choice1,button_choice2,button_choice3,response,button_selected,rt\n"
    );
  },
};

/******************************************************************************/
/*** Instruction trials *******************************************************/
/******************************************************************************/

/*
As usual, your experiment will need some instruction screens.
*/

var consent_screen = {
  type: "html-button-response",
  stimulus:
    "<h3>Welcome to the experiment</h3> \
  <p style='text-align:left'>Experiments begin with an information sheet that explains to the participant \
  what they will be doing, how their data will be used, and how they will be \
  remunerated.</p> \
  <p style='text-align:left'>This is a placeholder for that information, which is normally reviewed \
  as part of the ethical review process.</p>",
  choices: ["Yes, I consent to participate"],
};

var instruction_screen = {
  type: "html-button-response",
  stimulus:
    "<h3>Instructions</h3>\
  <p style='text-align:left'>Instructions. NB for an audio experiment, where you are requesting mic access, \
  you will need to provide detailed instructions for the participant.</p>",
  choices: ["Continue"],
};

var audio_permission_instructions1 = {
  type: "html-button-response",
  stimulus:
    "<h3>Permission to access your microphone</h3>\
  <p style='text-align:left'>In this experiment you will be interacting with another participant. \
  You will be recording audio descriptions using your microphone, and listening to \
  descriptions your partner has recorded.</p>\
  <p style='text-align:left'><b>On the next screen we will ask for permission to access your microphone</b>. \
  When the pop-up appears asking for permission to access your microphone, please grant \
  access, otherwise the experiment won't work. </p>\
  <p style='text-align:left'>We will only record when you click the record button - you are always in control.</p>",
  choices: ["Continue"],
  on_finish: function () {
    request_mic_access();
  },
};

var audio_permission_instructions2 = {
  type: "html-button-response",
  stimulus:
    "<h3>Grant permission to access your microphone</h3>\
  <p style='text-align:left'>Please grant us permission to access you microphone in the pop-up, then \
  click below to continue.</p>",
  choices: ["I have granted mic access and am ready to continue"],
};

var final_screen = {
  type: "html-button-response",
  stimulus:
    "<h3>Finished!</h3>\
  <p style='text-align:left'>Experiments often end with a final screen, e.g. that contains a completion\
  code so the participant can claim their payment.</p>\
  <p style='text-align:left'>Click Continue to finish the experiment and see your raw data. \
  Your trial was also saved to the server trial by trial.</p>",
  choices: ["Continue"],
};

/******************************************************************************/
/*** Reading the trial list from a CSV file ***********************************/
/******************************************************************************/


async function read_trials_and_prepare_timeline(triallist_filename) {
  var trial_list = await read_trial_list(triallist_filename);
  var interaction_trials = build_timeline(trial_list);
  var preload_trial = build_button_image_preload(interaction_trials);
  var full_timeline = [].concat(
    consent_screen,
    instruction_screen,
    audio_permission_instructions1,
    audio_permission_instructions2,
    preload_trial,
    write_headers,
    interaction_trials,
    final_screen
  );
  jsPsych.init({
    timeline: full_timeline,
    on_finish: function () {
      jsPsych.data.displayData("csv"); //and also dump *all* the data to screen
    },
  });
}


function build_timeline(trial_list) {
  var interaction_trials = [];
  for (trial of trial_list) {
    var prime_trial = make_picture_selection_trial(trial.confederateSentence, [
                                                   trial.matcherArray1,
                                                   trial.matcherArray2,
                                                   trial.matcherArray3,
                                                   trial.matcherArray4,
    ]);
    var test_trial = make_picture_description_trial(trial.participantImage,
                                                    trial.participantVerb
    );
    interaction_trials.push(prime_trial);
    interaction_trials.push(test_trial);
  }

  return interaction_trials;
}


function build_button_image_preload(interaction_trials) {
  var button_images_list = [];
  for (trial of interaction_trials) {
    var trial_embedded_timeline = trial.timeline;
    for (subtrial of trial_embedded_timeline) {
      if (subtrial.type == "audio-button-response") {
        var image_choices = subtrial.choices;
        for (image of image_choices) {
          var full_image_name = "images/" + image + ".jpg";
          button_images_list.push(full_image_name);
        }
      }
    }
  }

  var preload_trial = {
    type: "preload",
    auto_preload: true,
    images: button_images_list,
  };

  return preload_trial;
}

/*
Random assignment to condition happens here.

We have two CSV files, alternating_ns_confederate.csv and doonly_ns_confederate.csv,
which make up different conditions (where the confederate alternates DO and PO constructions,
or produces DO only). We can randomly assign to condition just by picking one of these at 
random, using very similar code to our random_image_flip function.
*/

function random_condition() {
  var available_csvs = ["alternating_ns_confederate.csv","doonly_ns_confederate.csv"];
  var selected_csv = jsPsych.randomization.shuffle(available_csvs)[0];
  return selected_csv;
}

var this_condition = random_condition();
console.log(this_condition); //logging it so you can see it in the console

read_trials_and_prepare_timeline(this_condition);
