'use strict';

var availableOptions = {
  a: 'accident',
  F: 'fly',
  l: 'long',
};

// Listen omnibox enter and send SL request to content script
chrome.omnibox.onInputEntered.addListener(function (text) {
  var options = {};

  // Initialize options
  Object.keys(availableOptions).forEach(function (abbr) {
    options[availableOptions[abbr]] = false;
  });

  // Parse options
  text.split(' ').forEach(function (argument) {
    // Parse full option names
    if (argument.slice(0, 2) === '--') {
      options[argument.slice(2)] = true;
    } else {
      // Parse abbr option names
      argument.split('').forEach(function (character) {
        if (availableOptions[character]) {
          options[availableOptions[character]] = true;
        }
      });
    }
  });

  // Send message to current tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {mode: 'run', text: text, options: options});
  });
});
