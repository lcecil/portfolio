(function () {

  var Animation = {
      step: function (delay, handler) {
          return {
              delay: delay,
              handler: handler
          };
      },
      create: function (steps) {
          _.each(steps, function (step) {
             _.delay(step.handler, step.delay);
          });
      }
    };

  window.Animation = Animation;
})();
