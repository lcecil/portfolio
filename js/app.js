(function () {
  'use-strict';

  var navigationItems = $('.dot-nav a');
  var backgroundPanels = $('.background-image');

  $(function() {
    $.get('template.html', function(html){
      $('body').append(html);
      Router.init();
      renderPage();
    });

    // Menu overlay
    $('.toggle-nav').on('click', function(event) {
        event.preventDefault();
        $('.nav-wrap').toggleClass('show');
        $('header').toggleClass('show-menu');
    });

    // Navigation on click
    navigationItems.on('click', function(event) {
      event.preventDefault();
      var route = $(this).attr('href');
      renderPage(route);
    });

  });

  function renderPage(route) {
      var html = Router.compile(route);
      var pageContainer = $('.page-wrap');

      updateNavigation(route);
      updateTheme(route);

      pageContainer.empty().html(html);

      // Panel overlay
      $('.page-link').on('click', function(event) {
        event.preventDefault();
        $('.site-wrap').toggleClass('open');
        $('header').toggleClass('show-page');
      });
  }

  function updateNavigation(route) {
    route = route || '/home';
    navigationItems.removeClass('active-dot');
    $('[href="' + route +'"]').addClass('active-dot');
  }

  function updateTheme(route) {
    route = route || '/home';
    var root = route.match(/\/([a-z]|\-)+\/?/)[0];
    var theme = root ? root.replace(/\//g, '') : 'home';

    console.log(theme); //rmv
    // update body theme
    $('body').removeClass().addClass(theme + '-theme');

    // update SVGs
    backgroundPanels.removeClass('show');
    $('#' + theme).addClass('show');
  }

})();
