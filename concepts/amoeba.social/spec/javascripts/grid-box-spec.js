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

    spyOn($gridBox, "css");

    gridBox.setPosition(21, 45);
    expect($gridBox.css).not.toHaveBeenCalled();

    gridBox.applyPosition();
    expect($gridBox.css).toHaveBeenCalledWith("transform", "translateX(21px) translateY(45px)");
  });
});
