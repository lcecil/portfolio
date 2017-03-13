(function () {

  var Animate = function (steps, duration) {
    duration = duration || 0;
    steps = _.defaults(steps, {
      begin: _.noop(),
      middle: _.noop(),
      end: _.noop()
    });

    steps.begin();
    _.delay(steps.middle, duration/2);

    _.delay(steps.end, duration);
  };

  window.Animate = Animate;
})();
