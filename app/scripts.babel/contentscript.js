'use strict';

const feedSize = 50;

const loadNextPage = () => {
  const button = document.querySelector('.news > form > button');
  if (button) {
    button.click();
    return true;
  }
  return false;
};

const feedCleaning = () => {
  const lines = document.querySelectorAll('.news > .alert');
  Array.prototype.forEach.call(lines, (line) => {
    const classes = line.classList;
    const repo = line.querySelectorAll('.title > a')[1].text;

    chrome.runtime.sendMessage({ repo }, (response) => {
      if (line.parentNode) {
        if (classes.contains('watch_started')) {
          if (response.star === 'true') {
            line.classList.add('ghff-hide');
          } else {
            line.classList.remove('ghff-hide');
          }
        }
        if (classes.contains('fork')) {
          if (response.fork === 'true') {
            line.classList.add('ghff-hide');
          } else {
            line.classList.remove('ghff-hide');
          }
        }
      }
    });
  });
};

const observer = new MutationObserver(() => {
  feedCleaning();
  if (document.querySelectorAll('.news > .alert:not(.ghff-hide)').length < feedSize) {
    loadNextPage();
  }
});

chrome.runtime.onMessage.addListener(
  (request) => {
    if (request.update) {
      feedCleaning();
    }
  }
);


observer.observe(document.querySelector('.news'), { childList: true });

// Start !
feedCleaning();
loadNextPage();
