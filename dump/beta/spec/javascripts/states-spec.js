describe("States", function(){

  it("should load states, and return on parse", function(){

    var stateId = "state-id-x",
        url = "#/" + stateId + "/abc/?someparam=some%20val",
        states = new States([{id: stateId}]);

    expect(states.parse(url).id).toBe(stateId);
  });

  it("should load default state (first loaded), if no hash url", function(){

    var stateId = "state-id-x",
        states = new States([{id: stateId}, {id: "non-default-state"}]);

    expect(states.parse("").id).toBe(stateId);
    expect(states.parse("#").id).toBe(stateId);
    expect(states.parse("#/").id).toBe(stateId);
  });
});
