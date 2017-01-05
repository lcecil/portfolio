// Menu overlay

$(function() {

    $('.toggle-nav').click(function() {
        $('.site-wrap').toggleClass('open');
        $('.nav-wrap').toggleClass('open');
        return false;
    });

});

// Navigation

// When the user wants change the view to a different panel, we need to:
// 1. Get the ID of the current panel
// 2. On click / On scroll
// 2a. Get the ID of the selected panel
// 2b. Update the dot navigation
// 2c. Add the animation class
// 2d. Check if the selected panel is below or above the current panel
// 3. Get the text of that panel
// 4. Slide the selected panel, either up or down, into the viewport
// 4a. Slide the panel up
// 4b. Slide the panel down
// 5. Fade the color of the current panel to the color of the selected panel
// 6. Fade out the text of the current panel
// 7. Fade in the text of the selected panel

$(function () {
  var contentSections = $('.panel');
  var navigationItems = $('.dot-nav a');
  var currentPanel = $('.active-dot').attr('href');

  navigationItems.on('click', function(event) {
    var selectedDot = $(this);
    var selectedPanelID = $(this.hash);

    event.preventDefault();

    if (!selectedDot.hasClass('active-dot')) {
      navigationItems.removeClass('active-dot');
      selectedDot.addClass('active-dot');
    }
    console.log(selectedPanelID);
    smoothScroll(selectedPanelID);
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
