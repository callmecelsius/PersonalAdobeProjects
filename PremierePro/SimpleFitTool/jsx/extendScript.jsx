if(typeof($)=='undefined'){
	$={};
}

app.enableQE();


$.runScript = {


	setUpTool: function() {

		var proj = app.project;
		//CHANGE these timers to the appropriate intervals
		var localPath = "C:\\Users\\inguy\\AppData\\Roaming\\Adobe\\Common\\Motion Graphics Templates\\Countdown timer bottom left 60s.mogrt";
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
		var localPathLAST = "C:\\Users\\inguy\\AppData\\Roaming\\Adobe\\Common\\Motion Graphics Templates\\Countdown Circle Reset.mogrt";

		var activeSeq = app.project.activeSequence;
		var track = activeSeq.videoTracks[0];
		var audioTrack = activeSeq.audioTracks[1];
		var clip = app.project.rootItem.children[clipNum];
		//TONES
		var audioClip = app.project.rootItem.children[tone2Num];
		var audioClip2 = app.project.rootItem.children[tone1Num];

		var myTime = new Time();
		var tickConst = 254016000000
		myTime.seconds = num5;
		var switchingVal = true;
		var exercises = num1;
		var rounds = num2;
		var beeper = num6;
		var counter = exercises * rounds * 2;
		var roundCounter = 0;

		audioClip.setInPoint(0,4);
		audioClip.setOutPoint(String(tickConst*.5),4);

		audioClip2.setInPoint(0,4);
		audioClip2.setOutPoint(String(tickConst*1),4);

		var onCircle;
		var offCircle;
		var roundBreakCircle;
		var pathNotIndexLol = 0;
		
		for (var x = 10; x <= 60; x += 5) {
			if (num3 == x){
				onCircle = localPathCircle[pathNotIndexLol];
				break;
			}
			
			pathNotIndexLol++;
		}
		
		pathNotIndexLol = 0;
		
		for (var y = 10; y <= 60; y += 5) {
			if (num4 == y){
				offCircle = localPathCircle[pathNotIndexLol];
				break;
			}
			pathNotIndexLol++;
		}
		
		pathNotIndexLol = 0;
		for (var z = 10; z <= 60; z += 5) {
			if (roundBreakTime == 0){
				break;
			}
			else if (roundBreakTime == z){
				roundBreakCircle = localPathCircle[pathNotIndexLol];
				break;
			}
			pathNotIndexLol++;
		}
		
		// Cutting Clips section
		for(i = 0; i < counter; i++) {
			
			var lastClip = track.clips[track.clips.numItems - 1];
			
		    //inserts clips accounting for other clips
		    if (track.clips.numItems > 0) {
				//inserts after the previous clips
		        if (lastClip){
					
					//block to insert exercise clip
		            if (switchingVal == true) {
						activeSeq.importMGT(localPathLAST,lastClip.end.seconds,8,8); //inserts circle reset
						//inserts clip
		                clip.setInPoint(myTime.ticks,4);
		                myTime.seconds += num3;
		                clip.setOutPoint(myTime.ticks,4);
		                track.insertClip(clip, lastClip.end.seconds);
		                //CHANGE TO COPY IN THE FUTURE TO SAVE IMPORT TIME
						//inserts motion graphics
		                activeSeq.importMGT(localPath,lastClip.end.seconds,6,6);
		                activeSeq.importMGT(onCircle,lastClip.end.seconds,7,7);
						//inserts beeps
		                audioTrack.insertClip(audioClip2, lastClip.end.seconds);
		                for (j = 0; j < beeper; j ++){
		                    audioTrack.insertClip(audioClip, lastClip.end.seconds - (1 + j) );
		                }
						//binary tracking
		                switchingVal = false;
		            }

		            //block to insert resting clip
		            else if (roundCounter < (exercises - 1) ) {
		                activeSeq.importMGT(localPathLAST,lastClip.end.seconds,8,8);
						//inserts clip
		                clip.setInPoint(myTime.ticks,4);
		                myTime.seconds+= num4;
		                clip.setOutPoint(myTime.ticks,4);
		                track.insertClip(clip, lastClip.end.seconds);
		                //CHANGE TO COPY IN THE FUTURE TO SAVE IMPORT TIME
						//inserts motion graphics
		                activeSeq.importMGT(localPath,lastClip.end.seconds,6,6);
		                activeSeq.importMGT(offCircle,lastClip.end.seconds,7,7);
						//inserts beeps
		                audioTrack.insertClip(audioClip2, lastClip.end.seconds);
		                for (j = 0; j < beeper; j ++){
		                    audioTrack.insertClip(audioClip, lastClip.end.seconds - (1 + j) );
		                }
						//binary tracking
		                switchingVal = true;
						//for scenarios with breaks between rounds
		                if (roundBreakTime != 0){
		                	roundCounter++;
		            	}
		        	}

					//for scenarios with breaks between rounds
		            else if (roundBreakTime != 0) {
		            	activeSeq.importMGT(localPathLAST,lastClip.end.seconds,8,8);
		            	clip.setInPoint(myTime.ticks,4);
		            	//rest interval
		            	myTime.seconds += roundBreakTime;
		            	clip.setOutPoint(myTime.ticks,4);
		            	track.insertClip(clip, lastClip.end.seconds);

		            	//CHANGE TO COPY IN THE FUTURE TO SAVE IMPORT TIME
		            	activeSeq.importMGT(localPath,lastClip.end.seconds,6,6);
		            	activeSeq.importMGT(roundBreakCircle,lastClip.end.seconds,7,7);

		            	audioTrack.insertClip(audioClip2, lastClip.end.seconds);
		            	for (j = 0; j < beeper; j ++){
		            	    audioTrack.insertClip(audioClip, lastClip.end.seconds - (1 + j) );
		            	}
		            	switchingVal = true;
		            	roundCounter = 0;
		            }
		        }  
			}

			//first clip
		    else {
				//inserts clip
		        clip.setInPoint(myTime.ticks,4);
		        myTime.seconds += num3;
		        clip.setOutPoint(myTime.ticks,4);
		        track.insertClip(clip,0);
				//inserts motion graphics
		        activeSeq.importMGT(localPath,0,6,6);
		        activeSeq.importMGT(onCircle,0,7,7);
				//binary tracker
		        switchingVal = false;
		    }
		        

		}


	},

	searchProjectForItemByName: function(i, containingBin, nameToFind) {

    var itemFound = false

        for (var j = i; j < containingBin.children.numItems; j++) {
            var currentChild = containingBin.children[j];
            //Non fuctioning recursion (5/25/21)
			if (currentChild.type === ProjectItemType.BIN) {
                // alert("Searching Bin: '" + String(currentChild.name) +"''")
				// return searchBinForProjItemByName(j, currentChild, nameToFind); // warning; recursion!
			}

			else if (currentChild.name === nameToFind){
				alert('index [ '+String(j)+' ]')
                itemFound = true
				return;
			}

		}

		if (!itemFound){
			alert("The item was not found in bin:" + String(containingBin.name));
			return itemFound;
		}
}

}