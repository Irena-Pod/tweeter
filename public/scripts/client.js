$(document).ready(function () {
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
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
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Test User 3",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@tu3" },
      "content": {
        "text": "test tweet"
      },
      "created_at": 1607974412000
    }
  ]

  // Loops through array and prepends each tweet to .posted-tweets
  const renderTweets = function (data) {
    for (let user of data) {
      const tweetElement = createTweetElement(user);
      $('.posted-tweets').prepend(tweetElement);
    }
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

  renderTweets(data);

});
