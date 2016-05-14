(function () {
  "use strict"
  module.service("loader", ["$timeout", "DataLoader", function($timeout, DataLoader){
    var loader = null,
        averageReturnTimeOfRequests = 5000;
    return {
      init: function($e){
        loader = new DataLoader($e);
      },
      start: function(){
        // wait for directive to intiliaze, if init no tinvoked yet.
        loader ? loader.waitFor(averageReturnTimeOfRequests) : $timeout(function(){loader.waitFor(averageReturnTimeOfRequests)}, 1000);
      },
      stop: function(){
        loader.stop();
      }
    };
  }]);
}).call(this);