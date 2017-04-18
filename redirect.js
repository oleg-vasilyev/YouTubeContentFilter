const timeByVideoID = {
	"Lml8vf6Cdzs": "20",
	"aOTVR2YI__g": "20"
}

let lastVideoID = "";
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	if (changeInfo.url) {
		if (changeInfo.url.match(/www.youtube/)) {
			let url = changeInfo.url;
			let matches = /(v=)(.*)|(?=&t)/.exec(url);
			if (matches) {
				let videoID = ~matches[2].indexOf("&") ? /(v=)(.*)(?=&t)/.exec(url)[2] : matches[2];
				let time = timeByVideoID[videoID];
				if (time && (lastVideoID !== videoID)) {
					let updatedURL = `https://www.youtube.com/watch?v=${videoID}&t=${time}s`;
					chrome.tabs.update(tabId, {
						url: updatedURL
					});
					lastVideoID = videoID;
				}
			}
		}
	}
});
