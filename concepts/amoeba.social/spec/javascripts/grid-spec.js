describe("Grid", function(){
  var gridBoxMock = function(){
        var $gridBox  = {css: function(){}},
            gridBox = new GridBox($gridBox);
      },
      gridBoxes = [gridBoxMock(), gridBoxMock(), gridBoxMock(), gridBoxMock(), gridBoxMock(), gridBoxMock()];

  it("should set grid.dimensions", function(){
    var grid = new Grid(gridBoxes);
    grid.collect();
    expect(grid.dimensions).not.toBeNull();
  });
});
