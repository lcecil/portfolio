(function () {

  var KeyDownManager = {
    keys: {
      downKey: 40,
      upKey: 38,
      rightKey: 39,
      leftKey: 37
    },
    disabled: false,
    listeners: {},

    init: function () {
      var masterEventHandler = _.bind(this._masterEventHandler, this);
      $(window).on('keydown', _.throttle(masterEventHandler, 200));
    },

    // @access public
    onKeyDown: function(key, handler) {
      if (_.isUndefined(this.listeners[key])) {
        this.listeners[key] = [];
      }

      this.listeners[key].push(handler);
    },

    // @access private
    _masterEventHandler: function (e) {
      var handlers = this.listeners[e.which] || [];
      var state = Router.getState();

      if (!this.disabled) {
        _.each(handlers, function (handler) {
          handler(e, state);
        });
      }
    }
  };

  window.KeyDownManager = KeyDownManager;

})();
