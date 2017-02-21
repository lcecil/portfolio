(function () {
  'use strict';

  var Router = {
    template: null,
    templateData: {},
    init: function (data) {
      this.template = _.template($('.panel-template[data-route="/home"]').html());
      this.templateData = data;
    },
    getPanelContent: function (route) {
      //this only works for /home because that data route is declared in the home template
      //TODO need to disambiguate between everything else that is '.../' and ''.../details'
      
      this.template = _.template($('.panel-template[data-route="' + route + '"]').html());
      var routeData = this.templateData[route];
      return this.template(routeData);
    },
    getPageContent: function (route) {
      this.template = _.template($('.page-template').html());
      var routeData = this.templateData[route];
      return this.template(routeData);
    }
  };

  // expose as global
  window.Router = Router;
})();

// $('.panel-template[data-route="' + route + '"]');
