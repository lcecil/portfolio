(function () {
  'use-strict';

  var navigationItems = $('.dot-nav a');
  var backgroundPanels = $('.background-image');
  var halfPageLink = $('.toggle-back');
  var menuLink = $('.toggle-nav');

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
    menuLink.on('click', function(event) {
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

        $('body').addClass('full loading');

          setTimeout(function () {
            renderPanel(route);
            renderPage(route);
            renderTile(route);
            $('body').removeClass('loading').addClass('loaded');
            backgroundPanels.removeClass('show');
          }, 1000);
      });

      // Returns to half page on click of Header arrow-left
      halfPageLink.on('click', function(event) {
          event.preventDefault();
          var route = '/information-architecture';

          $('body').removeClass('full loaded').addClass('loading');

            setTimeout(function () {
              renderPanel(route);
              backgroundPanels.addClass('show');
            }, 1000);

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
