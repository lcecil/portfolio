// Menu overlay

$(function() {

    $('.toggle-nav').click(function() {
        $('.site-wrap').toggleClass('open');
        $('.nav-wrap').toggleClass('open');
        return false;
    });

});

// Dot Navigation

jQuery(document).ready(function($){
	var contentSections = $('.panel'),
		  navigationItems = $('.dot-nav a');

	updateNavigation();
	$(window).on('scroll', function(){
		updateNavigation();
	});

	//smooth scroll to the section
	navigationItems.on('click', function(event){
      event.preventDefault();
      smoothScroll($(this.hash));
  });

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
