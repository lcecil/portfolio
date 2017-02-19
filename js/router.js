(function () {
  'use strict';

  var Router = {
    template: null,
    init: function (data, route) {
      this.template = _.template($('.panel-template').html());
      console.log(route);
    },
    getPanelContent: function (route) {
      var templateEl = $('.panel-template[data-route="' + route + '"]');

      if (templateEl.length) {
        return templateEl.html();
      } else {
        // Default route, home
        return $('.panel-template[data-route="/home"]').html();
      }
    },
    getPageContent: function (route) {
      var templateEl = $('.page-template[data-route="' + route + '"]');

      if (templateEl.length) {
        return templateEl.html();
      } else {
        // Default route, home
        return '';
      }
    }
  };

  // expose as global
  window.Router = Router;
})();
