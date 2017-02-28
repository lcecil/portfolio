$(function() {
  'use-strict';

  // kick things off, baby
  var app = new AppViewModel($('body'));

  var getTemplates = $.get('templates/bundle.html').then( function (html) {
    return html;
  });

  var getData = $.getJSON('js/data.json').then( function (data) {
    return data;
  });

  $.when(getTemplates, getData).done( function(html, data) {
      $('body').append(html);
      Router.init(data);
      debugger;
      app.init();
  });

});

// function renderPanel(route) {
//     var html = Router.getPanelContent(route);
//     var panelContainer = $('.panel');
//
//     panelContainer.empty().html(html);
//     updateNavigation(route);
//
//     // Opens full page on click of "Read More"
//
//
//     // Returns to half page on click of Header arrow-left
//
// }

// function renderPage(route) {
//     var html = Router.getPageContent(route);
//     var pageContainer = $('.page');
//
//     pageContainer.empty().html(html);
// }

// function renderTile(route) {
//     var html = Router.getTileContent(route);
//     var tileContainer = $('.tile-nav');
//
//     tileContainer.empty().html(html);
//
//     // Opens previous or next page/details
//     $('.tile-nav a').on('click', function(event) {
//       event.preventDefault();
//       var route = $(this).attr('href');
//
//       renderPanel(route);
//       renderPage(route);
//       renderTile(route);
//       updateTheme(route);
//
//       $('body').addClass('full full-loaded');
//       backgroundPanels.removeClass('show');
//     });
// }
