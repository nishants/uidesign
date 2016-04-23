describe("App", function(){
  var stateName = "state-name",
      $state  ,
      states,
      grid ;

  beforeEach(function(){
    states = {parse: function(){}}
    $state = $mock({classes: ["some-other-state"]});
    grid   = {collect: function(){this.collected = true;}, arrange: function(){if(!this.collected) throw "should collect before arrange";}}

    spyOn(states,     "parse").and.returnValue({name: stateName});
    spyOn(grid,    "collect").and.callThrough();
    spyOn(grid,    "arrange").and.callThrough();
  });

  it("Should load url on hashchange", function(){
    new App($state, states, grid);

    $(window).trigger("hashchange", {originalEvent: {newUrl: "#/state-id"}});

    expect($state.hasClass("state-name")).toBeTruthy();
    expect($state.hasClass("some-other-state")).toBeFalsy();
    expect(grid.collect).toHaveBeenCalledWith("state-name");
    expect(grid.arrange).toHaveBeenCalled();
  });

  it("Should load url and apply state", function(){
    var app     = new App($state, states, grid);

    app.loadUrl("#/state-id");

    expect($state.hasClass("state-name")).toBeTruthy();
    expect($state.hasClass("some-other-state")).toBeFalsy();
    expect(grid.collect).toHaveBeenCalledWith("state-name");
    expect(grid.arrange).toHaveBeenCalled();
  });

});
