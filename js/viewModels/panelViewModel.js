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
    },
  });

  window.PanelViewModel = PanelViewModel;
})();
