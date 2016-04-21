describe("GridBox", function(){
  var fakeGridElement = function(){
    return {
      property: null,
      value   : null,
      css: function (property, value) {
        this.property = property;
        this.value    = value;
      },
      applied : function(){
        return {property: this.property, value: this.value};
      }
    };
  };

  it("should set and apply position", function(){
    var
        $gridBox  = fakeGridElement(),
        gridBox   = new GridBox($gridBox);

    gridBox.setPosition(21, 45);
    expect($gridBox.applied().property).toBeNull();
    expect($gridBox.applied().value).toBeNull();

    gridBox.applyPosition();
    expect($gridBox.applied().property).toEqual("transform");
    expect($gridBox.applied().value).toBe("translateX(21) translateY(45)");
  });
});
