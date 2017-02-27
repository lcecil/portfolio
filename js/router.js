(function () {
  'use strict';

  var Router = {
    template: null,
    templateData: {},
    init: function (data) {
      this.halfPanelTemplate = _.template($('#half-panel-template').html());
      this.fullPanelTemplate = _.template($('#full-panel-template').html());
      this.pageTemplate = _.template($('#page-template').html());
      this.tileTemplate = _.template($('#tile-template').html());
      this.templateData = data;
    },
    getBaseRoute: function (route) {
      var route = route.match(/\/[a-z-]+/ig)[0];
      return route ? route : '/home';
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
      var prev;
      var next;
      var baseRoute = this.getBaseRoute(route);
      var keys = Object.keys(this.templateData);
      var i = keys.indexOf(baseRoute);
      if (i === 0) {
        prev = this.templateData[keys[keys.length - 1]].panel;
        next = this.templateData[keys[i+1]].panel;
      } else if (i === (keys.length - 1)) {
        prev = this.templateData[keys[i-1]].panel;
        next = this.templateData[keys[0]].panel;
      } else {
        prev = this.templateData[keys[i-1]].panel;
        next = this.templateData[keys[i+1]].panel;
      }
      var routeData = {prev, next};
      console.log(routeData);
      return this.tileTemplate(routeData);
    }
  };

  // expose as global
  window.Router = Router;
})();
