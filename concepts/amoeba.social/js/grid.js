(function () {
  "use strict"

  var Grid = function($container, gridBoxes, colWidth){
    this.$container = $container;
    this.gridBoxes  = gridBoxes;
    this.colWidth   = colWidth;
    this.columns    = [];
    this.height     = 0;
  };

  Grid.prototype.collect = function(){
    var columnCount = this.$container.width()/this.colWidth,
        gridHeight  = 0,
        nextColumn  = 0;

    for(var i = 0; i < columnCount; i++){
      this.columns[i] = {nexPosition: 0};
    }

    this.gridBoxes[0].setPosition(0,0);
  };

  window.Grid = Grid;
}).call(this);