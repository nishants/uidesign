describe("Grid", function(){
  var gridBoxMock = function(height, stateName){
        var $gridBox  = {
              height: function(){return height;},
              css: function(){},
              hasClass: function(name){return name === stateName;}
            },
            gridBox = new GridBox($gridBox);
        spyOn(gridBox, "setPosition");
        spyOn(gridBox, "applyPosition");

        return gridBox;
      },

      $containerOfWidth = function(width){
        return {
          width : function(){return width;},
          height : function(){}
        };
      },

      colWidth        = 30,
      containerWidth  = 95,
      expectedColumns = 3,
      expectedHeight  = 56,
      stateName       = "current-state",
      $container,
      gridBoxes ,
      grid;


  beforeEach(function(){
    $container      = $containerOfWidth(containerWidth);
    gridBoxes       = [gridBoxMock(20, stateName), gridBoxMock(25, stateName), gridBoxMock(36, stateName),
                       gridBoxMock(35, stateName), gridBoxMock(25, stateName), gridBoxMock(20, stateName),
                       gridBoxMock(99, "box-to-ignore"), gridBoxMock(21, "box-to-ignore")];
    grid            = new Grid($container, gridBoxes, colWidth)
    spyOn($container, "height");
  });

  it("should arrange boxes by grid layout on grid.arrange()", function(){
    grid.collect(stateName);
    grid.arrange();

    expect(gridBoxes[0].applyPosition).toHaveBeenCalled();
    expect(gridBoxes[1].applyPosition).toHaveBeenCalled();
    expect(gridBoxes[2].applyPosition).toHaveBeenCalled();

    expect(gridBoxes[3].applyPosition).toHaveBeenCalled();
    expect(gridBoxes[4].applyPosition).toHaveBeenCalled();
    expect(gridBoxes[5].applyPosition).toHaveBeenCalled();

    expect($container.height).toHaveBeenCalledWith(expectedHeight);

    expect(grid.height).toBe(expectedHeight);

  });

  it("should collect and arrange state, on adding new box to grid", function(){

  });

  it("should calculate grid dimensions on grid.calculate", function(){
    grid.collect(stateName);

    expect(grid.columns.length).toBe(expectedColumns);

    expect(gridBoxes[0].setPosition).toHaveBeenCalledWith(0,0);
    expect(gridBoxes[1].setPosition).toHaveBeenCalledWith(colWidth,0);
    expect(gridBoxes[2].setPosition).toHaveBeenCalledWith(2 * colWidth,0);

    expect(gridBoxes[3].setPosition).toHaveBeenCalledWith(0,            gridBoxes[0].height());
    expect(gridBoxes[4].setPosition).toHaveBeenCalledWith(colWidth,     gridBoxes[1].height());
    expect(gridBoxes[5].setPosition).toHaveBeenCalledWith(2 * colWidth, gridBoxes[2].height());

    expect(grid.height).toBe(expectedHeight);
  });
});
