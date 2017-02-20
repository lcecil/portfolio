(function () {
  'use strict';

  var Router = {
    template: null,
    init: function () {
      this.template = _.template($('.panel-template').html());
    },
    getPanelContent: function (route) {
      var templateEl = $('.panel-template');
      if (templateEl.length) {
        return templateEl.html();
      } else {
        // Default route, home
        return $('.panel-template[data-route="/home"]').html();
      }
    },
    getPageContent: function (route) {
      var templateEl = $('.page-template');
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
