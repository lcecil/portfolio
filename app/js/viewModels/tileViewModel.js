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
        var route = $(this).attr("href");
        var color = $(this).css('background-color');
        var overlay = $('.overlay');
        event.preventDefault();

        Animation.create([
          Animation.step(0, function () {
            overlay.addClass('show fade-in').css('background-color', color);
          }),
          Animation.step(300, function () {
            location.hash = route;
            window.scrollTo(0, 0);
          }),
          Animation.step(750, function () {
            overlay.removeClass('fade-in');
          }),
          Animation.step(1000, function () {
            overlay.removeClass('show');
          })
        ]);
      });
    }

  });

  window.TileViewModel = TileViewModel;
})();
