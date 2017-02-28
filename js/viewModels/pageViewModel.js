(function () {

  var PageViewModel = ViewModel.extend({

    init: function (el, html) {
      this.el = el;
      this.template = _.template(html);
    },

    render: function (state) {
      var templateData = state.templateData.details;
      this.el.empty();
      this.el.html(this.template(templateData));
    }
  });

  window.PageViewModel = PageViewModel;
})();
