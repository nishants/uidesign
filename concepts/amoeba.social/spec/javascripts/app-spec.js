describe("App", function(){

  it("Should load url and apply state", function(){
    var $state  = {addClass: function(){ if(!this.removed) throw "should clear state";}, removeClass: function(){this.removed = true; }},
        states  = {parse: function(){}},
        grid    = {collect: function(){this.collected = true;}, arrange: function(){if(!this.collected) throw "should collect before arrange";}}
        app     = new App($state, states, grid);

    spyOn($state, "addClass").and.callThrough();
    spyOn(states,     "parse").and.returnValue({name: "state-name"});
    spyOn(grid,    "collect").and.callThrough();
    spyOn(grid,    "arrange").and.callThrough();

    app.loadUrl("#/state-id");

    expect($state.addClass).toHaveBeenCalledWith("state-name");
    expect(grid.collect).toHaveBeenCalledWith("state-name");
    expect(grid.arrange).toHaveBeenCalled();
  });

});
