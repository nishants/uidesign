describe("Grid", function(){
  var gridBoxMock = function(height, stateName){
        var $gridBox  = {
              height: function(){return height;},
              css: function(){},
              hasClass: function(name){return name === stateName;}
            },
            gridBox = new GridBox($gridBox);
        spyOn(gridBox, "setPosition");

        return gridBox;
      },

      $containerOfWidth = function(width){
        return {
          width : function(){return width;}
        };
      };

  it("should calculate grid dimensions on grid.calculate", function(){
    var
        colWidth        = 30,
        containerWidth  = 90,
        expectedColumns = containerWidth/colWidth,
        expectedHeight  = Math.max(20 + 35, 25 + 25, 36 + 20 ),
        $container      = $containerOfWidth(containerWidth),
        gridBoxes       = [gridBoxMock(20), gridBoxMock(25), gridBoxMock(36),
                           gridBoxMock(35), gridBoxMock(25), gridBoxMock(20)],
        grid            = new Grid($container, gridBoxes, colWidth);

    grid.collect();

    expect(grid.columns.length).toBe(expectedColumns);

    expect(gridBoxes[0].setPosition).toHaveBeenCalledWith(0,0);

    //expect(grid.height).toBe(expectedHeight);
  });
});
