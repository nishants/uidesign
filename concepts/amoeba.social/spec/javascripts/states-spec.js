describe("States", function(){

  it("should load states, and return on parse", function(){

    var stateId = "state-id-x",
        url = "#/" + stateId + "/abc/?someparam=some%20val";

    States.load([{id: stateId}]);

    expect(States.parse(url).id).toBe(stateId);
  })
});
