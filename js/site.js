var panelData = [
    {
      "panel": "#home",
      "color": "$panel-1",
      "header": "UX Design",
      "sub-header": "and Research",
      "body": "Techniques methodologies and designs for a wide range of projects and problems."
    },
    {
      "panel": "information-architecture",
      "color": "$panel-2",
      "header": "Information",
      "sub-header": "Architecture",
      "body": "Content organization and structuring is the key to a successful application or website. Think of it as a card catalog for the 21st century."
    },
    {
      "panel": "research-methods",
      "color": "$panel-3",
      "header": "Research",
      "sub-header": "Methods",
      "body": "From A/B Testing to user interviews and everything in between. Choosing the right method for the job is the name of the game here."
    },
    {
      "panel": "research-methods",
      "color": "$panel-4",
      "header": "Visual",
      "sub-header": "Designs",
      "body": "Communicating a design is as important as creating it. Using a quick sketch or pixel perfect visual design depends on what's needed to get the job done."
    },
    {
      "panel": "project-managment",
      "color": "$panel-5",
      "header": "Project",
      "sub-header": "Management",
      "body": "Agile, scrum, sprints, waterfall, kanban: whatever the buzzword of the day is, chances are I've probably tried it."
    },
    {
      "panel": "development",
      "color": "$panel-6",
      "header": "Front-End",
      "sub-header": "Development",
      "body": "One of the my many hats, it ranges in size from beanie to ten gallon. It's more about the knowledge that I gain from wearing it that makes me a better designer."
    }
];

// Menu overlay

$(function() {

    $('.toggle-nav').click(function() {
        $('.nav-wrap').toggleClass('open');
        return false;
    });

});

// Panel overlay

$(function() {

  $('.page-link').click(function() {
    $('.panel').toggleClass('open');
    return false;
  });

});

// Navigation on click

$(function () {
  var navigationItems = $('.dot-nav a');
  var backgroundPanels = $('.background-image');
  var currentBackgroundPanel = $('.active-dot').attr('href');
  var currentFixedPanel = $('.panel').attr('class');

  navigationItems.on('click', function(event) {
    var selectedDot = $(this);
    var selectedPanel = $(this.hash);
    event.preventDefault();

    if (!selectedDot.hasClass('active-dot')) {
      navigationItems.removeClass('active-dot');
      selectedDot.addClass('active-dot');
      backgroundPanels.removeClass('show');
      selectedPanel.addClass('show');
    }


  });
});

function changePanel(panel) {

};

function onScroll (event) {

  if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
      console.log('up');
  }
  else {
      console.log('down');
  }
  $(this).off('mousewheel.changePanel');

  setTimeout(function() {
    $(window).on('mousewheel.changePanel', changePanel);
  }.bind(this), 1000);

};

function smoothScroll(target) {
    $('body,html').animate(
      {'scrollTop':target.offset().top},
      600
    );
  };
