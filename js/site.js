// Menu overlay

$(function() {

    $('.toggle-nav').click(function() {
        $('.site-wrap').toggleClass('open');
        $('.nav-wrap').toggleClass('open');
        return false;
    });

});

// Dot Navigation

$(function () {

  $('.dot-nav a').click(function () {

    $(this).children().addClass('active');

  });
});
