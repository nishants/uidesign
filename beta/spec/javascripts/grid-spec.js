describe("Grid", function(){
  var
      $mockBox = function(height, stateName){
        return $mock({height : height, classes: [stateName]})
      },
      colWidth        = 30,
      containerWidth  = 95,
      expectedHeight  = 56,
      stateName       = "current-state",
      $container,
      $gridBoxes ,
      grid,
      appliedPosition = function(x, y){return "translateX("+x+"px)" + " translateY("+y+"px)";};


  beforeEach(function(){
    $container       = $mock({width: containerWidth});
    $gridBoxes       = [$mockBox(20, stateName), $mockBox(25, stateName), $mockBox(36, stateName),
                       $mockBox(35, stateName), $mockBox(25, stateName), $mockBox(20, stateName),
                       $mockBox(99, "box-to-ignore"), $mockBox(21, "box-to-ignore")];

    $container.find(".grid-box", $gridBoxes);
    $container.find(".phantom.grid-box", $mock({width: colWidth}));
  });

  it("should set col width from the phantom gridbox", function(){
    grid = new Grid($container);
    grid.showState({name: stateName});

    expect($container.height).toHaveBeenCalledWith(expectedHeight);

    expect($gridBoxes[0].css).toHaveBeenCalledWith("transform", appliedPosition(0,0));
    expect($gridBoxes[1].css).toHaveBeenCalledWith("transform", appliedPosition(colWidth,0));
    expect($gridBoxes[2].css).toHaveBeenCalledWith("transform", appliedPosition(2* colWidth,0));

    expect($gridBoxes[3].css).toHaveBeenCalledWith("transform", appliedPosition(0, $gridBoxes[0].height()));
    expect($gridBoxes[4].css).toHaveBeenCalledWith("transform", appliedPosition(colWidth, $gridBoxes[1].height()));
    expect($gridBoxes[5].css).toHaveBeenCalledWith("transform", appliedPosition(2*colWidth, $gridBoxes[2].height()));

    expect($gridBoxes[6].css).not.toHaveBeenCalledWith();
    expect($gridBoxes[7].css).not.toHaveBeenCalledWith();
  });

  it("should arrange boxes on set state", function(){
    grid = new Grid($container, colWidth);
    grid.showState({name: stateName});

    expect($container.height).toHaveBeenCalledWith(expectedHeight);

    expect($gridBoxes[0].css).toHaveBeenCalledWith("transform", appliedPosition(0,0));
    expect($gridBoxes[1].css).toHaveBeenCalledWith("transform", appliedPosition(colWidth,0));
    expect($gridBoxes[2].css).toHaveBeenCalledWith("transform", appliedPosition(2* colWidth,0));

    expect($gridBoxes[3].css).toHaveBeenCalledWith("transform", appliedPosition(0, $gridBoxes[0].height()));
    expect($gridBoxes[4].css).toHaveBeenCalledWith("transform", appliedPosition(colWidth, $gridBoxes[1].height()));
    expect($gridBoxes[5].css).toHaveBeenCalledWith("transform", appliedPosition(2*colWidth, $gridBoxes[2].height()));

    expect($gridBoxes[6].css).not.toHaveBeenCalledWith();
    expect($gridBoxes[7].css).not.toHaveBeenCalledWith();
  });

  it("should center align boxes, if grid is center aligned", function(){
    var expectedOffset = (containerWidth%colWidth)/2; /* elements must be at this left offset*/
    grid = new Grid($container, colWidth);

    $container.css("text-align", "center");
    grid.showState({name: stateName});

    expect(expectedOffset).not.toBe(0);
    expect($container.height).toHaveBeenCalledWith(expectedHeight);

    expect($gridBoxes[0].css).toHaveBeenCalledWith("transform", appliedPosition(expectedOffset + 0,0));
    expect($gridBoxes[1].css).toHaveBeenCalledWith("transform", appliedPosition(expectedOffset + colWidth,0));
    expect($gridBoxes[2].css).toHaveBeenCalledWith("transform", appliedPosition(expectedOffset + 2* colWidth,0));
    expect($gridBoxes[3].css).toHaveBeenCalledWith("transform", appliedPosition(expectedOffset + 0, $gridBoxes[0].height()));
    expect($gridBoxes[4].css).toHaveBeenCalledWith("transform", appliedPosition(expectedOffset + colWidth, $gridBoxes[1].height()));
    expect($gridBoxes[5].css).toHaveBeenCalledWith("transform", appliedPosition(expectedOffset + 2*colWidth, $gridBoxes[2].height()));

    expect($gridBoxes[6].css).not.toHaveBeenCalledWith();
    expect($gridBoxes[7].css).not.toHaveBeenCalledWith();
  });


});

