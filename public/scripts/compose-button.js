//below we have a slideToggle which slidesDown the new-tweet and then up

$(document).ready(function() {
  var $composeButton = $("#nav-bar > button");
  var $textArea = $(".new-tweet form > textarea");
  $composeButton.on("click", function() {
    $(".new-tweet").slideToggle("medium", function() {
      $textArea.focus();
    });
  })
});