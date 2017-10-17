$(document).ready(function() {
  $("form > textarea").on("keyup", function() {
    var charsCount = $(this).val().length;
    var charsLeft = 140 - charsCount;
    var counter = $(this).closest($("form")).find($("span"));
    counter.text(charsLeft);
    if (charsLeft < 0) {
      counter.addClass("counter-red");
    } else {
      counter.removeClass("counter-red");
    }
  });
});

