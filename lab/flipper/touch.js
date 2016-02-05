(function(){
  "use strict"
  var Touch = function($e, callbacks){
    var swipeDistance = callbacks.swipeDistance || 30,
          touchedAt = function (e) {
          return {
            x: e.originalEvent.touches[0].pageX,
            y: e.originalEvent.touches[0].pageY
          };
    }, startPosition = null, lastPosition = null;

    $e.on("touchstart", function(e){
      startPosition = touchedAt(e);
      lastPosition  = startPosition;
      callbacks.begin(startPosition);
    });

    $e.on("touchmove", function(e){
      var position = touchedAt(e);
      var offset = {
        x: startPosition.x - position.x,
        y: startPosition.y - position.y,
      };
      lastPosition  = position;
      callbacks.move(offset);
    });

    $e.on("touchend", function(e){
      var distance = lastPosition.y - startPosition.y,
          swipe    = Math.abs(distance) > swipeDistance,
          swipeUp  = distance < 0;
      swipe ? ( swipeUp ? callbacks.swipeUp() : callbacks.swipeDown() ) : "";
      callbacks.end(e);
    });
  };
  window.Touch = Touch;
}).call(this);