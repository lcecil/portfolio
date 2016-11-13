$(function() {

    // Bind a click event to anything with the class "toggle-nav"
    $('.toggle-nav').click(function() {

          // Toggle the Body Class "show-nav"
          $('body').toggleClass('show-nav');

          // Deactivate the default behavior of going to the next page on click
          return false;

    });
});

// $(function() {
//
//   $('.togggle-nav').click(function() {
//
//     if ($('body').hasClass('show-nav')) {
//
//       $('body').removeClass('show-nav').addClass('hide-nav');
//
//       setTimeout(function() {
//
//         $('body').removeClass('hide-nav');
//
//       }, 500);
//
//     }
//
//     else {
//
//       $('body').removeClass('hide-nav').addClass('show-nav');
//
//     }
//
//     return false;
//
//   });
//
// });
