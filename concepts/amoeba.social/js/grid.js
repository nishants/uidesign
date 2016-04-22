(function () {
  "use strict"

  var Grid = function($container, gridBoxes, colWidth){
    this.$container = $container;
    this.gridBoxes  = gridBoxes;
    this.colWidth   = colWidth;
    this.columns    = [];
  };

  Grid.prototype.collect = function(){
    this.columns.length = this.$container.width()/this.colWidth;
  };

  window.Grid = Grid;
}).call(this);