describe("GridBox", function(){

  it("should set and apply position", function(){
    var $gridBox  = {css: function(){}},
        gridBox   = new GridBox($gridBox);

    spyOn($gridBox, "css");

    gridBox.setPosition(21, 45);
    expect($gridBox.css).not.toHaveBeenCalled();

    gridBox.applyPosition();
    expect($gridBox.css).toHaveBeenCalledWith("transform", "translateX(21) translateY(45)");
  });
});
