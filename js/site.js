// Menu overlay

$(function() {

    $('.toggle-nav').click(function() {
        $('.nav-wrap').toggleClass('open');
        return false;
    });

});

// Navigation

$(function () {
  var contentSections = $('.panel');
  var navigationItems = $('.dot-nav a');

  navigationItems.on('click', function(event) {
    var selectedDot = $(this);
    var selectedPanel = $(this.hash);
    event.preventDefault();

    if (!selectedDot.hasClass('active-dot')) {
      navigationItems.removeClass('active-dot');
      selectedDot.addClass('active-dot');
      $('.show').removeClass('show');
      selectedPanel.addClass('show');
    }

    smoothScroll(selectedPanel);
  });

  function changePanel (event) {

    if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
        console.log('up');
    }
    else {
        console.log('down');
    }
    $(this).off('mousewheel.changePanel');

    setTimeout(function() {
      $(window).on('mousewheel.changePanel', changePanel);
    }.bind(this), 1000);

  };

  function smoothScroll(target) {
      $('body,html').animate(
      	{'scrollTop':target.offset().top},
      	600
      );
    };

});
