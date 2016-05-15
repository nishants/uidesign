(function () {
  "use strict"

  var GridBox = function($grid, $gridbox){
    this.$grid    = $grid;
    this.$gridbox = $gridbox;
    var offsetX = parseInt($gridbox.css("left"));
    var offsetY = parseInt($gridbox.css("top"));
    this.offset = {
      x: offsetX ||0 ,
      y: offsetY ||0}

    var self      = this,
        toggleSelect = function(box){
          self.$gridbox.attr("data-grid-selected") ? self.unselect() : self.select()
        };

    $gridbox.click(toggleSelect);
  };

  GridBox.prototype.unselect = function(){
    this.applyPosition();
    this.$gridbox.attr("data-grid-selected", null);
    $("body").css("overflow", "auto");
  };

  GridBox.prototype.select = function(){
    var self      = this,
        $window   = $(window),
        scroll    = $window.scrollTop() < self.$grid.offset().top,
        selectBox = function(){
          $("body").css("overflow", "hidden")
          var y = (self.yPosition - self.offset.y) - (self.$gridbox.offset().top - $window.scrollTop()),
              x = 0;
          self.__applyPosition(x,y);
          self.$gridbox.attr("data-grid-selected","true");
        };

        scroll && $('html, body').animate({scrollTop : this.$gridbox.offset().top}, 250, selectBox);
        scroll || selectBox();
  };

  GridBox.prototype.setPosition = function(x,y){
    this.xPosition = x;
    this.yPosition = y;
    this.__selected = true;
  };

  GridBox.prototype.height = function(){
    return this.$gridbox.height();
  };

  GridBox.prototype.visibleFor = function(stateName){
    return this.$gridbox.hasClass(stateName);
  };

  GridBox.prototype.__applyPosition = function(x,y){
    this.$gridbox.css("transform", "translateX("+x+"px)" + " translateY("+y+"px)")
  }

  GridBox.prototype.applyPosition = function(){
    var x = this.xPosition - this.offset.x,
        y = this.yPosition - this.offset.y;
    this.__applyPosition(x,y);
  };

  window.GridBox = GridBox;
}).call(this);