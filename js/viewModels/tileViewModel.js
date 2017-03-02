(function () {

  var TileViewModel = ViewModel.extend({

    init: function (el, html) {
      this.el = el;
      this.template = _.template(html);
    },

    render: function (state) {
      var previousTemplateData = Router.getPreviousRoute(state.url);
      var nextTemplateData = Router.getNextRoute(state.url);
      //TODO should we be doing this logic here? in the router? in a method?

      var templateData = state.templateData;
      this.el.empty();
      this.el.html(this.template(templateData));
    }
  });

  window.TileViewModel = TileViewModel;
})();
