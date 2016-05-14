(function () {
  "use strict"

  var GridBox = function($gridbox){
    this.$gridbox = $gridbox;
    var offsetX = parseInt($gridbox.css("left"));
    var offsetY = parseInt($gridbox.css("top"));
    this.offset = {
      x: offsetX ||0 ,
      y: offsetY ||0}
  };

  GridBox.prototype.setPosition = function(x,y){
    this.xPosition = x;
    this.yPosition = y;
  };

  GridBox.prototype.height = function(){
    return this.$gridbox.height();
  };

  GridBox.prototype.visibleFor = function(stateName){
    return this.$gridbox.hasClass(stateName);
  };

  GridBox.prototype.applyPosition = function(){
    var x = this.xPosition - this.offset.x,
        y = this.yPosition - this.offset.y;

    this.$gridbox.css("transform", "translateX("+x+"px)" + " translateY("+y+"px)")
  };

  window.GridBox = GridBox;
}).call(this);