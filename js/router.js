(function () {
  'use strict';

  var Router = {
    template: null,
    prev: null,
    next: null,
    keys: null,
    currentRoute: null,
    templateData: {},
    init: function (data) {
      this.halfPanelTemplate = _.template($('#half-panel-template').html());
      this.fullPanelTemplate = _.template($('#full-panel-template').html());
      this.pageTemplate = _.template($('#page-template').html());
      this.tileTemplate = _.template($('#tile-template').html());
      this.templateData = data;
      this.keys = Object.keys(this.templateData);
      this.currentRoute = '/home';
    },
    render: function (route) {
      if (route === this.currentRoute) {
        return;
      }

      //var isFullPage = this.currentRoute.indexOf('details');
      //var isSameBaseRoute = this.getBaseRoute(route) === this.getBaseRoute(this.currentRoute);

      // totally the same -- return, do nothing
      // same base, full -> half
      // same base, half -> full
      // totally different, fully re-render

      if (this.currentRoute.indexOf('details')) {
        //
      } else {
        //
      }
    },
    getBaseRoute: function (route) {
      var route = route.match(/\/[a-z-]+/ig)[0];
      return route ? route : '/home';
    },
    getPrevious: function (route) {
      var baseRoute = this.getBaseRoute(route);
      var i = this.keys.indexOf(baseRoute);

      if (i === 0) {
        this.prev = this.templateData[this.keys[this.keys.length - 1]];
      } else {
        this.prev = this.templateData[this.keys[i-1]];
      }
      return this.prev;
    },
    getNext: function (route) {
      var baseRoute = this.getBaseRoute(route);
      var i = this.keys.indexOf(baseRoute);

      if (i === (this.keys.length - 1)) {
        this.next = this.templateData[this.keys[0]];
      } else {
        this.next = this.templateData[this.keys[i+1]];
      }

      return this.next;
    },
    getPanelContent: function (route) {
      var baseRoute = this.getBaseRoute(route);
      var routeData = this.templateData[baseRoute];
      if (route.indexOf('details') > 0) {
        return this.fullPanelTemplate(routeData.details);
      } else {
              var routeData = this.templateData[baseRoute];
        return this.halfPanelTemplate(routeData);
      }
    },
    getPageContent: function (route) {
      var baseRoute = this.getBaseRoute(route);
      var routeData = this.templateData[baseRoute].details;
      return this.pageTemplate(routeData);
    },
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
