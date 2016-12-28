// Panel colors
var panelData = {
  panels: [
    {
      color: '$panel-1',
      header: 'UX Design',
      sub-header: 'and Research',
      body: 'Techniques methodologies and designs for a wide range of projects and problems.'
    },
    {
      color: '$panel-2',
      header: 'Information',
      sub-header: 'Architecture',
      body: 'Content organization and structuring is the key to a successful application or website. Think of it as a card catalog for the 21st century.'
    },
    {
      color: '$panel-3',
      header: '',
      sub-header: '',
      body: ''
    },
    {
      color: '$panel-4',
      header: '',
      sub-header: '',
      body: ''
    },
    {
      color: '',
      header: '',
      sub-header: '',
      body: ''
    },
    {
      color: '',
      header: '',
      sub-header: '',
      body: ''
    }
  ]
  ['$panel-3', 'Research', 'Methods', 'From A/B Testing to user interviews and everything in between. Choosing the right method for the job is the name of the game here.'],
  ['$panel-4', 'Visual', 'Designs', "Communicating a design is as important as creating it. Using a quick sketch or pixel perfect visual design depends on what's needed to get the job done."],
  ['$panel-5', 'Project', 'Management', "Agile, scrum, sprints, waterfall, kanban: whatever the buzzword of the day is, chances are I've probably tried it."],
  ['$panel-6', 'Front-End', 'Development', "One of the my many hats, it ranges in size from beanie to ten gallon. It's more about the knowledge that I gain from wearing it that makes me a better designer."]
]};

var panelIndex = 0;


// Menu overlay

$(function() {

    $('.toggle-nav').click(function() {
        $('.site-wrap').toggleClass('open');
        $('.nav-wrap').toggleClass('open');
        return false;
    });

});

// Navigation

// When the user wants change the view to a different panel, we need to:
// 1. Get the ID of the current panel
// 2. On click / On scroll
// 2a. Get the ID of the selected panel
// 2b. Update the dot navigation
// 2c. Add the animation class
// 2d. Check if the selected panel is below or above the current panel
// 3. Get the text of that panel
// 4. Slide the selected panel, either up or down, into the viewport
// 4a. Slide the panel up
// 4b. Slide the panel down
// 5. Fade the color of the current panel to the color of the selected panel
// 6. Fade out the text of the current panel
// 7. Fade in the text of the selected panel

$(function () {
  var contentSections = $('.panel');
  var navigationItems = $('.dot-nav a');
  var currentPanel = $('.active-dot').attr('href');

  navigationItems.on('click', function(event) {
    var selectedDot = $(this);
    var selectedPanelID = $(this.hash);

    event.preventDefault();

    if (!selectedDot.hasClass('active-dot')) {
      navigationItems.removeClass('active-dot');
      selectedDot.addClass('active-dot');
    }

    smoothScroll(selectedPanelID);
  });

  function changePanel (event) {

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

});
