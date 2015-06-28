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
  status: 'garaged',
  element: null,
  speed: 10,
  fps: 10,
};

// Run SL, run!
function runSL(options) {
  // Setup SL element
  SL.element = document.createElement('pre');
  SL.element.style.position = 'fixed';
  SL.element.style.left = '100%';
  SL.element.style.top = 0;
  SL.element.style.background = 'white';
  SL.element.style.color = 'black';
  SL.element.style.lineHeight = '1em';
  SL.element.style.font = 'bold 18px monospace';
  SL.element.style.zIndex = 10000; // Boo...

  // Setup SL content
  SL.element.textContent = SL.body.concat(SL.wheels[0]).join('\n');

  // Prepend to body
  document.body.insertBefore(SL.element, document.body.firstChild);

  SL.status = 'running';

  // Trigger moving SL
  moveSL();

  return options;
}

function moveSL() {
  var left = parseFloat(getComputedStyle(SL.element).left);
  var width = parseFloat(getComputedStyle(SL.element).width);

  if (left > -width) {
    SL.element.style.left = (left - SL.speed) + 'px';
    setTimeout(moveSL, 1 / SL.fps);
  } else {
    SL.element.parentNode.removeChild(SL.element);
    SL.status = 'garaged';
  }
}

// Listen for SL request from omnibox
chrome.runtime.onMessage.addListener(function (request) {
  if (request.mode === 'run' && SL.status === 'garaged') {
    runSL(request.options);
  }
});
