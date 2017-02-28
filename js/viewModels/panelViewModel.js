(function () {

  // // ...old

  // // ... some logic, which says only render half this time
  // if (route.indexOf('details') >= 0) {
  //   this.fullPanelView.render(data);
  //   this.pageView.render(data);
  // } else {
  //   this.halfPanelView.render(data);
  // }


  var PanelViewModel = ViewModel.extend({
    init: function (el) {
      this.el = el;

      var halfPanelHtml = $('.half-panel-template').html();
      var fullPanelHtml = $('.full-panel-template').html();
      this.halfPanelTemplate = _.template(halfPanelHtml);
      this.fullPanelTemplate = _.template(fullPanelHtml);
    },
    render: function (state) {
      var template = null;
      var templateData = state.templateData;

      if (state.isDetails) {
        template = this.fullPanelTemplate;
      } else {
        template = this.halfPanelTemplate;
      }

      this.el.empty();
      this.el.html(template(templateData));

      this.setPageLinkHandlers();

      debugger;
    },

    setPageLinkHandlers: function () {
      $('.page-link').on('click', function(event) {
        var route = $(this).attr('href');
        var animationDelay = 800;
        event.preventDefault();

        $('body').removeClass('half half-loading').addClass('full full-loading');

        setTimeout(function () {
          // trigger navigation
          location.url = route;
          $('body').removeClass('full-loading').addClass('full-loaded');

          // renderPanel(route);
          // renderPage(route);
          // renderTile(route);
          //$('body').removeClass('full-loading').addClass('full-loaded');
          //backgroundPanels.removeClass('show');
        }, animationDelay);
      });
    },

    setBackArrowHandlers: function () {
      //
    }
  });

  window.PanelViewModel = PanelViewModel;
})();
