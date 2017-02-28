(function () {
  'use strict';

  // Purpose!
  // 1. create state object from url
  // 2. emit event with state upon change

  var State = function (data) {
    return _.extend(data, {
      url: location.hash,
      isShowingDetails: location.hash.indexOf('details') > 0
    });
  };

  var Router = {
    //template: null,
    // prev: null,
    // next: null,
    //keys: null,
    // currentRoute: null,
    data: {},
    keys: [],
    listeners: [],

    init: function (data) {
      // this.halfPanelTemplate = _.template($('#half-panel-template').html());
      // this.fullPanelTemplate = _.template($('#full-panel-template').html());
      // this.pageTemplate = _.template($('#page-template').html());
      // this.tileTemplate = _.template($('#tile-template').html());
      this.data = data;
      this.keys = Object.keys(this.data);
      //this.currentRoute = '/home';
      this.setHashListener();
    },

    onChange: function (listener) {
      listeners.push(listener);
    },

    setHashListener: function () {
      $(window).on('hashchange', _.bind(function () {
        var hash = location.hash;
        var route = this.getRoute(hash);
        var state = this.buildState(route);

        _.each(this.listeners, function (listener) {
          listener(state);
        });
      }, this));
    },

    buildState: function (route) {
      var baseRoute = this.getBaseRoute(route);

      return new State({
        templateData: this.data[baseRoute]
      });
    },

    // render: function (route) {
    //   if (route === this.currentRoute) {
    //     return;
    //   }
    //
    //   //var isFullPage = this.currentRoute.indexOf('details');
    //   //var isSameBaseRoute = this.getBaseRoute(route) === this.getBaseRoute(this.currentRoute);
    //
    //   // totally the same -- return, do nothing
    //   // same base, full -> half
    //   // same base, half -> full
    //   // totally different, fully re-render
    //
    //   if (this.currentRoute.indexOf('details')) {
    //     //
    //   } else {
    //     //
    //   }
    // },
    // getRouteData: function (route) {
    //   return this.templateData;
    // },



    //Old Router Stuff
    getRoute: function (hash) {
      return hash.replace('#', '');
    },
    getBaseRoute: function (route) {
      var base = route.match(/\/[a-z-]+/ig)[0];
      return base ? base : '/home';
    },

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

    // getPanelContent: function (route) {
    //   var baseRoute = this.getBaseRoute(route);
    //   var routeData = this.templateData[baseRoute];
    //   if (route.indexOf('details') > 0) {
    //     return this.fullPanelTemplate(routeData.details);
    //   } else {
    //     var routeData = this.templateData[baseRoute];
    //     return this.halfPanelTemplate(routeData);
    //   }
    // },
    // getPageContent: function (route) {
    //   var baseRoute = this.getBaseRoute(route);
    //   var routeData = this.templateData[baseRoute].details;
    //   return this.pageTemplate(routeData);
    // },
    getTileContent: function (route) {
      var prevData = this.getPrevious(route).panel;
      var nextData = this.getNext(route).panel;

      var routeData = {prevData:prevData, nextData:nextData};
      return this.tileTemplate(routeData);
    }
  };

  // expose as global
  window.Router = Router;
})();
