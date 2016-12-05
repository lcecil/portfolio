// Menu overlay

$(function() {

    $('.toggle-nav').click(function() {
        $('.site-wrap').toggleClass('open');
        $('.nav-wrap').toggleClass('open');
        return false;
    });

});

// Dot Navigation

$(function() {
	var contentSections = $('.panel'),
		  navigationItems = $('.dot-nav a');

	updateNavigation();

  //on scroll, smooth scroll to the section
  $(window).on('mousewheel.changePanel', changePanel);


	//on click, smooth scroll to the section
	navigationItems.on('click', function(event){
      event.preventDefault();
      smoothScroll($(this.hash));
  });

  function changePanel(event) {

    if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
        console.log('up');
        var prevPanel = $('.active-panel').prev();
        smoothScroll($(prevPanel.hash));
    }
    else {
        console.log('down');
        var nextPanel = $('.active-panel').next();
        smoothScroll($(nextPanel.hash));
    }

    $(this).off('mousewheel.changePanel');

    setTimeout(function() {
      $(window).on('mousewheel.changePanel', changePanel);
    }.bind(this), 1000);

  };

	function updateNavigation() {
		contentSections.each(function(){
			$this = $(this);
			var activeSection = $('.dot-nav a[href="#'+$this.attr('id')+'"]').data('number') - 1;
			if ( ( $this.offset().top - $(window).height()/2 < $(window).scrollTop() ) && ( $this.offset().top + $this.height() - $(window).height()/2 > $(window).scrollTop() ) ) {
				navigationItems.eq(activeSection).addClass('active-dot');
			}else {
				navigationItems.eq(activeSection).removeClass('active-dot');
			}
		});
	}

	function smoothScroll(target) {
        $('body,html').animate(
        	{'scrollTop':target.offset().top},
        	600
        );
	}
});
