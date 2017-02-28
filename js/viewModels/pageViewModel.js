(function () {

  var PageViewModel = ViewModel.extend({

    init: function (el) {
      var templateHtml = $('.page-template');

      this.el = el;
      this.template = _.template(templateHtml);
    },

    render: function (state) {
      var templateData = state.templateData;
      this.el.empty();
      this.el.html(this.template(templateData));
    }
  });

  window.PageViewModel = PageViewModel;
})();
