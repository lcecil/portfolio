(function () {

  var TileViewModel = ViewModel.extend({
    init: function (el, html) {
      this.el = el;
      this.template = _.template(html);
    },

    render: function (state) {
      var templateData = {
        previousTemplateData: state.previousTemplateData,
        nextTemplateData: state.nextTemplateData
      };
      this.el.empty();
      this.el.html(this.template(templateData));

      this.setTileClickHandler();
    },

    setTileClickHandler: function () {
      this.el.children().on('click', function (event) {

      });
    }

  });

  window.TileViewModel = TileViewModel;
})();
