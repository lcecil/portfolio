(function () {
  'use-strict';

  var navigationItems = $('.dot-nav a');
  var backgroundPanels = $('.background-image');
  var backArrow = $('.toggle-back');
  var menuIcon = $('.toggle-nav');
  var menuLink = $('.menu-link');

  $(function() {
    var getTemplates = $.get('views/template.html').then( function (html) {
      return html;
    });

    var getData = $.getJSON('js/data.json').then( function (data) {
      return data;
    });

    $.when(getTemplates, getData).done( function(html, data) {
        $('body').append(html);
        Router.init(data);
        renderPanel('/home');
    });

    // Opens menu overlay on click
    menuIcon.on('click', function(event) {
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

  function renderPanel(route) {
      var html = Router.getPanelContent(route);
      var panelContainer = $('.panel');

      panelContainer.empty().html(html);
      updateNavigation(route);

      // Opens full page on click of "Read More"
      $('.page-link').on('click', function(event) {
        event.preventDefault();
        var route = $(this).attr('href');

        $('body').removeClass('half half-loading').addClass('full full-loading');

          setTimeout(function () {
            renderPanel(route);
            renderPage(route);
            renderTile(route);
            $('body').removeClass('full-loading').addClass('full-loaded');
            backgroundPanels.removeClass('show');
          }, 800);
      });

      // Returns to half page on click of Header arrow-left
      backArrow.on('click', function(event) {
          event.preventDefault();
          var route = $(this).attr('href');

          $('.page').empty().html();
          backgroundPanels.addClass('show');
          $('body').removeClass('full full-loaded').addClass('half half-loading');

            setTimeout(function () {
              $('body').removeClass('half-loading').addClass('half-loaded');
              renderPanel(route);
            }, 800);

      });

      // Opens full page on click of menu items and hide menu
      menuLink.on('click', function (event) {
        event.preventDefault();
        var route = $(this).children().attr('href');

        $('.page').empty().html();
        renderPanel(route);
        updateTheme(route);
        $('.nav-wrap').removeClass('show');
        $('header').removeClass('show-menu');
      });
  }

  function renderPage(route) {
      var html = Router.getPageContent(route);
      var pageContainer = $('.page');

      pageContainer.empty().html(html);
  }

  function renderTile(route) {
      var html = Router.getTileContent(route);
      var tileContainer = $('.tile-nav');

      tileContainer.empty().html(html);

      // Opens previous or next page/details
      $('.tile-nav a').on('click', function(event) {
        event.preventDefault();
        var route = $(this).attr('href');

        renderPanel(route);
        renderPage(route);
        renderTile(route);
        updateTheme(route);

        $('body').addClass('full full-loaded');
        backgroundPanels.removeClass('show');
      });
  }

  function updateNavigation(route) {
    route = route || '/home';
    var root = route.match(/\/[a-z-]+/ig)[0];
    navigationItems.removeClass('active-dot');
    $('[href="' + root +'"]').addClass('active-dot');
    $('.toggle-back').attr('href', root);
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
