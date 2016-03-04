(function () {
  "use strict"

  var bindCard = function ($card) {
        var action = $card.find(".action"),
            button = action.find("button"),
            ripple = action.find(".ripple");

        button.on("mousedown touchstart", function () {
          ripple.addClass("burst");
          setTimeout(function () {
            ripple.removeClass("burst");
          }, 500);
        });

      },
      cardsFrom = function ($deck) {
        return $deck.find(" > li > .card");
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