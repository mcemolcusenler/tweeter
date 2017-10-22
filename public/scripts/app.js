$(document).ready(function() {
  //prevent the default behaviour of getting redirected when submitting the form
  var $form = $(".new-tweet form");
  var $submitFormButton = $(".new-tweet form input[type=submit]");
  var $formContent = $(".new-tweet form textarea");
  var $counter = $(".counter");
  $($form).submit(function(event) {
    event.preventDefault();
    //in the if statements below, we're notifying the user if they have no input or more than 140 chars
    if ($counter.text() == 140) {
      alert('Ooops, it seems you did not inlcude an input!');
      return;
    }
    if ($counter.text() < 0) {
      alert('Ooops, it seems you have more than 140 characters!');
      return;
    }
    var $testVar = $(this).serialize();
    $.ajax({
      method: "POST",
      url: "/tweets",
      data: $(this).serialize(),
      success: function(newPost) {
        renderTweet([newPost]);
        $form[0].reset();
        $counter.text('140');
      }
    });
  });

  //the function below will escape XSS related issues
  var escapeXSS = function (str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  //the function below assembles and returns article for each object in our data array
  var createTextElement = function (twitObject) {
    var $article = $('<article>');
    var $header = $('<header>');
    var $userAvatar = twitObject.user.avatars.regular;
    var $image = $(`<img src="${escapeXSS($userAvatar)}">`);
    var $userName = twitObject.user.name;
    var $pUserName = $(`<p class="user-name">${escapeXSS($userName)}</p>`);
    var $userHandle = twitObject.user.handle;
    var $pUserHandle = $(`<p class="user-handle">${escapeXSS($userHandle)}</p>`);
    var $userContent = twitObject.content.text;
    var $pContent = $(`<p>${escapeXSS($userContent)}</p>`);
    var $footer = $('<footer>');
    var $createdAt = convertToDate(twitObject.created_at); //calls the momentjs function
    var $pCreatedAt = $(`<p>${escapeXSS($createdAt)}</p>`);
    var $twitID = twitObject["_id"];
    var $twitLikes = twitObject["likes"]; //gets updated by the AJAX post in the end
    var $iFlag = $('<i class="fa fa-flag" aria-hidden="true"></i>');
    var $iRetweet = $('<i class="fa fa-retweet" aria-hidden="true"></i>');
    var $iHeart = $(`<i class="fa fa-heart" aria-hidden="true"></i>`);
    $iHeart.attr('data-id', $twitID);
    $iHeart.attr('data-likes', $twitLikes);
    if ($twitLikes == 1) {
      $iHeart.addClass('red');
    }

    $header.append($image);
    $header.append($pUserName);
    $header.append($pUserHandle);
    $article.append($header);
    //above the header is made up. image, username and handle are appended to header which is appended to article.
    $article.append($pContent);
    //below the footer is made up. icons and timestamp are appended to footer which is appended to article.
    $footer.append($pCreatedAt);
    $footer.append($iFlag);
    $footer.append($iRetweet);
    $footer.append($iHeart);
    $article.append($footer);

    return $article;
  }

  //the function below will loop thru the array, and each article to our index.html
  var renderTweet = function (twitArray) {
    var $twitOutput = twitArray.map(createTextElement);
    var $sectionAllTweets = $("#all-tweets");
    $twitOutput.forEach(function(element) {
      $sectionAllTweets.prepend(element);
    })
  }

  //the function below will make a request to /tweets and receive the array of tweets as JSON

  var loadTweets = function () {
    $.ajax({
      method: "GET",
      url: "/tweets",
      dataType: "JSON",
      success: renderTweet
    });
  }

  loadTweets();
});