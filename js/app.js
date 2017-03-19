$(function() {
  'use-strict';

  var getTemplates = $.get('templates/bundle.html').then( function (html) {
    var templates = {};
    var templateHtml = _.filter($.parseHTML(html), function (node) {
      return $(node).is('[type="x-template"]');
    });

    _.each(templateHtml, function (template) {
      var kabobId = template.id.replace('-template', '');
      var camelId =  kabobId.replace(/(\-\w)/g, function(match){
        return match[1].toUpperCase();
      });

      templates[camelId] = template.innerHTML;
    });

    return templates;
  });

  var getData = $.getJSON('js/data.json').then( function (data) {
    return data;
  });

  $.when(getTemplates, getData).done( function(templates, data) {
      Router.init(data);
      // kick things off, baby
      var app = new AppViewModel($('body'), templates);
  });
});

ScrollManager.onScroll(function(direction) {
  var state = Router.getState();
  if (!state.isShowingDetails) {
    route = location.hash;
    if (direction > 0) {
      var nextRoute = Router.getNextRoute(route);
      location.hash = nextRoute;
    }
    else {
      var previousRoute = Router.getPreviousRoute(route);
      location.hash = previousRoute;
    }
  }
});

$(window).on('keydown', function(e) {
  route = location.hash;
  switch (e.which) {
    case 40:
      var nextRoute = Router.getNextRoute(route);
      location.hash = nextRoute;
      break;
    case 38:
      var previousRoute = Router.getPreviousRoute(route);
      location.hash = previousRoute;
      break;
    case 39:
      var fullPanelRoute = $('.page-link').attr('href');
      location.hash = fullPanelRoute;
      break;
    case 37:
      var halfPanelRoute = $('.toggle-back').attr('href');
      location.hash = halfPanelRoute;
      break;
    default: return;
  }
});
