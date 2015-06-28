'use strict';

/**
 * SL-chrome
 *
 * @author  Koki Takahashi (hakatashi)
 * @license MIT
 *
 * This program is a derived work from 'SL', originally created by Toyoda Masashi.
 * Copyright 1993,1998,2014 Toyoda Masashi (mtoyoda@acm.org)
 * https://github.com/mtoyoda/sl
 */

var SL = {
  body: [
    '      ====        ________                ___________ ',
    '  _D _|  |_______/        \\__I_I_____===__|_________| ',
    '   |(_)---  |   H\\________/ |   |        =|___ ___|   ',
    '   /     |  |   H  |  |     |   |         ||_| |_||   ',
    '  |      |  |   H  |__--------------------| [___] |   ',
    '  | ________|___H__/__|_____/[][]~\\_______|       |   ',
    '  |/ |   |-----------I_____I [][] []  D   |=======|__ ',
  ],
  wheels: [
    [
      '__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__ ',
      ' |/-=|___|=    ||    ||    ||    |_____/~\\___/        ',
      '  \\_/      \\O=====O=====O=====O_/      \\_/            ',
    ],
    [
      '__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__ ',
      ' |/-=|___|=O=====O=====O=====O   |_____/~\\___/        ',
      '  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/            ',
    ],
    [
      '__/ =| o |=-O=====O=====O=====O \\ ____Y___________|__ ',
      ' |/-=|___|=    ||    ||    ||    |_____/~\\___/        ',
      '  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/            ',
    ],
    [
      '__/ =| o |=-~O=====O=====O=====O\\ ____Y___________|__ ',
      ' |/-=|___|=    ||    ||    ||    |_____/~\\___/        ',
      '  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/            ',
    ],
    [
      '__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__ ',
      ' |/-=|___|=   O=====O=====O=====O|_____/~\\___/        ',
      '  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/            ',
    ],
    [
      '__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__ ',
      ' |/-=|___|=    ||    ||    ||    |_____/~\\___/        ',
      '  \\_/      \\_O=====O=====O=====O/      \\_/            ',
    ],
  ],
};

// Run SL, run!
function runSL(options) {
  // Setup SL element
  var el = document.createElement('pre');
  el.style.position = 'fixed';
  el.style.left = 0;
  el.style.top = 0;
  el.style.background = 'black';
  el.style.color = 'white';
  el.style.lineHeight = '1em';
  el.style.font = 'bold 18px monospace';
  el.style.zIndex = 10000;

  // Setup SL content
  el.textContent = SL.body.concat(SL.wheels[0]).join('\n');

  // Prepend to body
  document.body.insertBefore(el, document.body.firstChild);

  return options;
}

// Listen for SL request from omnibox
chrome.runtime.onMessage.addListener(function (request) {
  if (request.mode === 'run') {
    runSL(request.options);
  }
});
