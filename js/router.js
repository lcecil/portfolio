(function () {
  'use strict';

  var State = function (data) {
    return _.extend(data, {
      url: location.hash,
      isShowingDetails: location.hash.indexOf('details') > 0
    });
  };

  var Router = {
    data: {},
    keys: [],
    listeners: [],

    init: function (data) {
      this.data = data;
      this.keys = Object.keys(this.data);
      this.setHashListener();
    },

    onChange: function (listener) {
      this.listeners.push(listener);
    },

    setHashListener: function () {
      $(window).on('hashchange', _.bind(function () {
        var state = this.getState();

        _.each(this.listeners, function (listener) {
          listener(state);
        });
      }, this));
    },

    getState: function () {
      var hash = location.hash;
      var route = this.getRoute(hash);
      var state = this.buildState(route);
      return state;
    },

    buildState: function (route) {
      var baseRoute = this.getBaseRoute(route);

      return new State({
        templateData: this.data[baseRoute]
      });
    },

    getRoute: function (hash) {
      var route = hash.replace('#', '');
      return route.length > 0 ? route : '/home';
    },
    getBaseRoute: function (route) {
      var base = route.match(/\/[a-z-]+/ig)[0];
      return base ? base : '/home';
    },

    //Old Router Stuff
    getPreviousPageSection: function (route) {
      var baseRoute = this.getBaseRoute(route);
      var i = this.keys.indexOf(baseRoute);

      if (i === 0) {
        this.prev = this.templateData[this.keys[this.keys.length - 1]];
      } else {
        this.prev = this.templateData[this.keys[i-1]];
      }
      return this.prev;
    },

    getNextPageSection: function (route) {
      var baseRoute = this.getBaseRoute(route);
      var i = this.keys.indexOf(baseRoute);

      if (i === (this.keys.length - 1)) {
        this.next = this.templateData[this.keys[0]];
      } else {
        this.next = this.templateData[this.keys[i+1]];
      }

      return this.next;
    },

    getTileContent: function (route) {
      var prevData = this.getPrevious(route).panel;
      var nextData = this.getNext(route).panel;

      var routeData = {prevData:prevData, nextData:nextData};
      return this.tileTemplate(routeData);
    }
  };

  window.Router = Router;
})();
