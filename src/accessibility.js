/* globals define */
(function(define){'use strict';define(function(require,exports,module){

  /**
   * Dependencies
   */
  var axe = require('axe');
  var sinon = require('sinon');
  var utils = require('test-utils');

  utils.accessibility = {
    check: function accessibility_check(container) {
      var a11yCheck = new Promise((resolve) => {
        axe.a11yCheck(container, resolve);
      });

      return a11yCheck.then(results => {
        if (results.violations.length > 0) {
          results.violations.forEach(violation => sinon.assert.fail([
            violation.discription,
            violation.nodes.reduce(
              (str, node) => str + node.target.join(' '), ''),
            violation.help].filter(str => !!str).join(' : ')));
        }
      });
    }
  };

});})(typeof define=='function'&&define.amd?define
:(function(n,w){'use strict';return typeof module=='object'?function(c){
c(require,exports,module);}:function(c){var m={exports:{}};c(function(n){
return w[n];},m.exports,m);w[n]=m.exports;};})('accessibility',this));
