describe("Grid Keeper", function(){
  var $grid     ,
      stateName,
      newDomelement,
      $oldBox,
      $newBox ,
      oldDomelement,
      expectedBoxes,
      grid ;

  beforeEach(function(){
    $grid       = $mock();
    stateName   = "current-show-state";
    newDomelement  = {id: "domeNoe"};
    $newBox     = $(newDomelement);
    $oldBox     = $(oldDomelement);
    expectedBoxes= [];
    grid        = {collect: function(){},
      setGridBoxes : function(boxes){
      boxes.forEach(function(box, index){
        expect(box.$gridbox).toBe($(expectedBoxes[index]));
      });
    }};

  });

  it("should set gridboxes on grid", function(){
    spyOn(grid, "collect");
    spyOn(grid, "setGridBoxes").and.callThrough();

    expectedBoxes = [oldDomelement];
    $grid.find(".grid-box", [oldDomelement]);

    new GridKeeper($grid, grid);
    expect(grid.setGridBoxes).toHaveBeenCalled();
    expect(grid.collect).toHaveBeenCalled();
  });

  it("should set gridboxes on grid, on inserting new gridbox", function(){
    spyOn(grid, "collect");
    spyOn(grid, "setGridBoxes").and.callThrough();

    expectedBoxes = [oldDomelement];
    $grid.find(".grid-box", [oldDomelement]);

    new GridKeeper($grid, grid);
    expect(grid.setGridBoxes).toHaveBeenCalled();
    expect(grid.collect).toHaveBeenCalled();

    $newBox.addClass("grid-box");
    expectedBoxes = [oldDomelement, newDomelement];
    $grid.find(".grid-box", [oldDomelement, newDomelement]);
    $grid.trigger("DOMNodeInserted", {delegateTarget: $grid, target: newDomelement});
    expect(grid.setGridBoxes).toHaveBeenCalled();
  });

});
