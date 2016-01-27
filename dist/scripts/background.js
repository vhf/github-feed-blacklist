"use strict";chrome.runtime.onMessage.addListener(function(e,r,t){e.repo&&t({star:localStorage.getItem(e.repo+"/star"),fork:localStorage.getItem(e.repo+"/fork")})});
//# sourceMappingURL=background.js.map
