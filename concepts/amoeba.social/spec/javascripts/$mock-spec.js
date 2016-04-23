describe("$mock", function(){

  it("should return same element for a selector, every time", function(){
    var $grid = $(".grid");
    expect($grid == $(".grid")).toBe(true);
    expect($grid == $(".grid")).toBe(true);
  });

  it("should allow find(selector)", function(){
    var $target = $(".abc");
    var childred = [{id: 1}, {id: 2}];
    $target.find(".xyz", childred);
    expect($target.find(".xyz")).toBe(childred);
  });

  it("should allow $(window)", function(){
    expect($(window) == $(window)).toBe(true)
  });

});
