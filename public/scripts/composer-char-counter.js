$(() => {
  const $inputBox = $('#tweet-text');

  const updateCounter = () => {
    const charsLeft = 140 - $inputBox.val().length;
    const $counter = $inputBox.parent().find('.counter');
    $counter.text(charsLeft);
    if (charsLeft < 0) {
      $counter.addClass("over-limit");
    } else {
      $counter.removeClass("over-limit");
    }
  };

  $inputBox.on('keyup', updateCounter);

  // ensure counter has accurate count on page load
  updateCounter();
});