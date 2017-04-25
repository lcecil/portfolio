(function () {

  var PhotoManager = {
    openPhotoswipe: function (images) {
      var pswpElement = document.querySelectorAll('.pswp')[0];

      var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, images, this.options);
      gallery.init();
    }
  }

  window.PhotoManager = PhotoManager;
})();
