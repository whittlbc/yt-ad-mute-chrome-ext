chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
	if (changeInfo.status === 'complete') {
	  chrome.tabs.get(tabId, function(tab){
			if (tab.url.match(/https:\/\/www.youtube.com\/watch/)) {
			  chrome.tabs.sendMessage(tabId, { message: 'execScript' }, function() {});
			}		
	  });
	}
});