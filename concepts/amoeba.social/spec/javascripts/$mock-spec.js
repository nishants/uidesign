describe("$mock", function(){

  it("should return same element for a selector, every time", function(){
    var $grid = $(".grid");
    expect($grid == $(".grid")).toBe(true);
    expect($grid == $(".grid")).toBe(true);
  });

  it("should allow $(window)", function(){
    expect($(window) == $(window)).toBe(true)
  });

});
