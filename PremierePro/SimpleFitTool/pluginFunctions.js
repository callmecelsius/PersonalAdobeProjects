// All these fuctions sends data to JSX
// Main script to run edits/cuts
function runALL() {
  var cs = new CSInterface;

  var total_exercises = document.getElementById('Exercises').value;
  var total_rounds = document.getElementById('Rounds').value;
  var active_secs = document.getElementById('onTime').value;
  var resting_secs = document.getElementById('offTime').value;
  var starttime_secs = document.getElementById('Start').value;
  var total_beeps = document.getElementById('Beeps').value;
  var btw_rounds_secs = document.getElementById('roundBreak').value;

  var clipNum = document.getElementById('clipIndex').value;
  var tone1Num = document.getElementById('tone1Index').value;
  var tone2Num = document.getElementById('tone2Index').value;

  // send all the values to the actual scrip
  var sendValues = 'var total_exercises = ' + total_exercises + ';var total_rounds =' + total_rounds + ';var active_secs =' + active_secs + ';var resting_secs =' + resting_secs + ';var starttime_secs =' + starttime_secs + ';var total_beeps =' + total_beeps + ';var clipNum =' + clipNum + ';var tone1Num =' + tone1Num + ';var tone2Num =' + tone2Num + ';var btw_rounds_secs =' + btw_rounds_secs + ';';

  cs.evalScript(sendValues + '$.runScript.setUpTool()');

}

// finds the index # of clips by name
function findIndex() {
  var cs = new CSInterface;

  var clipName = document.getElementById('clipForSequence').value;

  cs.evalScript('$.runScript.searchProjectForItemByName(0,app.project.rootItem,"' + clipName + '")');
  cs.evalScript('$.runScript.searchProjectForItemByName(0,app.project.rootItem,"Tone 1.wav")');
  cs.evalScript('$.runScript.searchProjectForItemByName(0,app.project.rootItem,"tone 2.wav")');
}

// Script to adjust volume to fade in and out
function adjustVolume() {
  var cs = new CSInterface;
  var trackNum_M = document.getElementById('musicTrack').value;
  var trackNum_V = document.getElementById('voiceTrack').value;

  var sendValues = 'var trackNum_M = ' + trackNum_M + ';var trackNum_V = ' + trackNum_V + ';';
  cs.evalScript(sendValues + '$.runScript.addKeyFrames()');
}


