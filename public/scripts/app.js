/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  var data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 1461113796368
    }
    ];

  //prevent the default behaviour of getting redirected when submitting the form
  var $form = $(".new-tweet form");
  var $submitFormButton = $(".new-tweet form input[type=submit]");
  var $formContent = $(".new-tweet form textarea")
  $($form).submit(function(event) {
    event.preventDefault();
    var $testVar = $(this).serialize();
    console.log($testVar);
    $.ajax({
      method: "POST",
      url: "/tweets",
      data: $(this).serialize(),
      success: function(newPost) {
        console.log('hi');
        console.log(newPost)
        renderTweet([newPost]);
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
    var $createdAt = twitObject.created_at;
    var $pCreatedAt = $(`<p>${escapeXSS($createdAt)}</p>`);
    var $iFlag = $('<i class="fa fa-flag" aria-hidden="true"></i>');
    var $iRetweet = $('<i class="fa fa-retweet" aria-hidden="true"></i>');
    var $iHeart = $('<i class="fa fa-heart" aria-hidden="true"></i>');

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
    $sectionAllTweets.prepend($twitOutput);
  }

  //calling renderTweet
  var $storeTweet = renderTweet(data);
});