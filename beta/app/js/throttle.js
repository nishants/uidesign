(function(){
  "use strict"
  var Throttle = function(speed){
    this.speed = speed;
    this.timer = undefined;
  };

  Throttle.prototype.push = function(taskFunction){
    clearTimeout(this.timer);
    this.timer = setTimeout(taskFunction, this.speed);
  };

  window.Throttle = {
      at: function(speed){
        return new Throttle(speed);
      },
  };
}).call(this);