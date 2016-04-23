(function () {
  "use strict"
  var GridKeeper = function($grid, grid){
    $grid.on("DOMNodeInserted", function(event){
      var gridUpdated = $grid === event.delegateTarget,
          gridAdded   = $(event.target).hasClass("grid-box");

      gridAdded && gridUpdated && grid.collect();
    });
  };

  window.GridKeeper = GridKeeper;
}).call(this);