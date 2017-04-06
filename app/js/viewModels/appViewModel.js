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

      this.updateTheme(state.route, state.isShowingDetails);
      this.updateBackArrow(state);

    },

    setMenuIconHandlers: function () {
      this.menuIcon.on('click', function() {
          $('.nav-wrap').toggleClass('show');
          $('header').toggleClass('show-menu');
      });
    },

    onMenuItemClick: function (event) {
      var targetRoute = $(event.currentTarget).children().attr("href");
      var state = Router.getState();
      event.preventDefault();
      if (state.isShowingDetails) {
        Animation.create([
          Animation.step(0, function () {
            location.hash = targetRoute;
            window.scrollTo(0, 0);
          }),
          Animation.step(400, function () {
            $('.nav-wrap').removeClass('show');
            $('header').removeClass('show-menu');
          })
        ]);
      } else {
        Animation.create([
          Animation.step(0, function () {
            location.hash = targetRoute;
          }),
          Animation.step(400, function () {
            //TODO add in some menu item fade out animation
          }),
          Animation.step(1200, function () {
            $('.nav-wrap').removeClass('show');
            $('header').removeClass('show-menu');
          })
        ]);
      }
    },

    setMenuItemHandlers: function () {
      this.menuItem.on('click', _.bind(this.onMenuItemClick, this));
    },

    setInitialBodyClasses: function (state) {
      if (state.isShowingDetails) {
        this.el.addClass('full full-loaded');
      } else {
        this.el.addClass('half half-loaded');
      }
    },

    updateBackArrow: function (state) {
      var baseRoute = Router.getBaseRoute(state.route);
      this.backArrow.attr('href', '#' + baseRoute);
    },

    updateNavigation: function (route) {
      route = route || '#/home';
      this.dotNavigation.removeClass('active-dot');
      $('a[href$="' + route + '"]').addClass('active-dot');
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
      var self = this;

      Animation.create([
        Animation.step(0, function () {
          self.el.removeClass('half half-loaded').addClass('full full-loading');
          self.backgroundPanel.removeClass('show');
        }),
        Animation.step(400, function () {
          self.panel.render(state);
        }),
        Animation.step(800, function () {
          self.el.removeClass('full-loading').addClass('full-loaded');
        })
      ]);
    },

    animateFromDetails: function (state) {
      var self = this;

      Animation.create([
        Animation.step(0, function () {
          self.el.removeClass('full full-loaded').addClass('half half-loading');
          $('.page').empty();
        }),
        Animation.step(400, function () {
          self.panel.render(state);
        }),
        Animation.step(800, function () {
          if (self.el.is('.half-loading')) {
            self.el.removeClass('half-loading').addClass('half-loaded');
          }
        })
      ]);
    }

  });

  window.AppViewModel = AppViewModel;
})();
