(function () {
  'use-strict';

  var BaseView = {
    template: 'WARNING - no template provided',
    init: function () {
      throw new Error('init not implemented');
    },
    render: function () {
      throw new Error('render not implemented');
    }
  };


  var AppView = _.extend(BaseView, {
    dotNavigation = $('.dot-nav a'),
    backgroundPanels = $('.background-image'),
    backArrow = $('.toggle-back'),
    menuIcon = $('.toggle-nav'),
    menuItem = $('.menu-link'),
    halfPanelView: null,

    template: '',
    init: function () {
      //this.template: $()
      this.halfPanelView = HalfPanelView;
      this.fullPanelView = FullPanelView;
      this.pageView = PageView;
    },
    render: function (route) {
      var data = Router.getRouteData(route); // get ALL of the data
      // ... some logic, which says only render half this time
      if (route.indexOf('details') >= 0) {
        this.fullPanelView.render(data);
        this.pageView.render(data);
      } else {
        this.halfPanelView.render(data);
      }

    },
  });



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
        renderPanel(Router.currentRoute);
    });

    // Opens menu overlay on click
    menuIcon.on('click', function(event) {
        event.preventDefault();
        $('.nav-wrap').toggleClass('show');
        $('header').toggleClass('show-menu');
    });

    // Navigation on click
    dotNavigation.on('click', function(event) {
      event.preventDefault();
      var route = $(this).attr('href');
      renderPanel(route);
      updateTheme(route);
    });








  //   $(window).on('wheel', _.debounce(function(event) {
  //     var route = $('.active-dot').attr('href');
  //     console.log('scrolled');
  //     if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
  //       var route = $('.dot-nav .active-dot').parent().prev().children().attr('href');
  //       renderPanel(route);
  //       updateTheme(route);
  //    }
  //     else {
  //       var route = $('.dot-nav .active-dot').parent().next().children().attr('href');
  //       renderPanel(route);
  //       updateTheme(route);
  //    }
  //  }, 50));

  });

  function renderPanel(route) {
      var html = Router.getPanelContent(route);
      var panelContainer = $('.panel');

      panelContainer.empty().html(html);
      updateNavigation(route);

      // Opens full page on click of "Read More"
      $('.page-link').on('click', function(event) {
        event.preventDefault();
        $(window).off('wheel', _.debounce());
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
      menuItem.on('click', function (event) {
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
    dotNavigation.removeClass('active-dot');
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
