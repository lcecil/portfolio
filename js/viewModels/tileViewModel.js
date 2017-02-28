(function () {

  var TileViewModel = ViewModel.extend({

    init: function (el, html) {
      this.el = el;
      this.template = _.template(html);
    },

    render: function (state) {
      var templateData = state.templateData;
      this.el.empty();
      this.el.html(this.template(templateData));
    }
  });

  window.TileViewModel = TileViewModel;
})();
