var panelData = [
    {
      "class": "panel-1",
      "header": "UX Design",
      "subHeader": "and Research",
      "body": "Techniques methodologies and designs for a wide range of projects and problems.",
      "link": "About Me"
    },
    {
      "class": "panel-2",
      "header": "Information",
      "subHeader": "Architecture",
      "body": "Content organization and structuring is the key to a successful application or website. Think of it as a card catalog for the 21st century.",
      "link": "Read More"
    },
    {
      "class": "panel-3",
      "header": "Research",
      "subHeader": "Methods",
      "body": "From A/B Testing to user interviews and everything in between. Choosing the right method for the job is the name of the game here.",
      "link": "Read More"
    },
    {
      "class": "panel-4",
      "header": "Visual",
      "subHeader": "Designs",
      "body": "Communicating a design is as important as creating it. Using a quick sketch or pixel perfect visual design depends on what's needed to get the job done.",
      "link": "Read More"
    },
    {
      "class": "panel-5",
      "header": "Project",
      "subHeader": "Management",
      "body": "Agile, scrum, sprints, waterfall, kanban: whatever the buzzword of the day is, chances are I've probably tried it.",
      "link": "Read More"
    },
    {
      "class": "panel-6",
      "color": "rgba(81, 193, 175, 0.8)",
      "header": "Front-End",
      "subHeader": "Development",
      "body": "One of the my many hats, it ranges in size from beanie to ten gallon. It's more about the knowledge that I gain from wearing it that makes me a better designer.",
      "link": "Read More"
    }
];
var navigationItems = $('.dot-nav a');
var backgroundPanels = $('.background-image');
var currentBackgroundPanel = $('.active-dot').attr('href');
var currentFixedPanel = panelData[0].class;


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
    var selectedBackground = $(this).attr('href');
    var selectedPanel = $(this).attr('data-number');

    event.preventDefault();

    if (!selectedDot.hasClass('active-dot')) {
      changeDots(selectedDot);
      changeBackground(selectedBackground);
      changePanel(selectedPanel);
    }

  });
});

function changeDots(selectedDot) {
    navigationItems.removeClass('active-dot');
    selectedDot.addClass('active-dot');
};

function changeBackground(selectedBackground) {
  backgroundPanels.removeClass('show');
  $(selectedBackground).addClass('show');
};

function changePanel(selectedPanel) {
  var int = parseInt(selectedPanel);
  $('.primary-header').text(panelData[int].header);
  $('.secondary-header').text(panelData[int].subHeader);
  $('.page-description').text(panelData[int].body);
  $('.page-link').text(panelData[int].link);

  $('.panel').removeClass(currentFixedPanel);
  $('.panel').addClass(panelData[int].class);

  currentFixedPanel = panelData[int].class;
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
