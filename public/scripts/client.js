$(document).ready(function () {

  // Loops through array and prepends each tweet to .posted-tweets
  const renderTweets = function (data) {
    // clears tweets before rendering posted-tweets
    $('.posted-tweets').empty();
    for (let user of data) {
      const tweetElement = createTweetElement(user);
      $('.posted-tweets').prepend(tweetElement);
    }
  }

  // Prevent Cross-Site Scripting (XSS)
  const escape = function (str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  const createTweetElement = function (tweetData) {
    const user = tweetData;

    // Date difference in days
    const parsedDate = Math.round(Math.abs((new Date() - new Date(user.created_at)) / (1000 * 3600 * 24)));

    // Create new tweet element
    let $tweet = `<article>
    <header>
      <div class="avatar">
        <img src="${user.user.avatars}">
        <h5>${user.user.name}</h5>
      </div>
      <h6 class="username">${user.user.handle}</h6>
    </header>
    <div>
      <p class="msg">${escape(user.content.text)}</p>
    </div>
    <footer>
      <p>${parsedDate} days ago</p>
      <span id="icons">
        <i class="fas fa-flag-alt"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </span>
    </footer>
  </article>`;

    return $tweet;
  }

  // Retrieve tweets from server
  const loadTweets = function () {
    const url = `http://localhost:8080/tweets`;

    $.ajax({
      method: 'GET',
      url: url
    })
      .then((result) => {
        renderTweets(result)
      })
      .catch((err) => console.log(err))
  };

  // Post new tweet
  const postTweet = function () {
    const url = `http://localhost:8080/tweets`;

    // Create POST Ajax request
    $.ajax({
      method: 'POST',
      url: url,
      data: $("form").serialize()
    })
      .then((result) => {
        // Refetch tweets without page refresh
        loadTweets();
      })
      .catch((err) => console.log(err));
  }

  $('#composeNewTweet').on('submit', function (event) {
    const $tweetBox = $(this).children('input[type="text"]');
    const $tweetLength = $tweetBox.val().length;

    if ($tweetBox.val() === '') {
      $('.error-box').hide().slideDown(500);
      $('.error').text('Tweet cannot be empty');
      event.preventDefault();
    } else if ($tweetLength > 140) {
      $('.error-box').hide().slideDown(500);
      $('.error').text('Tweet cannot be over 140 characters');
      event.preventDefault();
    } else {
      if ($('.error-box').is(':visible')) {
        $('.error-box').slideUp()
      }
      postTweet();
      event.preventDefault();
      $tweetBox.val('');
      $('#tweet-text').trigger('input');
    }
  })

  loadTweets()

});
