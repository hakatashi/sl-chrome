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
      '  \\_/      \\_O=====O=====O=====O/      \\_/            ',
    ],
    [
      '__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__ ',
      ' |/-=|___|=   O=====O=====O=====O|_____/~\\___/        ',
      '  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/            ',
    ],
    [
      '__/ =| o |=-~O=====O=====O=====O\\ ____Y___________|__ ',
      ' |/-=|___|=    ||    ||    ||    |_____/~\\___/        ',
      '  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/            ',
    ],
    [
      '__/ =| o |=-O=====O=====O=====O \\ ____Y___________|__ ',
      ' |/-=|___|=    ||    ||    ||    |_____/~\\___/        ',
      '  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/            ',
    ],
    [
      '__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__ ',
      ' |/-=|___|=O=====O=====O=====O   |_____/~\\___/        ',
      '  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/            ',
    ],
    [
      '__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__ ',
      ' |/-=|___|=    ||    ||    ||    |_____/~\\___/        ',
      '  \\_/      \\O=====O=====O=====O_/      \\_/            ',
    ],
  ],
  status: 'garaged',
  element: null,
  speed: 10,
  fps: 30,
  frames: 0,
};

// Run SL, run!
function runSL(options) {
  // Setup SL element
  SL.element = document.createElement('pre');
  SL.element.style.position = 'fixed';
  SL.element.style.left = '100%';
  SL.element.style.top = '30%';
  SL.element.style.background = '#333';
  SL.element.style.color = 'white';
  SL.element.style.lineHeight = '1em';
  SL.element.style.font = 'bold 18px monospace';
  SL.element.style.padding = '30px';
  SL.element.style.borderRadius = '5px';
  SL.element.style.zIndex = 10000; // Boo...

  // Setup SL content
  SL.element.textContent = SL.body.concat(SL.wheels[0]).join('\n');

  // Prepend to body
  document.body.insertBefore(SL.element, document.body.firstChild);

  SL.status = 'running';
  SL.frames = 0;

  // Trigger moving SL
  moveSL();

  return options;
}

function moveSL() {
  var left = parseFloat(getComputedStyle(SL.element).left);
  var width = parseFloat(getComputedStyle(SL.element).width);

  if (left > -width) {
    SL.frames++;

    SL.element.style.left = (left - SL.speed) + 'px';
    SL.element.textContent = SL.body.concat(SL.wheels[Math.floor(SL.frames) % 6]).join('\n');

    setTimeout(moveSL, 1000 / SL.fps);
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
