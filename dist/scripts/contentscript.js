"use strict";var feedSize=50,loadNextPage=function(){var e=document.querySelector(".news > form > button");return e?(e.click(),!0):!1},countUpdate=function(){var e=document.getElementById("hideCount");e.textContent=document.getElementsByClassName("ghff-hide").length},feedCleaning=function(){var e=document.querySelectorAll(".news > .alert");Array.prototype.forEach.call(e,function(e){var t=e.classList,s=e.querySelectorAll(".title > a")[1].text,n=s,i=s.indexOf("#");-1!==i&&(n=s.slice(0,i)),chrome.runtime.sendMessage({repo:n},function(s){e.parentNode&&(t.contains("watch_started")&&("true"===s.star?e.classList.add("ghff-hide"):e.classList.remove("ghff-hide")),t.contains("fork")&&("true"===s.fork?e.classList.add("ghff-hide"):e.classList.remove("ghff-hide")),t.contains("issues_opened")&&("true"===s.issue_open?e.classList.add("ghff-hide"):e.classList.remove("ghff-hide")),t.contains("issues_comment")&&("true"===s.issue_com?e.classList.add("ghff-hide"):e.classList.remove("ghff-hide")),t.contains("issues_closed")&&("true"===s.issue_close?e.classList.add("ghff-hide"):e.classList.remove("ghff-hide")),t.contains("gollum")&&("true"===s.wiki?e.classList.add("ghff-hide"):e.classList.remove("ghff-hide")),t.contains("push")&&("true"===s.commit?e.classList.add("ghff-hide"):e.classList.remove("ghff-hide")))})}),countUpdate()},observer=new MutationObserver(function(){feedCleaning(),document.querySelectorAll(".news > .alert:not(.ghff-hide)").length<feedSize&&loadNextPage()});chrome.runtime.onMessage.addListener(function(e){e.update&&feedCleaning()}),observer.observe(document.querySelector(".news"),{childList:!0});var hideCount=document.createElement("label");hideCount.classList.add("filter-label"),hideCount.id="hideCount",hideCount.textContent=0;var insertTarget=document.querySelector(".news .alert");insertTarget.parentElement.insertBefore(hideCount,insertTarget),document.getElementById("hideCount").addEventListener("click",function(){var e=document.getElementsByClassName("ghff-hide");e.length&&e[0].classList.contains("ghff-show")?Array.prototype.forEach.call(e,function(e){e.classList.remove("ghff-show")}):Array.prototype.forEach.call(e,function(e){e.classList.add("ghff-show")})}),feedCleaning(),loadNextPage();
//# sourceMappingURL=contentscript.js.map
