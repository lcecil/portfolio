(function () {

  var ScrollManager = {
    listeners: [],
    lastEvent: null,
    isIncreasing: false,

    // @access pubic
    onScroll: function (listener) {
      if (this.listeners.length > 0) {
        this.listeners.push(listener);
      } else {
        this._setFirstListener(listener);
      }
    },

    // @access private
    _setFirstListener: function (listener) {
      var throttleDelay = 100; // ms
      this.listeners.push(listener);
      $(window).on('wheel', _.throttle(
        _.bind(this._onScroll, this), throttleDelay));
    },

    // @access private
    _triggerListeners: function (scrollDelta) {
      var scrollDirection = this._getDirection(scrollDelta);
      _.each(this.listeners, function (listener) {
        listener(scrollDirection);
      });
    },

    _getDirection: function (delta) {
      return delta > 0 ? 1 : -1;
    },

    // @access private
    _onScroll: function (e) {
      var event = e.originalEvent;

      if (_.isNull(this.lastEvent)) {
        this._triggerListeners(event.deltaY);
        isIncreasing = true;
      } else {
        var isGreaterVelocity = Math.abs(event.deltaY) > Math.abs(this.lastEvent.deltaY);

        if (isGreaterVelocity && !isIncreasing) {
          this._triggerListeners(event.deltaY);
        }

        isIncreasing = isGreaterVelocity;
      }

      this.lastEvent = event;
    }
  };

  window.ScrollManager = ScrollManager;

})();
