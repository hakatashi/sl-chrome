'use strict';

// Run SL, run!
function runSL(options) {
  return options;
}

// Listen for SL request from omnibox
chrome.runtime.onMessage.addListener(function (request) {
  if (request.mode === 'run') {
    runSL(request.options);
  }
});
