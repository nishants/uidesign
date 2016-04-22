describe("States", function(){

  it("should load states, and return on parse", function(){

    var stateId = "state-id-x",
        url = "#/" + stateId + "/abc/?someparam=some%20val";

    States.load([{id: stateId}]);

    expect(States.parse(url).id).toBe(stateId);
  });

  it("should load default state (first loaded), if no hash url", function(){

    var stateId = "state-id-x";
    States.load([{id: stateId}, {id: "non-default-state"}]);

    expect(States.parse("").id).toBe(stateId);
    expect(States.parse("#").id).toBe(stateId);
    expect(States.parse("#/").id).toBe(stateId);
  });
});
