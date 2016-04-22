(function () {
  "use strict"

  var Grid = function(){
    this.dimensions = null;
  };
  Grid.prototype.collect = function(){
    this.dimensions = {}
  };
  window.Grid = Grid;
}).call(this);