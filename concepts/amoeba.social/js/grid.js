(function () {
  "use strict"

  var Grid = function($container, gridBoxes, colWidth){
    this.$container = $container;
    this.gridBoxes  = gridBoxes;
    this.colWidth   = colWidth;
    this.columns    = [];
    this.height     = 0;
  };

  Grid.prototype.collect = function(stateName){
    var
        grid          = this,
        columnCount   = grid.$container.width()/grid.colWidth,
        gridHeight    = 0,
        nextColumn    = 0,
        viewableBoxes = grid.gridBoxes.filter(function(box){return box.visibleFor(stateName);});


    for(var i = 0; i < columnCount; i++){
      grid.columns[i] = {nexPosition: 0};
    }

    viewableBoxes.forEach(function(box){
      var
          column = grid.columns[nextColumn],
          x = nextColumn * grid.colWidth,
          y = column.nexPosition;

      box.setPosition(x, y);

      column.nexPosition += box.height();
      gridHeight          = Math.max(gridHeight, column.nexPosition);
      nextColumn          = (nextColumn + 1) % columnCount;
    });

    grid.height = gridHeight;
  };

  window.Grid = Grid;
}).call(this);