'use strict';

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    const repo = request.repo;
    if (repo) {
      sendResponse({
        star: localStorage.getItem(`${repo}/star`),
        fork: localStorage.getItem(`${repo}/fork`),
        issue_open: localStorage.getItem(`${repo}/issue_open`),
        issue_com: localStorage.getItem(`${repo}/issue_com`),
        issue_close: localStorage.getItem(`${repo}/issue_close`),
        wiki: localStorage.getItem(`${repo}/wiki`),
        commit: localStorage.getItem(`${repo}/commit`),
      });
    }
    if (request.update) {
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { update: true }, () => {});
      });
    }
  }
);
