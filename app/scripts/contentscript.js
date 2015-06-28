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
  smokes: [
    [
      '                      (@@) (  ) (@)  ( )  @@    ()    @     O     @     O      @',
      '                 (   )                                                          ',
      '             (@@@@)                                                             ',
      '          (    )                                                                ',
      '                                                                                ',
      '        (@@@)                                                                   ',
    ],
    [
      '                      (  ) (@@) ( )  (@)  ()    @@    O     @     O     @      O',
      '                 (@@@)                                                          ',
      '             (    )                                                             ',
      '          (@@@@)                                                                ',
      '                                                                                ',
      '        (   )                                                                   ',
    ]
  ],
  coal: [
    '                              ',
    '                              ',
    '    _________________         ',
    '   _|                \\_____A  ',
    ' =|                        |  ',
    ' -|                        |  ',
    '__|________________________|_ ',
    '|__________________________|_ ',
    '   |_D__D__D_|  |_D__D__D_|   ',
    '    \\_/   \\_/    \\_/   \\_/    ',
  ],
  men: [
    [
      '',
      '(O)',
    ],
    [
      'Help!',
      '\\O/',
    ],
  ],
  status: 'garaged',
  element: null,
  speed: 10,
  fps: 30,
  frames: 0,
  options: {},
};

// Run SL, run!
function runSL(options) {
  // Setup SL element
  SL.element = document.createElement('pre');
  SL.element.style.position = 'fixed';
  if (!options.reverse) {
    SL.element.style.left = '100%';
  } else {
    SL.element.style.right = '100%';
  }
  SL.element.style.top = options.fly ? '60%' : '30%';
  SL.element.style.background = '#333';
  SL.element.style.color = 'white';
  SL.element.style.lineHeight = '1em';
  SL.element.style.font = 'bold 18px monospace';
  SL.element.style.padding = '30px';
  SL.element.style.borderRadius = '5px';
  SL.element.style.textAlign = 'left';
  SL.element.style.zIndex = 10000; // Boo...

  // Setup SL content
  SL.element.textContent = SL.smokes[0].concat(SL.body.concat(SL.wheels[0])).join('\n');

  // Prepend to body
  document.body.insertBefore(SL.element, document.body.firstChild);

  SL.options = options;
  SL.status = 'running';
  SL.frames = 0;

  // Trigger moving SL
  moveSL();

  return options;
}

function moveSL() {
  var computedStyle = getComputedStyle(SL.element);
  var left = parseFloat(computedStyle.left);
  var right = parseFloat(computedStyle.right);
  var top = parseFloat(computedStyle.top);
  var width = parseFloat(computedStyle.width);

  var distance = SL.options.reverse ? right : left;

  if (distance > -width) {
    SL.frames++;

    // Move SL
    if (!SL.options.reverse) {
      SL.element.style.left = (left - SL.speed) + 'px';
    } else {
      SL.element.style.right = (right - SL.speed) + 'px';
    }
    if (SL.options.fly) {
      SL.element.style.top = (top - SL.speed / 4) + 'px';
    }

    // Compute SL text
    var smoke = SL.smokes[Math.floor(SL.frames / 6) % 2];
    var wheel = SL.wheels[SL.frames % 6];

    // Concat coal
    var coaledBody = SL.body.concat(wheel).map(function (line, index) {
      return line + SL.coal[index];
    });

    if (SL.options.accident) {
      // Take men in
      [{x: 43, y: 3}, {x: 47, y: 3}].forEach(function (position, index) {
        var status = (Math.floor((SL.frames - index * 10) / 15) % 2 + 2) % 2;
        SL.men[status].forEach(function (line, y) {
          y += position.y;
          coaledBody[y] = coaledBody[y].slice(0, position.x) + line + coaledBody[y].slice(position.x + line.length);
        });
      });
    }

    // Join smoke and body
    SL.element.textContent = smoke.concat(coaledBody).join('\n');

    // Reverse it
    if (SL.options.reverse) {
      SL.element.textContent = SL.element.textContent.split('\n').map(function (line) {
        return line.split('').reverse().join('').replace(/[\\/()]/g, function (match) {
          return {
            '\\': '/',
            '/': '\\',
            '(': ')',
            ')': '(',
          }[match];
        });
      }).join('\n');
    }

    // Next tick
    setTimeout(moveSL, 1000 / SL.fps);
  } else {
    // If SL passed over, remove it
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
