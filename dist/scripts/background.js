"use strict";chrome.runtime.onInstalled.addListener(function(o){console.log("previousVersion",o.previousVersion)}),chrome.browserAction.setBadgeText({text:"'Allo"}),console.log("'Allo 'Allo! Event Page for Browser Action"),chrome.runtime.onMessage.addListener(function(o,e,r){o.repo&&r({star:localStorage[o.repo+"/star"],fork:localStorage[o.repo+"/fork"]})});
//# sourceMappingURL=background.js.map
