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
      this.el.on('click', function () {
        _.delay(function () {
          window.scrollTo(0, 0);
        })
      });
      // var scrollDelay = 500;
      // this.el.on('click', function () {
      //   $('html, body').animate({scrollTop: 0}, scrollDelay);
      // })
    }
  });

  window.TileViewModel = TileViewModel;
})();
