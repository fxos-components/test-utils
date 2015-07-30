/* globals define */
(function(define){'use strict';define(function(require,exports,module){

  var utils = {
    afterNext: function afterNext(obj, method) {
      var wait = 100;
      var timeout;

      return new Promise((resolve, reject) => {
        var real = obj[method];

        // If the function doesn't run
        // after `wait` period: reject.
        timeout = setTimeout(() => {
          obj[method] = real;
          reject(new Error('timeout exceeded'));
        }, wait);

        obj[method] = function() {
          clearTimeout(timeout);
          obj[method] = real; // restore asap
          var result = real.apply(obj, arguments);
          resolve(result);
          return result;
        };
      });
    },

    touch: function touch(el, type, x, y) {
      var touchObj = document.createTouch(
        window,
        el,
        0,
        x || 0,
        y || 0);

      var touchList = document.createTouchList([touchObj]);
      var event = document.createEvent('TouchEvent');

      event.initTouchEvent(
        type, // type
        true, // bubbles
        true, // cancelable
        window, // view
        null, // detail
        false, // ctrlKey
        false, // altKey
        false, // shiftKey
        false, // metaKey
        touchList, // touches
        touchList, // targetTouches
        touchList); // changedTouches

      // Set the timestamp to be sure
      Object.defineProperty(event, 'timeStamp', { value: Date.now() });

      el.dispatchEvent(event);
    }
  };

  module.exports = utils;

});})(typeof define=='function'&&define.amd?define
:(function(n,w){'use strict';return typeof module=='object'?function(c){
c(require,exports,module);}:function(c){var m={exports:{}};c(function(n){
return w[n];},m.exports,m);w[n]=m.exports;};})('test-utils',this));
