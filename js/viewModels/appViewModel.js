(function () {

  var AppViewModel = ViewModel.extend({
    dotNavigation: $('.dot-nav a'),
    backArrow: $('.toggle-back'),
    backgroundPanel: $('.background-image'),
    menuIcon: $('.toggle-nav'),
    menuItem: $('.menu-link'),
    panel: null,
    page: null,
    tile: null,

    init: function (el, templates) {
      this.el = el;
      this.panel = new PanelViewModel($('.panel'), templates.halfPanel, templates.fullPanel);
      this.page = new PageViewModel($('.page'), templates.page);
      this.tile = new TileViewModel($('.tile-nav'), templates.tile);
      this.setMenuIconHandlers();
      this.setMenuItemHandlers();
      this.setDotNavigationHandlers();
      this.setBackArrowHandlers();

      this.render(Router.getState());
      Router.onChange(_.bind(this.render, this));
    },

    render: function (state) {
      this.panel.render(state);

      if (state.isShowingDetails) {
        this.page.render(state);
        this.tile.render(state);
      }

      if (!state.isShowingDetails) {
        this.updateNavigation(state.url);
      }

      this.updateTheme(state.url);
    },

    setMenuIconHandlers: function () {
      this.menuIcon.on('click', function(event) {
          $('.nav-wrap').toggleClass('show');
          $('header').toggleClass('show-menu');
      });
    },

    setMenuItemHandlers: function () {
      this.menuItem.on('click', function (event) {
        var route = $(this).children().attr('href');
        var animationDelay = 800;
        $('.nav-wrap').removeClass('show');
        $('header').removeClass('show-menu');

        $('body').removeClass('half half-loading').addClass('full full-loading');

        setTimeout(function () {
          location.hash = route;
          $('body').removeClass('full-loading').addClass('full full-loaded');
        }, animationDelay);
      });
    },

    setDotNavigationHandlers: function () {
      this.dotNavigation.on('click', function(event) {
        var route = $(this).attr('href');
        location.hash = route;
      });
    },

    setBackArrowHandlers: function () {
      this.backArrow.on('click', function() {
        var animationDelay = 800;
        var route = $(this).attr('href');

        $('body').removeClass('full full-loaded').addClass('half half-loading');

        setTimeout(function () {
          $('body').removeClass('half-loading').addClass('half-loaded');
          location.hash = route;
        }, animationDelay);

      });
    },

    updateNavigation: function (route) {
      route = route || '#/home';
      this.dotNavigation.removeClass('active-dot');
      $('[href="' + route +'"]').addClass('active-dot');
      this.backArrow.attr('href', route);
    },

    updateTheme: function (route) {
      route = route || '#/home';
      var root = route.match(/\/([a-z]|\-)+\/?/)[0];
      var theme = root ? root.replace(/\//g, '') : 'home';

      // update body theme
      $('body').removeClass().addClass(theme + '-theme');

      // update SVGs
      this.backgroundPanel.removeClass('show');
      $('#' + theme).addClass('show');
    }

  });

  window.AppViewModel = AppViewModel;
})();
