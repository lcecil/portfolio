(function () {

  var AppViewModel = ViewModel.extend({
    dotNavigation: $('.dot-nav a'),
    backgroundPanel: $('.background-image'),
    backArrow: $('.toggle-back'),
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

      this.render(Router.getState());
      Router.onChange(_.bind(this.render, this));
    },

    render: function (state) {
      this.panel.render(state);

      if (state.isShowingDetails) {
        this.page.render(state);
      }
      this.updateNavigation(state.url);
      this.updateTheme(state.url);
    },

    setMenuIconHandlers: function () {
      this.menuIcon.on('click', function(event) {
          $('.nav-wrap').toggleClass('show');
          $('header').toggleClass('show-menu');
      });
    },

    setBackArrowHandlers: function () {
      this.backArrow.on('click', function(event) {
        event.preventDefault();
        var animationDelay = 800;
        var route = $(this).attr('href');

        $('body').removeClass('full full-loaded').addClass('half half-loading');

        setTimeout(function () {
          $('body').removeClass('half-loading').addClass('half-loaded');
          location.url = route;
        }, animationDelay);

      });
    },

    setMenuItemHandlers: function () {
      this.menuItem.on('click', function (event) {
        $('.nav-wrap').removeClass('show');
        $('header').removeClass('show-menu');

        // // TODO - remove after a-tags fixed
        // event.preventDefault();
        // var route = $(this).children().attr('href');
        //
        // $('.page').empty().html();
        // renderPanel(route);
        // updateTheme(route);
      });
    },

    setDotNavigationHandlers: function () {
      this.dotNavigation.on('click', function(event) {
        var route = $(this).attr('href');
        location.hash = route;
      });
    },

    updateNavigation: function (route) {
      route = route || '#/home';
      this.dotNavigation.removeClass('active-dot');
      $('[href="' + route +'"]').addClass('active-dot');

      // TODO Rig the back arrow again when the page is working
      // $('.toggle-back').attr('href', root);
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
