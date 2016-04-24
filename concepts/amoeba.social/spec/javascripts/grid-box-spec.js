describe("GridBox", function(){

  it("should return height of box", function(){
    var $gridBox  = $mock({height : 103}),
        gridBox   = new GridBox($gridBox);

    expect(gridBox.height()).toEqual(103);
  });

  it("should be visible if element is marked with state name", function(){
    var stateName = "show-grid",
        $gridBox  = $mock({classes : [stateName]}),
        gridBox   = new GridBox($gridBox);

    expect(gridBox.visibleFor(stateName)).toBeTruthy();
    expect(gridBox.visibleFor("some-other")).toBeFalsy();
  });

  it("should set and apply position", function(){
    var $gridBox  = $mock(),
        gridBox   = new GridBox($gridBox);

    gridBox.setPosition(21, 45);
    gridBox.applyPosition();
    expect($gridBox.css("transform")).toBe("translateX(21px) translateY(45px)");
  });

  it("should calculate offset for top,left", function(){
    var leftOffset = 45;
    var topOffset = 21;
    var $gridBox  = $mock(),
        gridBox;

    $gridBox.css("left", leftOffset);
    $gridBox.css("top", topOffset);

    gridBox   = new GridBox($gridBox)
    gridBox.setPosition(145, 321);
    gridBox.applyPosition();
    expect($gridBox.css("transform")).toBe("translateX(100px) translateY(300px)");
  });
});
