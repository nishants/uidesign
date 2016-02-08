(function(){
  "use strict"
  var createPlayer = function($player){
    var $slider     = $player.find("> ul.slider");
    var $slides     = $slider.find(" > li");
    var playerWidth = $player.width();
    var sliderWidth = playerWidth * $slides.length;
    var index       = 0;

    var resize      = function(){
      playerWidth = $player.width();
      sliderWidth = playerWidth * $slides.length;

      $slider.width(sliderWidth);
      $slides.width(playerWidth);
    };

    var reset       = function(){
      $player.css("overflow", "hidden");

      $slider.css("list-style", "none");
      $slider.css("margin", "0");
      $slider.css("padding", "0");
      $slider.css("display", "block");
      $slider.css("transform", "translateX(0px)");

      $slides.css("display", "block");
      $slides.css("float", "left");
    };

    reset();
    resize();

    return {
      next    : function(){
        $slider.css("transform", "translateX(-" + (++index * playerWidth) + "px)");
      },
      play    : function(interval){
        var player = this;
        setInterval(function(){
          player.next();
        }, interval);
      },
      previous: function(){
        $slider.css("transform", "translateX(-" + (--index * playerWidth) + "px)");
      },
    };
  };

  window.app.Player = {
    init: createPlayer
  };
}).call(this);