(function () {
  "use strict"
  app.service("ui", function () {
    var initialMessage = "Swipe a card left, just like tinder",
        swiping = "Swiping away card-",
        swiped = "Swiped away card-";

    return {
      ready: true,
      message: initialMessage,
      whileSwipingOut: function (index) {
        this.message = swiping + index;
      },
      onSwipeOut: function (index) {
        this.message = swiped + index;
      }
    };
  });
}).call(this);