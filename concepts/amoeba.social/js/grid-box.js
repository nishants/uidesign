(function () {
  "use strict"

  var GridBox = function($gridbox){
    this.$gridbox = $gridbox;
  };

  GridBox.prototype.setPosition = function(x,y){
    this.xPosition = x;
    this.yPosition = y;
  };

  GridBox.prototype.height = function(){
    return this.$gridbox.height();
  };

  GridBox.prototype.applyPosition = function(){
    this.$gridbox.css("transform", "translateX("+this.xPosition+")" + " translateY("+this.yPosition+")")
  };

  window.GridBox = GridBox;
}).call(this);