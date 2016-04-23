(function () {
  "use strict"

  var Grid = function($grid, gridBoxes, colWidth){
    this.$grid      = $grid;
    this.gridBoxes  = gridBoxes;
    this.colWidth   = colWidth;
    this.columns    = [];
    this.height     = 0;
  };

  Grid.prototype.arrange = function(){
    this.__viewableBoxes.forEach(function(box){
      box.applyPosition();
    });
    this.$grid.height(this.height);
  };

  Grid.prototype.collect = function(stateName){
    var
        grid          = this,
        columnCount   = Math.floor(grid.$grid.width()/grid.colWidth),
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
    this.__viewableBoxes = viewableBoxes;
  };

  window.Grid = Grid;
}).call(this);