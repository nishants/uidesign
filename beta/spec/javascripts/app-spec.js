describe("App", function(){
  var stateName = "state-name",
      $state  ,
      states,
      state,
      grid ;

  beforeEach(function(){
    states = {parse: function(){}}
    $state = $mock({classes: ["some-other-state"]});
    grid   = {showState: function(){}}
    state =  {name: stateName};

    spyOn(states,     "parse").and.returnValue(state);
    spyOn(grid,    "showState").and.callThrough();
  });

  it("Should load url on hashchange", function(){
    new App($state, states, grid);

    $(window).trigger("hashchange", {originalEvent: {newURL: "#/"+stateName}});

    expect($state.hasClass(stateName)).toBeTruthy();
    expect($state.hasClass("some-other-state")).toBeFalsy();

    expect(states.parse).toHaveBeenCalledWith("/"+stateName);
    expect(grid.showState).toHaveBeenCalledWith(state);
  });

  it("Should load url and apply state", function(){
    var app     = new App($state, states, grid);

    app.loadUrl("#/state-name");

    expect($state.hasClass("state-name")).toBeTruthy();
    expect($state.hasClass("some-other-state")).toBeFalsy();

    expect(grid.showState).toHaveBeenCalledWith(state);
  });

});
