(function () {

  var PageViewModel = ViewModel.extend({
    init: function (el, html) {
      this.el = el;
      this.template = _.template(html);
    },

    render: function (state) {
      var templateData = state.currentTemplateData.details;
      this.el.empty();
      this.el.html(this.template(templateData));
      this.setButtonHandlers(state);
    },

    setButtonHandlers: function (state) {
      $('.artifacts-button').on('click', function() {
        if (state.route !== '/home/details') {
          KeyDownManager.disabled = true;
          PhotoManager.openPhotoswipe(state.currentTemplateData.details.page.imageList);
        }
      });
    }

  });

  window.PageViewModel = PageViewModel;
})();
