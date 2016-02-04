(function(){
  "use strict"
  var Touch = function($e, callbacks){
    var touchedAt = function (e) {
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
        x: lastPosition.x - position.x,
        y: lastPosition.y - position.y,
      };
      lastPosition  = position;
      callbacks.move(offset);
    });

    $e.on("touchend", function(e){
      callbacks.end(e);
    });
  };
  window.Touch = Touch;
}).call(this);