(function () {
  'use-strict';

  var navigationItems = $('.dot-nav a');
  var backgroundPanels = $('.background-image');

  $(function() {
    var getTemplates = $.get('views/template.html', function(html){
      $('body').append(html);
    });

    var getData = $.getJSON('js/data.json', function(data){
        Router.init(data);
    });

    $.when(getTemplates, getData).done(renderSite);

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
      renderPanel(route);
      updateTheme(route);
    });

  });

  // TO DO - shouldn't need this function, but how can we prevent the initialization of the
  //         the site from performing the css transitions?
  function renderSite(route) {
    renderPanel(route);
    renderPage(route);

    // Panel overlay
    $('.page-link').on('click', function(event) {
      event.preventDefault();
      var route = $(this).attr('href');

      $('body').addClass('full');
      $('.panel').addClass('fade-out');

        setTimeout(function () {
          renderPanel(route);
          renderPage(route);
          $('.panel').removeClass('fade-out');
          $('.panel, header').addClass('fade-in');
          backgroundPanels.removeClass('show');
        }, 1000);
    });

  }

  function renderPanel(route) {
      var html = Router.getPanelContent(route);
      var panelContainer = $('.panel');

      panelContainer.empty().html(html);
      updateNavigation(route);
  }

  function renderPage(route) {
      var html = Router.getPageContent(route);
      var pageContainer = $('.page');

      pageContainer.empty().html(html);
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

    // update body theme
    $('body').removeClass().addClass(theme + '-theme');

    // update SVGs
    backgroundPanels.removeClass('show');
    $('#' + theme).addClass('show');
  }

})();
