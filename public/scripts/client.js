/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = (tweetData) => {
  const markup = `
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

  return $(markup);
};