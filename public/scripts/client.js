/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

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
      <p class="msg">${user.content.text}</p>
    </div>
    <footer>
      <p>${parsedDate} days ago</p>
      <span>
        <i class="fas fa-flag-alt"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </span>
    </footer>
  </article>`;

    return $tweet;
  }








  // Test / driver code (temporary). Eventually will get this from the server.
  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  }

  const $tweet = createTweetElement(tweetData);
  // Add to page
  $('.posted-tweets').append($tweet);


});
