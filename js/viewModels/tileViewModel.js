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
      this.setTileClickHandler(state);
    },

    setTileClickHandler: function () {
      this.el.children().on('click', function (event) {
        var animationDuration = 800;
        var url = $(this).attr("href");
        var overlayClass = $(this).css();
        debugger;
        console.log(overlayClass);
        event.preventDefault();

        Animate({
          begin: function () {
          },
          middle: function () {
            window.location = url;
            window.scrollTo(0, 0);
          },
          end: function () {
          }
        }, animationDuration);
      });
    }

  });

  window.TileViewModel = TileViewModel;
})();
