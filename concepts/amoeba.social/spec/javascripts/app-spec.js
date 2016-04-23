describe("App", function(){

  it("Should apply state", function(){
    var $state  = {addClass: function(){ if(!this.removed) throw "should clear state";}, removeClass: function(){this.removed = true; }},
        states  = new States([{id: "state-id", name: "state-name"}, {id: "other-state-id", name: "other-state-name"}]),
        app     = new App($state, states);

    spyOn($state, "addClass").and.callThrough();

    app.apply(states.parse("#/state-id"));

    expect($state.addClass).toHaveBeenCalledWith("state-name");
  });

});
