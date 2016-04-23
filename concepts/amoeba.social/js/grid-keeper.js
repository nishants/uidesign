(function () {
  "use strict"
  var GridKeeper = function($grid, grid){
    var
        gridBoxes = function () {
          var boxes = $grid.find(".grid-box"), result = [];
          for (var i = 0; i < boxes.length; i++) {
            result.push(new GridBox($(boxes[i])));
          }
          return result;
        },
        updateGrid = function () {
          grid.setGridBoxes(gridBoxes());
          grid.collect();
        };

    $grid.on("DOMNodeInserted", function(event){
      var gridUpdated = $grid === event.delegateTarget,
          gridAdded   = $(event.target).hasClass("grid-box");

      if(gridAdded && gridUpdated){
        grid.setGridBoxes(gridBoxes()) ;
        grid.collect();
      }
    });

    updateGrid();
  };

  window.GridKeeper = GridKeeper;
}).call(this);