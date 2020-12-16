$(document).ready(function () {
  // Coutner turns red when goes into he negative
  $("#tweet-text").on("input", function () {
    const maxLength = 140;
    const currentLength = $(this).val().length;
    const difference = maxLength - currentLength;

    $(".counter").text(difference);

    if (difference < 0) {
      $(".counter").addClass("negative");
    } else {
      $(".counter").removeClass("negative");
    }
  });
});