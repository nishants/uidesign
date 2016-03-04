(function () {
  "use strict"

  var bindCard = function ($card) {
        var action = $card.find(".action"),
            button = action.find("button"),
            ripple = action.find(".ripple");

        button.on("mousedown touchstart", function () {
          ripple.addClass("burst");
          button.css("transform","scale(0) rotate(720deg)")
          setTimeout(function () {
            ripple.removeClass("burst");
            button.css("transform","scale(1) rotate(0deg)")
          }, 500);
        });

      };


  window.Cards = {
    bind: function($card){
      bindCard($card);
    },
    read: function($deck){
      $deck.find(" > li > .card").each(function(index, card){
        bindCard($(card));
      });
    }
  };

}).call(this);