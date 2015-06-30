/* global describe, it */

(function () {
  'use strict';

  describe('Basic Test', function () {
    it('should run SL (without any global leaks)', function () {
      chrome.runtime.onMessage.trigger({mode: 'run', options: {}});
    });
  });
})();
