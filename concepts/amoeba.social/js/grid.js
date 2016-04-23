(function () {
  "use strict"

  var Grid = function($grid, colWidth){
    this.$grid      = $grid;
    this.gridBoxes  = [];
    this.colWidth   = colWidth;
    this.columns    = [];
    this.height     = 0;
    this.keeper     = null;
    var self        = this ;
    this.$grid.on("DOMNodeInserted", function(){
      self.__collect(self, self.__showState.name);
      self.arrange();
    });
  };

  Grid.prototype.setGridBoxes = function(boxes){
    this.gridBoxes = boxes;
  }

  Grid.prototype.showState = function(state){
    this.__showState  = state;
    this.keeper || (this.keeper = new GridKeeper(this.$grid, this)) ;
  }

  Grid.prototype.arrange = function(){
    this.__viewableBoxes.forEach(function(box){
      box.applyPosition();
    });
    this.$grid.height(this.height);
  };

  Grid.prototype.__collect = function(grid, stateName){
    var
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

  Grid.prototype.collect = function(){
    this.__collect(this, this.__showState.name);
  };

  window.Grid = Grid;
}).call(this);