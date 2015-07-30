/*global sinon, assert, suite, setup, teardown, test */
suite('test-utils', function() {
  'use strict';

  setup(function() {
    this.sinon = sinon.sandbox.create();
    this.dom = document.createElement('div');
    document.body.appendChild(this.dom);
  });

  teardown(function() {
    this.sinon.restore();
  });

  test('accessibility is present and runs without errors', function(done) {
    var accessibility = window.accessibility;
    assert.ok(accessibility);
    assert.ok(accessibility.check);
    accessibility.check(this.dom).then(done, done);
  });
});
