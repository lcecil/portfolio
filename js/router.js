(function () {
  'use strict';

  var Router = {
    template: null,
    init: function () {
      this.template = _.template($('.panel-template').html());
    },
    // compile: function (route) {
    //   var templateData = {
    //     panelContent: this.getPanelContent(route),
    //     pageContent: this.getPageContent(route)
    //   };
    //   return this.template(templateData);
    // },
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
        return $('.page-template[data-route="/home"]').html();
      }
    }
  };

  // expose as global
  window.Router = Router;
})();
