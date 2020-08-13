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
        <span class="user-nickname"></span>
      </div>
      <span class="user-handle"></span>
    </header>
    <span class="tweet-content"></span>
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

  const $tweet = $(tweetMarkup);

  // safely handle text insertion
  $tweet.find('.user-nickname').text(tweetData.user.name);
  $tweet.find('.user-handle').text(tweetData.user.handle);
  $tweet.find('.tweet-content').text(tweetData.content.text);
  
  return $($tweet);
};

// append an array of tweets to the timeline
const renderTweets = (tweets) => {
  for (const tweet of tweets) {
    $('#timeline').prepend(createTweetElement(tweet));
  }
};

// fetch tweets array from /tweets and append them to the timeline
const loadTweets = () => {
  $.getJSON('/tweets')
    .then((tweets) => {
      $('#timeline').empty();
      renderTweets(tweets);
    });
};

const showTweetValidationError = (message) => {
  const $error = $('.new-tweet .error-field');
  $error.find('.error-text').text(message);

  if (!$error.hasClass('validation-error')) {
    $error.addClass('validation-error').hide();
    $error.slideDown();
  }
};

const hideTweetValidationError = () => {
  const $error = $('.new-tweet .error-field');
  $error.slideUp(() => {
    $error.removeClass('validation-error');
  });
};

// setup ajax-based request for new tweet form
const submitTweetHandler = function(event) {
  event.preventDefault();
  const $tweetForm = $(this);
  const $input = $tweetForm.find('#tweet-text');

  if (!$input.val()) {
    showTweetValidationError('Cannot submit a tweet without content!');
  } else if ($input.val().length > 140) {
    showTweetValidationError('Tweet cannot be longer than 140 characters!');
  } else {
    hideTweetValidationError();
    const queryString = $tweetForm.serialize();
    $.ajax('/tweets', { method: 'POST', data: queryString })
      .then(loadTweets);
    $tweetForm.trigger('reset');
  }
};

$(() => {
  const $newTweet = $('.new-tweet');
  const $tweetText = $('#tweet-text');
  const $logo = $('.main-navigation .logo');
  const $openCompose = $('.main-navigation .open-compose');
  const $returnCompose = $('#return-compose');
  
  // updates the visibility of openCompose, returnCompose, and logo based on screen size and position
  const updateButtonVisibility = function() {
    const screenWidth = $(window).width();
    const scrollHeight = $(window).scrollTop();
  
    if (screenWidth >= 1024 && scrollHeight > 60) {
      $logo.show();
      $openCompose.hide();
      $returnCompose.show();
    } else if (screenWidth < 1024 && scrollHeight > 420) {
      $logo.hide();
      $openCompose.hide();
      $returnCompose.show();
    } else {
      $logo.show();
      $openCompose.show();
      $returnCompose.hide();
    }
  };

  $(window).scroll(updateButtonVisibility);
  $(window).resize(updateButtonVisibility);

  // enable AJAX tweet form submission
  $newTweet.find('form').submit(submitTweetHandler);

  // cause open compose button to toggle visibility of new tweet form
  $('.main-navigation .open-compose').click(() => {
    $newTweet.slideToggle(() => {
      $tweetText.focus();
    });
  });

  $returnCompose.click(() => {
    if ($(window).width() < 1024) {
      $(window).scrollTop(410);
    } else {
      $(window).scrollTop(0);
    }
    $newTweet.hide();
    $newTweet.slideDown(() => {
      $tweetText.focus();
    });
  });

  loadTweets();
});