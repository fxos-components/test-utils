/*global sinon, assert, suite, setup, teardown, test */
suite('test-utils', function() {
  'use strict';

  var utils = window['test-utils'];

  setup(function() {
    this.sinon = sinon.sandbox.create();
    this.dom = document.createElement('div');
    document.body.appendChild(this.dom);
  });

  teardown(function() {
    this.sinon.restore();
  });

  test('accessibility', function(done) {
    var accessibility = utils.accessibility;
    assert.ok(accessibility);
    assert.ok(accessibility.check);
    accessibility.check(this.dom).then(done, done);
    accessibility.check(this.dom, {
      rules: {
        'color-contrast': { enabled: false }
      }
    }).then(done, done);
  });

  test('afterNext', function(done) {
    var obj = {
      test: function() {
        assert.ok(true, 'obj.test is called');
        return true;
      }
    };

    utils.afterNext(obj, 'test')
      .then(result => assert.ok(result))
      .then(done, done);
    setTimeout(() => obj.test(), 1);
  });

  test('touch', function(done) {
    var type = 'touchstart', x = 1, y = 2;

    this.dom.addEventListener('touchstart', event => {
      assert.equal(event.type, type);
      assert.ok(event.timeStamp);
      assert.isTrue(event.bubbles);
      assert.isTrue(event.cancelable);
      assert.equal(event.touches.length, 1);

      var touch = event.touches[0];
      assert.equal(touch.pageX, x);
      assert.equal(touch.pageY, y);
      done();
    });
    utils.touch(this.dom, type, x, y);
  });
});
