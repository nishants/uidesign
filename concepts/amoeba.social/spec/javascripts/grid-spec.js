describe("Grid", function(){
  var gridBoxMock = function(height){
        var $gridBox  = {
              height: function(){return height;},
              css: function(){}
            },
            gridBox = new GridBox($gridBox);
      },
      $containerOfWidth = function(width){
        return {
          width : function(){return width;}
        };
      } ;

  it("should set grid.dimensions", function(){
    var
        colWidth        = 30,
        containerWidth  = 90,
        expectedColumns = containerWidth/colWidth,
        expectedHeight  = Math.max(20 + 35, 25 + 25, 36 + 20 ),
        $container      = $containerOfWidth(containerWidth),
        gridBoxes       = [gridBoxMock(20), gridBoxMock(25), gridBoxMock(36), gridBoxMock(35), gridBoxMock(25), gridBoxMock(20)],
        grid            = new Grid($container, gridBoxes, colWidth);

    grid.collect();
    expect(grid.columns.length).toBe(3);
  });
});
