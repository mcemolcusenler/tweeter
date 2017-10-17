$(document).ready(function() {
  $("form > textarea").on("keyup", function() {
    var charsCount = $(this).val().length;
    var charsLeft = 140 - charsCount;
    $('.counter').text(charsLeft);
  });
});

