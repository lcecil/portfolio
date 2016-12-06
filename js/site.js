// Menu overlay

$(function() {

    $('.toggle-nav').click(function() {
        $('.site-wrap').toggleClass('open');
        $('.nav-wrap').toggleClass('open');
        return false;
    });

});

// Navigation
$(function () {
  var contentSections = $('.panel'),
      navigationItems = $('.dot-nav a'),
// When the user wants change the view to a different panel, we need to:
// 1. Get the ID of the current panel
      currentPanel = $('.dot-nav a.active-dot').attr('href');

// 2. Get the ID of the selected panel
  // 2a. On click, get the value of the href attribute
    navigationItems.on('click', function(event) {
        event.preventDefault();
        var selectedDot = $(this).attr('href');
        // 2b. Check if the selected panel is below or above the current panel
        if (selectedDot)
    });
  });
  // 2b. On scroll, get the value of the next or previous href attribute


// 3. Get the text of that panel



// 5. Slide the selected panel, either up or down, into the viewport
  // 5a. Slide the panel up
  function slidePanelUp (target) {

  };
  // 5b. Slide the panel down
  function slidePanelDown (target) {

  };
// 6. Fade the color of the current panel to the color of the selected panel
// 7. Fade out the text of the current panel
// 8. Fade in the text of the selected panel
// 9. Update the dot navigation





// $(function() {
//
//
// 	updateNavigation();
//
//   //on scroll, smooth scroll to the section
//   $(window).on('mousewheel.changePanel', changePanel);
//
//
// 	//on click, smooth scroll to the section
// 	navigationItems.on('click', function(event){
//       event.preventDefault();
//       smoothScroll($(this.hash));
//       // console.log($(this));
//   });
//
//   function changePanel(event) {
//
//     if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
//         console.log('up');
//         var prevPanel = $('.active-panel').prev();
//         // smoothScroll($(prevPanel.hash));
//     }
//     else {
//         console.log('down');
//         var nextPanel = $('.active-panel').next();
//         // smoothScroll($(nextPanel.hash));
//     }
//
//     $(this).off('mousewheel.changePanel');
//
//     setTimeout(function() {
//       $(window).on('mousewheel.changePanel', changePanel);
//     }.bind(this), 1000);
//
//   };
//
// 	function updateNavigation() {
// 		contentSections.each(function(){
// 			$this = $(this);
// 			var activeDot = $('.dot-nav a[href="#'+$this.attr('id')+'"]').data('number') - 1;
//       var activePanel = $('.panel').data('number') - 1;
//       console.log(activePanel);
// 			if ( ( $this.offset().top - $(window).height()/2 < $(window).scrollTop() ) && ( $this.offset().top + $this.height() - $(window).height()/2 > $(window).scrollTop() ) ) {
// 				navigationItems.eq(activeDot).addClass('active-dot');
// 			}else {
// 				navigationItems.eq(activeDot).removeClass('active-dot');
// 			}
// 		});
// 	}
//
// 	function smoothScroll(target) {
//         $('body,html').animate(
//         	{'scrollTop':target.offset().top},
//         	600
//         );
// 	}
// });
