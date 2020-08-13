$(document).ready(() => {
  const $inputBox = $('#tweet-text');
  $inputBox.on('keyup', function() {
    const charsLeft = 140 - $inputBox.val().length;
    const $counter = $inputBox.parent().find('.counter');
    $counter.text(charsLeft);
    if (charsLeft < 0) {
      $counter.addClass("over-limit");
    } else {
      $counter.removeClass("over-limit");
    }
  });
});