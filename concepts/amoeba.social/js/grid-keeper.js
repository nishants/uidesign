(function () {
  "use strict"
  var GridKeeper = function($grid, grid){
    $grid.on("DOMNodeInserted", function(event){
      var gridUpdated = $grid === event.delegateTarget,
          gridAdded   = $(event.target).hasClass("grid-box");

      if(gridAdded && gridUpdated){
        grid.setGridBoxes() ;
        grid.collect();
      }
    });
  };

  window.GridKeeper = GridKeeper;
}).call(this);