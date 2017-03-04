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
      var previousRoute = this.getPreviousRoute(route);
      var nextRoute = this.getNextRoute(route);

      return new State({
        route: route,
        previousRoute: previousRoute,
        nextRoute: nextRoute,
        currentTemplateData: this.data[baseRoute],
        previousTemplateData: this.data[previousRoute],
        nextTemplateData: this.data[nextRoute]
      });
    },

    getRoute: function (hash) {
      var route = hash.replace('#', '');
      if (route.length === 0 || route === '/') {
        return '/home';
      } else {
        return route;
      }
    },

    getPreviousRoute: function (route) {
      var currentRoute = this.getBaseRoute(route);
      var previousRoute;
      var i = this.keys.indexOf(currentRoute);

      if (i === 0) {
        previousRoute = this.keys[this.keys.length - 1];
      } else {
        previousRoute = this.keys[i-1];
      }
      return previousRoute;
    },

    getNextRoute: function (route) {
      var currentRoute = this.getBaseRoute(route);
      var nextRoute;
      var i = this.keys.indexOf(currentRoute);

      if (i === (this.keys.length - 1)) {
        nextRoute = this.keys[0];
      } else {
        nextRoute = this.keys[i+1];
      }

      return nextRoute;
    },

    getBaseRoute: function (route) {
      var base = route.match(/\/[a-z-]+/ig)[0];
      return base ? base : '/home';
    }
  };

  window.Router = Router;
})();
