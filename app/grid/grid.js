(function () {
  "use strict"
  // if element has data-grid-id, ignore,
  // if it doesn't, create gidbox for it, and add to map

  var ids = 0,
      readFrom = function ($grid, map) {
        var boxes = $grid.find(".grid-box"),
            result = [];

        for (var i = 0; i < boxes.length; i++) {
          var $box = $(boxes[i]);
          $box.attr("data-grid-id") || function(){
            var id = ids++;
            $box.attr("data-grid-id", id);
            map[id] = new GridBox($box)
          }();
        }

        for(var id in map){
          result.push(map[id]);
        }
        return result;
      };

  var Grid = function($grid, colWidth){
    this.$grid      = $grid;
    this.gridBoxes  = [];
    this.colWidth   = colWidth;
    this.columns    = [];
    this.height     = 0;
    this.gridBoxMap = {};
    var self        = this ;
    this.$grid.css("overflow", "hidden");
    this.$grid.on("DOMNodeInserted", function(){
      self.__setGridBoxes(readFrom($grid, self.gridBoxMap));
      self.__collect(self, self.__showState.name);
      self._arrange();
    });
  };

  Grid.prototype.__setGridBoxes = function(boxes){
    this.gridBoxes = boxes;
  }

  Grid.prototype.showState = function(state){
    this.__showState  = state;
    this.$grid.trigger("DOMNodeInserted");
  }

  Grid.prototype._arrange = function(){
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

  window.Grid = Grid;
}).call(this);