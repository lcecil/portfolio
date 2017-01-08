var navigationItems = $('.dot-nav a');
var backgroundPanels = $('.background-image');
var currentBackgroundPanel = $('.active-dot').attr('href');
var currentFixedPanel = $('.panel').attr('class');

var panelData = [
    {
      "panel": "home",
      "color": "rgba(36, 123, 160, 0.8)",
      "header": "UX Design",
      "subHeader": "and Research",
      "body": "Techniques methodologies and designs for a wide range of projects and problems.",
      "link": "About Me"
    },
    {
      "panel": "information-architecture",
      "color": "rgba(245, 95, 92, 0.8)",
      "header": "Information",
      "subHeader": "Architecture",
      "body": "Content organization and structuring is the key to a successful application or website. Think of it as a card catalog for the 21st century.",
      "link": "Read More"
    },
    {
      "panel": "research-methods",
      "color": "rgba(39, 48, 67, 0.8)",
      "header": "Research",
      "subHeader": "Methods",
      "body": "From A/B Testing to user interviews and everything in between. Choosing the right method for the job is the name of the game here.",
      "link": "Read More"
    },
    {
      "panel": "research-methods",
      "color": "rgba(237, 174, 73, 0.8)",
      "header": "Visual",
      "subHeader": "Designs",
      "body": "Communicating a design is as important as creating it. Using a quick sketch or pixel perfect visual design depends on what's needed to get the job done.",
      "link": "Read More"
    },
    {
      "panel": "project-managment",
      "color": "rgba(89, 60, 132, 0.8)",
      "header": "Project",
      "subHeader": "Management",
      "body": "Agile, scrum, sprints, waterfall, kanban: whatever the buzzword of the day is, chances are I've probably tried it.",
      "link": "Read More"
    },
    {
      "panel": "development",
      "color": "rgba(81, 193, 175, 0.8)",
      "header": "Front-End",
      "subHeader": "Development",
      "body": "One of the my many hats, it ranges in size from beanie to ten gallon. It's more about the knowledge that I gain from wearing it that makes me a better designer.",
      "link": "Read More"
    }
];

// Menu overlay

$(function() {

    $('.toggle-nav').click(function() {
        $('.nav-wrap').toggleClass('show');
        $('header').toggleClass('show-menu');
        return false;
    });

});

// Panel overlay

$(function() {

  $('.page-link').click(function() {
    $('.site-wrap').toggleClass('open');
    $('header').toggleClass('show-page');
    return false;
  });

});

// Navigation on click

$(function () {

  navigationItems.on('click', function(event) {
    var selectedDot = $(this);
    var selectedPanel = $(this.hash);
    var panelNumber = $(this).attr('data-number');

    event.preventDefault();

    if (!selectedDot.hasClass('active-dot')) {
      changeDots(selectedDot);
      changeBackground(selectedPanel);
      changePanel(panelNumber);
    }

  });
});

function changeDots(selectedDot) {
    navigationItems.removeClass('active-dot');
    selectedDot.addClass('active-dot');
};

function changeBackground(selectedPanel) {
  backgroundPanels.removeClass('show');
  selectedPanel.addClass('show');
};

function changePanel(panelNumber) {
  $('.primary-header').text(panelData[panelNumber].header);
  $('.secondary-header').text(panelData[panelNumber].subHeader);
  $('.page-description').text(panelData[panelNumber].body);
  $('.panel').css('background-color', panelData[panelNumber].color);
  $('.dot-nav a, .last-name').css('color', panelData[panelNumber].color);
  $('.line').css('stroke', panelData[panelNumber].color);

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
