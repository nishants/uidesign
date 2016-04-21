describe("url listener", function(){

  it("should callback with stateId on url change", function(){

    var stateId = "state-id-x",
        url = "#/" + stateId + "/abc/?someparam=some%20val";

    expect(State.parse(url).id).toBe(stateId);
  })
});
