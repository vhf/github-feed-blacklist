"use strict";chrome.runtime.onMessage.addListener(function(e,t,r){e.repo&&r({star:localStorage.getItem(e.repo+"/star"),fork:localStorage.getItem(e.repo+"/fork")}),e.update&&chrome.tabs.query({active:!0,currentWindow:!0},function(e){chrome.tabs.sendMessage(e[0].id,{update:!0},function(){})})});
//# sourceMappingURL=background.js.map
