(function(){
  "use strict"
  var createPlayer = function($player){
    var $slider      = $player.find("> ul.slider");
    var $slides      = $slider.find(" > li");
    var playerWidth  = $player.width();
    var playerHeight = $player.height();
    var sliderWidth  = playerWidth * $slides.length;
    var index        = 0;

    var resize      = function(){
      playerWidth = $player.width();
      sliderWidth = playerWidth * $slides.length;

      $slides.width(playerWidth);
      $slider.width(sliderWidth);
    };

    var reset       = function(){
      index = 0;
      $player.css("overflow", "hidden");
      $slides.css("overflow", "hidden");

      $slider.css("list-style", "none");
      $slider.css("margin", "0");
      $slider.css("padding", "0");
      $slider.css("display", "block");
      $slider.css("transition", "transform 500ms cubic-bezier(0.42, 0, 0.58, 1)");
      $slider.css("transform", "translateX(0px)");

      $slides.css("display", "block");
      $slides.css("float", "left");
    };
    reset();
    resize();
    $(window).resize(function(){
      reset();
      resize();
    });
    return {
      next    : function(){
        index == $slides.length-1 ? index = 0 : index++;
        $slider.css("transform", "translateX(-" + (index * playerWidth) + "px)");
      },
      play    : function(interval){
        var player = this;
        setInterval(function(){
          player.next();
        }, interval);
      },
      previous: function(){
        index == 0 ? index = $slides.length-1 : index--;
        $slider.css("transform", "translateX(-" + (index * playerWidth) + "px)");
      },
    };
  };

  window.app.Player = {
    init: createPlayer
  };
}).call(this);