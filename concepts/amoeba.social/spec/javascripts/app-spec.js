describe("App", function(){

  it("Should apply state", function(){
    var $state  = {addClass: function(){ if(!this.removed) throw "should clear state";}, removeClass: function(){this.removed = true; }},
        states  = new States([{id: "state-id", name: "state-name"}, {id: "other-state-id", name: "other-state-name"}]),
        grid    = {collect: function(){this.collected = true;}, arrange: function(){if(!this.collected) throw "should collect before arrange";}}
        app     = new App($state, grid);

    spyOn($state, "addClass").and.callThrough();
    spyOn(grid,   "collect").and.callThrough();
    spyOn(grid,   "arrange").and.callThrough();

    app.apply(states.parse("#/state-id"));

    expect($state.addClass).toHaveBeenCalledWith("state-name");
    expect(grid.collect).toHaveBeenCalledWith("state-name");
    expect(grid.arrange).toHaveBeenCalled();
  });

});
