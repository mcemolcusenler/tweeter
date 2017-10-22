$(document).ready(function() {
  $('#all-tweets').on('click', '.fa-heart', function() {
    $(this).toggleClass('red');
    var likes = $(this).data().likes;
    var likesObj = {
      likes: likes
    };
    var tweetID = $(this).data().id;
    var hasClassRed = $(this).hasClass('red');
    if(hasClassRed) {
      likesObj.likes = 1;
    } else {
      likesObj.likes = 0;
    }

    $.ajax({
      method: "POST",
      url: `/tweets/${tweetID}`,
      data: {likesObj},
      success: function(likesObj) {
        $twitLikes = likesObj.likes;
      }
    })

  });
});