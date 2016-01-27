'use strict';

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.repo) {
      sendResponse({
        star: localStorage.getItem(`${request.repo}/star`),
        fork: localStorage.getItem(`${request.repo}/fork`),
      });
    }
    if (request.update) {
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { update: true }, (response) => {});
      });
    }
  }
);
