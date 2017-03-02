(function () {

  var PanelViewModel = ViewModel.extend({
    init: function (el, halfPanelHtml, fullPanelHtml) {
      this.el = el;
      this.halfPanelTemplate = _.template(halfPanelHtml);
      this.fullPanelTemplate = _.template(fullPanelHtml);
    },
    render: function (state) {
      var template = null;
      var templateData = null;

      if (state.isShowingDetails) {
        template = this.fullPanelTemplate;
        templateData = state.currentTemplateData.details;
      } else {
        template = this.halfPanelTemplate;
        templateData = state.currentTemplateData;
      }

      this.el.empty();
      this.el.html(template(templateData));

      this.setPageLinkHandlers();
    },

    setPageLinkHandlers: function () {
      $('.page-link').on('click', function(event) {
        var route = $(this).attr('href');
        var animationDelay = 800;

        $('body').removeClass('half half-loading').addClass('full full-loading');
        $('.background-image').removeClass('show');

        setTimeout(function () {
          location.hash = route;
          $('body').removeClass('full-loading').addClass('full full-loaded');
        }, animationDelay);
      });
    }
  });

  window.PanelViewModel = PanelViewModel;
})();
