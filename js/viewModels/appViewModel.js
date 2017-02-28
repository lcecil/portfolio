(function () {

  var AppViewModel = ViewModel.extend({
    dotNavigation: $('.dot-nav a'),
    backgroundPanel: $('.background-image'),
    backArrow: $('.toggle-back'),
    menuIcon: $('.toggle-nav'),
    menuItem: $('.menu-link'),
    panel: null,
    page: null,
    router: Router,

    init: function (el) {
      this.el = el;
      this.panel = new PanelViewModel($('.panel'));
      this.page = new PageViewModel($('.page'));
      // TODO - tiles...
      this.setMenuIconHandlers();
      this.setMenuItemHandlers();
      this.setDotNavigationHandlers();

      this.panel.init();
      this.page.init();

      router.onChange(_.bind(this.render, this));
      this.render();
    },

    render: function (state) {
      this.panel.render(state);
      debugger;
      if (state.isShowingDetails) {
        this.page.render(state);
      }

      this.updateNavigation(state.route);
      this.updateTheme(state.route);
    },

    setMenuIconHandlers: function () {
      this.menuIcon.on('click', function(event) {
          event.preventDefault(); // TODO- remove after a-tags fixed
          $('.nav-wrap').toggleClass('show');
          $('header').toggleClass('show-menu');
      });
    },

    setBackArrowHandlers: function () {
      backArrow.on('click', function(event) {
        event.preventDefault();
        var animationDelay = 800;
        var route = $(this).attr('href');

        // $('.page').empty().html();
        //backgroundPanels.addClass('show');
        $('body').removeClass('full full-loaded').addClass('half half-loading');

        setTimeout(function () {
          $('body').removeClass('half-loading').addClass('half-loaded');
          //renderPanel(route);
          location.url = route;
        }, animationDelay);

      });
    },

    setMenuItemHandlers: function () {
      // Opens full page on click of menu items and hide menu
      menuItem.on('click', function (event) {
        $('.nav-wrap').removeClass('show');
        $('header').removeClass('show-menu');
        // // TODO - temove after a-tags fixed
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
        event.preventDefault();
        var route = $(this).attr('href');
        renderPanel(route);
        updateTheme(route);
      });
    },

    updateNavigation: function (route) {
      route = route || '/home';
      var root = route.match(/\/[a-z-]+/ig)[0];
      dotNavigation.removeClass('active-dot');
      $('[href="' + root +'"]').addClass('active-dot');
      $('.toggle-back').attr('href', root);
    },

    updateTheme: function (route) {
      route = route || '/home';
      var root = route.match(/\/([a-z]|\-)+\/?/)[0];
      var theme = root ? root.replace(/\//g, '') : 'home';

      // update body theme
      $('body').removeClass().addClass(theme + '-theme');

      // update SVGs
      backgroundPanels.removeClass('show');
      $('#' + theme).addClass('show');
    }

  });

  window.AppViewModel = AppViewModel;
})();
