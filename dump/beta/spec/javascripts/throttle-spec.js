describe("Throttle", function(){

  it("Apply throttle", function(done){
    var speed            = 500,
        throttledTimes   = 0,
        throttleFunction = function () {
          throttledTimes++;
        },
        throttle = Throttle.at(speed);

    for(var i =0; i< 100; i++){
      throttle.push(throttleFunction);
    }

    setTimeout(function(){
      expect(throttledTimes).toBe(1);
      done();
    }, speed + 500);
  });
});
