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
    route = state.route;
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

KeyDownManager.init();

KeyDownManager.onKeyDown(KeyDownManager.keys.leftKey, function(event, state) {
  var route = state.route;
  var backRoute = Router.getBaseRoute(route);
  location.hash = '#' + backRoute;
});

KeyDownManager.onKeyDown(KeyDownManager.keys.rightKey, function(event, state) {
  var route = state.currentTemplateData.panel.pageLink;
  location.hash = route;
});

KeyDownManager.onKeyDown(KeyDownManager.keys.downKey, function(event, state) {
  if (!state.isShowingDetails) {
    var route = state.route;
    var nextRoute = Router.getNextRoute(route);
    location.hash = nextRoute;
  }
});

KeyDownManager.onKeyDown(KeyDownManager.keys.upKey, function(event, state) {
  if (!state.isShowingDetails) {
    var route = state.route;
    var previousRoute = Router.getPreviousRoute(route);
    location.hash = previousRoute;
  }
});
