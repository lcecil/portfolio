var navigationItems = $('.dot-nav a');
var backgroundPanels = $('.background-image');

$(function() {
  $.get('templates.html', function(html){
    $('body').append(html);
    renderPage('home');
  });

  // Menu overlay
  $('.toggle-nav').on('click', function(event) {
      event.preventDefault();
      $('.nav-wrap').toggleClass('show');
      $('header').toggleClass('show-menu');
      return false;
  });

  // Navigation on click
  navigationItems.on('click', function(event) {
    event.preventDefault();
    var route = $(this).attr('href').replace('#', '');
    renderPage(route);
  });

});

function renderPage(route) {
    var template = panelRouter(route);
    navigationItems.removeClass('active-dot');
    backgroundPanels.removeClass('show');
    $('body').removeClass();

    $('body').addClass(route + '-theme');
    $('[href="#'+ route +'"]').addClass('active-dot');
    $('#' + route).addClass('show');

    var panelContainer = $('.text-wrapper'); // TODO
    panelContainer.empty().html(template);

    // Panel overlay
    $('.page-link').on('click', function(event) {
      event.preventDefault();
      $('.site-wrap').toggleClass('open');
      $('header').toggleClass('show-page');
    });
} ;
