var adExists = false;

function checkForAd () {
	var $volumeBtn = $('button.ytp-mute-button');
	
	// if ad exists
	if ($('.videoAdUi').length > 0) {

		if (!adExists) {
			adExists = true;
			console.log('AD EXISTS');
			// mute the ad
			$volumeBtn.click();
		}

		var $skipAdBtn = $('button.videoAdUiSkipButton');
		// if "Skip Ad" button exists, click it		
		if ($skipAdBtn.length > 0) {
			// skip the ad
			$skipAdBtn.click();
			// unmute the volume
			$volumeBtn.click();
			return;
		}

		// check again
		setTimeout(function(){
			checkForAd();
		}, 300);

	} else {
		console.log('NO AD');
		// if the ad existed at some point, unmute
		if (adExists) {
			$volumeBtn.click();
			// reset adExists
			adExists = false;
		}
	}
}

function getVolumeBtn () {
	if ($('button.ytp-mute-button').length > 0 && $('.ad-container').length > 0) {
		console.log('CHECK FOR AD');
		checkForAd();
	} else {
		setTimeout(function(){
			getVolumeBtn();
		}, 50);
	}
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.message === 'execScript') {
		sendResponse({message: 'running script'});
		setTimeout(function(){
			getVolumeBtn();
		}, 750);
	}
});
