$(() => {
  const $window = $(window);
  const $newTweet = $('.new-tweet');
  const $tweetText = $('#tweet-text');
  const $logo = $('.main-navigation .logo');
  const $openCompose = $('.main-navigation .open-compose');
  const $returnCompose = $('#return-compose');
  
  // updates the visibility of openCompose, returnCompose, and logo based on screen size and scroll position
  const updateButtonVisibility = function() {
    const screenWidth = $window.width();
    const scrollHeight = $window.scrollTop();
  
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

  $window.scroll(updateButtonVisibility);
  $window.resize(updateButtonVisibility);

  // cause open compose button to toggle visibility of new tweet form
  $openCompose.click(() => {
    $newTweet.slideToggle(() => {
      $tweetText.focus();
    });
  });

  $returnCompose.click(() => {
    if ($window.width() < 1024) {
      $window.scrollTop(410);
    } else {
      $window.scrollTop(0);
    }
    $newTweet.hide();
    $newTweet.slideDown(() => {
      $tweetText.focus();
    });
  });
});