'use strict';

chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion);
});

chrome.browserAction.setBadgeText({text: '\'Allo'});

console.log('\'Allo \'Allo! Event Page for Browser Action');

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.repo) {
      sendResponse({
        star: localStorage[request.repo + '/star'],
        fork: localStorage[request.repo + '/fork'],
      });
    }
  }
);
