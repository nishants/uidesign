describe("App", function(){

  it("Should load url and apply state", function(){
    var $state  = $mock({classes: ["some-other-state"]}),
        states  = {parse: function(){}},
        grid    = {collect: function(){this.collected = true;}, arrange: function(){if(!this.collected) throw "should collect before arrange";}}
        app     = new App($state, states, grid);

    spyOn(states,     "parse").and.returnValue({name: "state-name"});
    spyOn(grid,    "collect").and.callThrough();
    spyOn(grid,    "arrange").and.callThrough();

    app.loadUrl("#/state-id");

    expect($state.hasClass("state-name")).toBeTruthy();
    expect($state.hasClass("some-other-state")).toBeFalsy();

    expect(grid.collect).toHaveBeenCalledWith("state-name");
    expect(grid.arrange).toHaveBeenCalled();
  });

});
