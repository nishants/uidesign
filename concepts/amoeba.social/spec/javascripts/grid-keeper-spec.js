describe("Grid", function(){
  var $grid     ,
      stateName,
      domelement,
      $newBox ,
      grid ;

  beforeEach(function(){
    $grid       = $mock();
    stateName   = "current-show-state";
    domelement  = {id: "domeNoe"};
    $newBox     = $(domelement);
    grid        = {collect: function(){}};
  });

  it("should update grid when new grid-box is inserted", function(){
    spyOn(grid, "collect");

    new GridKeeper($grid, grid);

    $newBox.addClass(stateName);
    $newBox.addClass("grid-box");

    $grid.trigger("DOMNodeInserted", {delegateTarget: $grid, target: domelement});
    expect(grid.collect).toHaveBeenCalled();
  });

  it("should ignore dom update if new element is not a grid-box", function(){
    spyOn(grid, "collect");

    new GridKeeper($grid, grid);

    $grid.trigger("DOMNodeInserted", {delegateTarget: $grid, target: domelement});
    expect(grid.collect).not.toHaveBeenCalled();
  });

});
