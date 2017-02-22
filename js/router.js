(function () {
  'use strict';

  var Router = {
    template: null,
    templateData: {},
    init: function (data) {
      this.halfPanelTemplate = _.template($('#half-panel-template').html());
      this.fullPanelTemplate = _.template($('#full-panel-template').html());
      this.pageTemplate = _.template($('#page-template').html());
      this.templateData = data;
    },
    getPanelContent: function (route) {
      var routeData = this.templateData[route];
      if (route.indexOf('details') > 0) {
        return this.fullPanelTemplate(routeData);
      } else {
        return this.halfPanelTemplate(routeData);
      }
    },
    getPageContent: function (route) {
      var routeData = this.templateData[route];
      return this.pageTemplate(routeData);
    }
  };

  // expose as global
  window.Router = Router;
})();
