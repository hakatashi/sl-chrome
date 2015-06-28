'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

chrome.omnibox.onInputEntered.addListener(function (text) {
  // Send message to current window
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {text: text});
  });
});

console.log('\'Allo \'Allo! Event Page');
