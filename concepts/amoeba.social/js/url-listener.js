(function () {
  "use strict"

  var State = function(){};
  State.prototype.parse = function(){
    return {id: "state-id-x"};
  };

  window.State = new State();
}).call(this);