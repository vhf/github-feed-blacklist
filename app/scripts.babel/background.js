'use strict';

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.repo) {
      sendResponse({
        star: localStorage.getItem(`${request.repo}/star`),
        fork: localStorage.getItem(`${request.repo}/fork`),
      });
    }
  }
);
