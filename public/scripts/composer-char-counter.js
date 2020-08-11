$(document).ready(() => {
  const inputBox = $('#tweet-text');
  inputBox.on('keyup', function() {
    const charsLeft = 140 - $(this).val().length;
    const counter = $(this).parent().find('.counter');
    counter.text(charsLeft);
    if (charsLeft < 0) {
      counter.addClass("over-limit");
    } else {
      counter.removeClass("over-limit");
    }
  });
});