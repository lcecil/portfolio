(function () {

  var TileViewModel = ViewModel.extend({

    init: function (el) {
      var templateHtml = $('.tile-template');
      this.el = el;
      this.template = _.template(templateHtml);
    },

    render: function (state) {
      var templateData = state.templateData;
      this.el.empty();
      this.el.html(this.template(templateData));
    }
  });

  window.TileViewModel = TileViewModel;
})();
