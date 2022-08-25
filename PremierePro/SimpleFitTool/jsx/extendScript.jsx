if (typeof ($) == 'undefined') {
  $ = {};
}

app.enableQE();


$.runScript = {

  setUpTool: function () {
    
    var proj = app.project;
    var activeSeq = proj.activeSequence;

    //Motion graphic timer locations
    var localPath = "C:\\Users\\inguy\\AppData\\Roaming\\Adobe\\Common\\Motion Graphics Templates\\Countdown timer bottom left 60s.mogrt";
    var localPathNextExercise = "C:\\Users\\inguy\\AppData\\Roaming\\Adobe\\Common\\Motion Graphics Templates\\Next Exercise.mogrt";
    var localPathCircle = [
      "C:\\Users\\inguy\\AppData\\Roaming\\Adobe\\Common\\Motion Graphics Templates\\Countdown Circle 10s.mogrt",
      "C:\\Users\\inguy\\AppData\\Roaming\\Adobe\\Common\\Motion Graphics Templates\\Countdown Circle 15s.mogrt",
      "C:\\Users\\inguy\\AppData\\Roaming\\Adobe\\Common\\Motion Graphics Templates\\Countdown Circle 20s.mogrt",
      "C:\\Users\\inguy\\AppData\\Roaming\\Adobe\\Common\\Motion Graphics Templates\\Countdown Circle 25s.mogrt",
      "C:\\Users\\inguy\\AppData\\Roaming\\Adobe\\Common\\Motion Graphics Templates\\Countdown Circle 30s.mogrt",
      "C:\\Users\\inguy\\AppData\\Roaming\\Adobe\\Common\\Motion Graphics Templates\\Countdown Circle 35s.mogrt",
      "C:\\Users\\inguy\\AppData\\Roaming\\Adobe\\Common\\Motion Graphics Templates\\Countdown Circle 40s.mogrt",
      "C:\\Users\\inguy\\AppData\\Roaming\\Adobe\\Common\\Motion Graphics Templates\\Countdown Circle 45s.mogrt",
      "C:\\Users\\inguy\\AppData\\Roaming\\Adobe\\Common\\Motion Graphics Templates\\Countdown Circle 50s.mogrt",
      "C:\\Users\\inguy\\AppData\\Roaming\\Adobe\\Common\\Motion Graphics Templates\\Countdown Circle 55s.mogrt",
      "C:\\Users\\inguy\\AppData\\Roaming\\Adobe\\Common\\Motion Graphics Templates\\Countdown Circle 60s.mogrt"];
    var reset_circle = "C:\\Users\\inguy\\AppData\\Roaming\\Adobe\\Common\\Motion Graphics Templates\\Countdown Circle Reset.mogrt";

    //creates variables for the video/audio tracks used
    var track = activeSeq.videoTracks[0];
    var nextExercise = activeSeq.videoTracks[2];
    var audioTrack = activeSeq.audioTracks[1];
    var clip = proj.rootItem.children[clipNum];

    //creates variables for tone files in the project 
    var tone = proj.rootItem.children[tone2Num];
    var tone2 = proj.rootItem.children[tone1Num];

    // misc variables to keep track of
    // "rounds" only if theres an extended break btw cycles
    var myTime = new Time();
    var tickConst = 254016000000
    myTime.seconds = starttime_secs;
    var switchingVal = true;
    var num_of_passes = total_exercises * total_rounds * 2;
    var num_of_rounds = 0;

    //sets the length of the tones
    tone.setInPoint(0, 4);
    tone.setOutPoint(String(tickConst * .5), 4);
    tone2.setInPoint(0, 4);
    tone2.setOutPoint(String(tickConst * 1), 4);

    //variables for motion graphics
    var active_circle;
    var rest_circle;
    var roundBreakCircle;
    var circle_ind_pos = 0;

    //these convoluted loops choose the correct interval; must be a better way lol
    for (var x = 10; x <= 60; x += 5) {
      if (active_secs == x) {
        active_circle = localPathCircle[circle_ind_pos];
        break;
      }

      circle_ind_pos++;
    }

    circle_ind_pos = 0;

    for (var y = 10; y <= 60; y += 5) {
      if (resting_secs == y) {
        rest_circle = localPathCircle[circle_ind_pos];
        break;
      }
      circle_ind_pos++;
    }

    circle_ind_pos = 0;
    for (var z = 10; z <= 60; z += 5) {
      if (btw_rounds_secs == 0) {
        break;
      }
      else if (btw_rounds_secs == z) {
        roundBreakCircle = localPathCircle[circle_ind_pos];
        break;
      }
      circle_ind_pos++;
    }

    // Cutting Clips section
    for (i = 0; i < num_of_passes; i++) {

      var prev_clip = track.clips[track.clips.numItems - 1];
      var prev_beep = audioTrack.clips[audioTrack.clips.numItems - 1];

      //inserts clips accounting for other clips
      if (track.clips.numItems > 0) {
        //inserts after the previous clips
        if (prev_clip) {
          //block to insert exercise clip
          if (switchingVal == true) {
            activeSeq.importMGT(reset_circle, prev_clip.end.seconds, 6, 6); //inserts circle reset

            clip.setInPoint(myTime.ticks, 4);

            //inserts next exercise on break
            myTime.seconds += resting_secs;
            clip.setOutPoint(myTime.ticks, 4);
            nextExercise.insertClip(clip, prev_clip.start.seconds);
            activeSeq.importMGT(localPathNextExercise, prev_clip.start.seconds, 1, 1);
            myTime.seconds -= resting_secs;

            //inserts actual exercise after the break
            myTime.seconds += active_secs;
            clip.setOutPoint(myTime.ticks, 4);
            track.insertClip(clip, prev_clip.end.seconds);

            //CHANGE TO COPY IN THE FUTURE TO SAVE IMPORT TIME
            //inserts motion graphics
            activeSeq.importMGT(localPath, prev_clip.end.seconds, 4, 4);
            activeSeq.importMGT(active_circle, prev_clip.end.seconds, 5, 5);

            //inserts beeps
            audioTrack.insertClip(tone2, prev_clip.end.seconds);
            activeSeq.markers.createMarker(prev_beep.end.seconds);
            activeSeq.markers.createMarker(prev_beep.end.seconds + 1);

            for (j = 0; j < total_beeps; j++) {
              audioTrack.insertClip(tone, prev_clip.end.seconds - (1 + j));

              if (j == total_beeps - 1) {
                activeSeq.markers.createMarker(prev_clip.end.seconds - (1 + j));
                activeSeq.markers.createMarker(prev_clip.end.seconds - (2 + j));
              }

            }
            //binary tracking
            switchingVal = false;
          }

          //block to insert resting clip
          else if (num_of_rounds < (total_exercises - 1)) {
            activeSeq.importMGT(reset_circle, prev_clip.end.seconds, 6, 6);
            //inserts clip
            clip.setInPoint(myTime.ticks, 4);
            myTime.seconds += resting_secs;
            clip.setOutPoint(myTime.ticks, 4);
            track.insertClip(clip, prev_clip.end.seconds);
            //CHANGE TO COPY IN THE FUTURE TO SAVE IMPORT TIME
            //inserts motion graphics
            activeSeq.importMGT(localPath, prev_clip.end.seconds, 4, 4);
            activeSeq.importMGT(rest_circle, prev_clip.end.seconds, 5, 5);

            //inserts beeps
            audioTrack.insertClip(tone2, prev_clip.end.seconds);
            activeSeq.markers.createMarker(prev_beep.end.seconds);
            activeSeq.markers.createMarker(prev_beep.end.seconds + 1);
            for (j = 0; j < total_beeps; j++) {
              audioTrack.insertClip(tone, prev_clip.end.seconds - (1 + j));

              if (j == total_beeps - 1) {
                activeSeq.markers.createMarker(prev_clip.end.seconds - (1 + j));
                activeSeq.markers.createMarker(prev_clip.end.seconds - (2 + j));
              }

            }

            //binary tracking
            switchingVal = true;
            //for scenarios with breaks between cycles
            if (btw_rounds_secs != 0) {
              num_of_rounds++;
            }
          }

          //for scenarios with breaks between cycles
          else if (btw_rounds_secs != 0) {
            activeSeq.importMGT(reset_circle, prev_clip.end.seconds, 6, 6);
            clip.setInPoint(myTime.ticks, 4);
            //rest interval
            myTime.seconds += btw_rounds_secs;
            clip.setOutPoint(myTime.ticks, 4);
            track.insertClip(clip, prev_clip.end.seconds);

            //CHANGE TO COPY IN THE FUTURE TO SAVE IMPORT TIME
            activeSeq.importMGT(localPath, prev_clip.end.seconds, 4, 4);
            activeSeq.importMGT(roundBreakCircle, prev_clip.end.seconds, 5, 5);

            audioTrack.insertClip(tone2, prev_clip.end.seconds);
            activeSeq.markers.createMarker(prev_beep.end.seconds);
            activeSeq.markers.createMarker(prev_beep.end.seconds + 1);
            for (j = 0; j < total_beeps; j++) {

              audioTrack.insertClip(tone, prev_clip.end.seconds - (1 + j));

              if (j == total_beeps - 1) {
                activeSeq.markers.createMarker(prev_clip.end.seconds - (1 + j));
                activeSeq.markers.createMarker(prev_clip.end.seconds - (2 + j));
              }
            }
            switchingVal = true;
            num_of_rounds = 0;
          }
        }
      }

      //first clip
      else {
        //inserts clip
        clip.setInPoint(myTime.ticks, 4);
        myTime.seconds += active_secs;
        clip.setOutPoint(myTime.ticks, 4);
        track.insertClip(clip, 0);
        //inserts motion graphics
        activeSeq.importMGT(localPath, 0, 4, 4);
        activeSeq.importMGT(active_circle, 0, 5, 5);
        //binary tracker
        switchingVal = false;
        //beep
        audioTrack.insertClip(tone2, 0);
      }


    }


  },

  searchProjectForItemByName: function (i, containingBin, nameToFind) {

    var itemFound = false

    for (var j = i; j < containingBin.children.numItems; j++) {
      var currentChild = containingBin.children[j];
      //Non fuctioning recursion (5/25/21)
      if (currentChild.type === ProjectItemType.BIN) {
        // alert("Searching Bin: '" + String(currentChild.name) +"''")
        // return searchBinForProjItemByName(j, currentChild, nameToFind); // warning; recursion!
      }

      else if (currentChild.name === nameToFind) {
        alert('index [ ' + String(j) + ' ]')
        itemFound = true
        return;
      }

    }

    if (!itemFound) {
      alert("The item was not found in bin:" + String(containingBin.name));
      return itemFound;
    }
  },

  addKeyFrames: function () {

    //shortcut names
    var proj = app.project;
    var activeSeq = proj.activeSequence;
    //music
    var nestedMusicVol = activeSeq.audioTracks[trackNum_M - 1].clips[0].components[0].properties[1];
    var nestedMusicTime = activeSeq.audioTracks[trackNum_M - 1].clips[0].start;
    //voice
    var voiceVol = activeSeq.audioTracks[trackNum_V - 1].clips[0].components[0].properties[1];
    var voiceTime = activeSeq.audioTracks[trackNum_V - 1].clips[0].start;

    var curMarker = activeSeq.markers.getFirstMarker();
    //time objs
    var markerTime;
    var keyTracker = 2;
    var keySwitch = true;

    //volume values
    const vol_0 = 0.17782793939114;
    const vol_5 = 0.31622776389122;
    const vol_n7 = 0.07943282276392;
    const vol_n10 = 0.0562341324985;
    const vol_nInf = 0;

    for (i = 0; i < activeSeq.markers.numMarkers; i++) {

      markerTime = curMarker.start;

      if (keySwitch) {

        nestedMusicVol.addKey(markerTime.seconds - nestedMusicTime.seconds);
        nestedMusicVol.setValueAtKey(markerTime.seconds - nestedMusicTime.seconds, vol_n7);

        voiceVol.addKey(markerTime.seconds - voiceTime.seconds);
        voiceVol.setValueAtKey(markerTime.seconds - voiceTime.seconds, vol_nInf);

      }

      else {

        nestedMusicVol.addKey(markerTime.seconds - nestedMusicTime.seconds);
        nestedMusicVol.setValueAtKey(markerTime.seconds - nestedMusicTime.seconds, vol_0);

        voiceVol.addKey(markerTime.seconds - voiceTime.seconds);
        voiceVol.setValueAtKey(markerTime.seconds - voiceTime.seconds, vol_0);
      }

      if (keyTracker == 2) {
        keySwitch = !keySwitch;
        keyTracker = 0;
      }

      curMarker = activeSeq.markers.getNextMarker(curMarker);
      keyTracker += 1;
    }

  }

}