/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = (tweetData) => {
  const tweetMarkup = `
  <article class="tweet">
    <header>
      <div class="user-display">
        <img class="user-avatar" src="${tweetData.user.avatars}"> 
        <span class="user-nickname">${tweetData.user.name}</span>
      </div>
      <span class="user-handle">${tweetData.user.handle}</span>
    </header>
    <span class="tweet-content">${tweetData.content.text}</span>
    <footer>
      <span class="post-time">${tweetData.created_at}</span>
      <div class="actions">
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
    </footer>
  </article>
  `;

  return $(tweetMarkup);
};

// append an array of tweets to the timeline
const renderTweets = (tweets) => {
  for (const tweet of tweets) {
    $('#timeline').append(createTweetElement(tweet));
  }
};

// fetch tweets array from /tweets and append them to the timeline
const loadTweets = () => {
  $.ajax('/tweets', { method: 'GET' })
    .then((tweets) => {
      $('#timeline').empty();
      renderTweets(tweets.reverse());
    });
};

$(document).ready(() => {
  // setup ajax-based request for new tweet form
  const $tweetForm = $('.new-tweet form');
  $tweetForm.on('submit', (event) => {
    event.preventDefault();
    const $input = $tweetForm.find('#tweet-text');
    if (!$input.val()) {
      alert('Cannot submit a tweet without content!');
    } else if ($input.val().length > 140) {
      alert('Tweet cannot be longer than 140 characters!');
    } else {
      const queryString = $tweetForm.serialize();
      $.ajax('/tweets', { method: 'POST', data: queryString })
        .then(loadTweets);
      $tweetForm.trigger('reset');
    }
  });

  loadTweets();
});