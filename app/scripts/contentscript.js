'use strict';

chrome.runtime.onMessage.addListener(function (request) {
  console.log(request);
});

console.log('\'Allo \'Allo! Content script!');
