describe("Grid", function(){
  var $grid     ,
      stateName,
      domelement,
      $newBox ,
      expectedBoxes,
      grid ;

  beforeEach(function(){
    $grid       = $mock();
    stateName   = "current-show-state";
    domelement  = {id: "domeNoe"};
    $newBox     = $(domelement);
    expectedBoxes= [];
    grid        = {collect: function(){}, setGridBoxes : function(boxes){
      boxes.forEach(function(box, index){
        expect(box).toBe(expectedBoxes[index]);
      });
    }};

  });

  it("should update grid when new grid-box is inserted", function(){
    spyOn(grid, "collect");
    spyOn(grid, "setGridBoxes");

    new GridKeeper($grid, grid);

    $newBox.addClass(stateName);
    $newBox.addClass("grid-box");

    $grid.trigger("DOMNodeInserted", {delegateTarget: $grid, target: domelement});
    expect(grid.setGridBoxes).toHaveBeenCalled();
    expect(grid.collect).toHaveBeenCalled();
  });

  it("should ignore dom update if new element is not a grid-box", function(){
    spyOn(grid, "collect");

    new GridKeeper($grid, grid);

    $grid.trigger("DOMNodeInserted", {delegateTarget: $grid, target: domelement});
    expect(grid.collect).not.toHaveBeenCalled();
  });

});
