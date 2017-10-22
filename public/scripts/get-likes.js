//adds a handler for the like button
$(document).ready(function() {
  $('#all-tweets').on('click', '.fa-heart', function() {
    $(this).toggleClass('red');   //as soon as the button is clicked, we assign the red class
    var likes = $(this).data().likes;
    var likesObj = {
      likes: likes
    };
    var tweetID = $(this).data().id;
    var hasClassRed = $(this).hasClass('red');  //store the Boolean if the heart icon has class red
    if(hasClassRed) {
      likesObj.likes = 1; //if icon has the class, then its like is set to 1
    } else {
      likesObj.likes = 0; //if icon has not the class, then its like is set to 0
    }

    $.ajax({
      method: "POST",
      url: `/tweets/${tweetID}`,
      data: {likesObj},
      success: function(likesObj) {
        $twitLikes = likesObj.likes;  //we update the num of likes, this goes to app.js
      }
    })

  });
});