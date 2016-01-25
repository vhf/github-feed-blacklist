'use strict';

const feedSize = 30;

const loadNextPage = () => {
  const button = document.querySelector('.news > form > button');
  if (button) {
    button.click();
    return true;
  }
  return false;
};

const feedCleaning = () => {
  const lines = document.querySelectorAll('.news > .alert:not(.clean)'); // only clean new els
  Array.prototype.forEach.call(lines, (line) => {
    const classes = line.classList;
    const repo = line.querySelectorAll('.title > a')[1].text;

    chrome.runtime.sendMessage({ repo }, (response) => {
      if (line.parentNode) { // ugly hack?
        let removed = false;
        if (response.star && classes.contains('watch_started')) {
          line.parentNode.removeChild(line);
          removed = true;
        }

        if (!removed) {
          if (response.fork && classes.contains('fork')) {
            line.parentNode.removeChild(line);
          } else {
            line.classList.add('clean'); // mark line as clean
          }
        }
      }
    });
  });

  const remaining = document.querySelectorAll('.news > .alert').length;
  return remaining;
};

const observer = new MutationObserver(() => {
  if (feedCleaning() < feedSize) {
    loadNextPage();
  }
});

observer.observe(document.querySelector('.news'), { childList: true });

// Start !
loadNextPage();
