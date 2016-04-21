describe("url listener", function(){

  it("should callback with stateId on url change", function(){

    var stateId = "state-id-x",
        url = "#/" + stateId + "/abc/?someparam=some%20val";

    States.load([{id: stateId}]);

    expect(States.parse(url).id).toBe(stateId);
  })
});
