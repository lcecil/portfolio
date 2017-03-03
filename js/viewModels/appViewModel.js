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
      this.setInitialBodyClasses(Router.getState());

      this.render(Router.getState());
      Router.onChange(_.bind(this.render, this));
    },

    render: function (state) {
      if (state.isShowingDetails) {
        this.animateToDetails(state);
        this.page.render(state);
        this.tile.render(state);
      }

      if (!state.isShowingDetails) {
        if (this.el.is('.full')) {
          this.animateFromDetails(state);
        } else {
          this.panel.render(state);
        }
        this.updateNavigation(state.route);
      }

      //this.panel.render(state);
      this.updateTheme(state.route, state.isShowingDetails);
    },

    setMenuIconHandlers: function () {
      this.menuIcon.on('click', function(event) {
          $('.nav-wrap').toggleClass('show');
          $('header').toggleClass('show-menu');
      });
    },

    setMenuItemHandlers: function () {
      this.menuItem.on('click', function (event) {
        // var route = $(this).children().attr('href');
        // var animationDelay = 800;
        $('.nav-wrap').removeClass('show');
        $('header').removeClass('show-menu');

        // $('body').removeClass('half half-loading').addClass('full full-loading');
        //
        // setTimeout(function () {
        //   location.hash = route;
        //   $('body').removeClass('full-loading').addClass('full full-loaded');
        // }, animationDelay);
      });
    },

    setDotNavigationHandlers: function () {
      this.dotNavigation.on('click', function(event) {
        // var route = $(this).attr('href');
        // location.hash = route;
      });
    },

    setBackArrowHandlers: function () {
      this.backArrow.on('click', function() {
        // var animationDelay = 800;
        var route = $(this).attr('href');

        // $('body').removeClass('full full-loaded').addClass('half half-loading');
        //
        // setTimeout(function () {
        //   $('body').removeClass('half-loading').addClass('half-loaded');
        //   location.hash = route;
        // }, animationDelay);

      });
    },

    setInitialBodyClasses: function (state) {
      if (state.isShowingDetails) {
        this.el.addClass('full full-loaded');
      } else {
        this.el.addClass('half half-loaded');
      }
    },

    updateNavigation: function (route) {
      route = route || '#/home';
      this.dotNavigation.removeClass('active-dot');
      $('[href="' + route +'"]').addClass('active-dot');
      this.backArrow.attr('href', '#' + route);
    },

    updateTheme: function (route, isShowingDetails) {
      var root = route.match(/\/([a-z]|\-)+\/?/)[0];
      var theme = root ? root.replace(/\//g, '') : 'home';

      $('body').removeClass(function (i, className) {
        return (className.match(/[A-Z-]+-theme/gi) || []).join(' '); // Remove any "theme" classes
      }).addClass(theme + '-theme');

      if (!isShowingDetails) {
        this.backgroundPanel.removeClass('show');
        $('#' + theme).addClass('show');
      }
    },

    animateToDetails: function (state) {
      var animationDuration = 800;
      var self = this;

      Animate({
        begin: function () {
          self.el.removeClass('half half-loaded').addClass('full full-loading');
          self.backgroundPanel.removeClass('show');
        },
        middle: function () {
          self.panel.render(state);
        },
        end: function () {
          self.el.removeClass('full-loading').addClass('full full-loaded');
        }
      }, animationDuration);
    },

    animateFromDetails: function (state) {
      var animationDuration = 800;
      var self = this;

      Animate({
        begin: function () {
          self.el.removeClass('full full-loaded').addClass('half half-loading');
          $('.page').empty();
        },
        middle: function () {
          self.panel.render(state);
        },
        end: function () {
          if (self.el.is('.half-loading')) {
            self.el.removeClass('half-loading').addClass('half-loaded');
          }
        }
      }, animationDuration);
    }

  });

  window.AppViewModel = AppViewModel;
})();
