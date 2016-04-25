(function () {
  "use strict"

  var States = function(list){
    this.__defaultState = list[0];
    this.__states = {};
    for(var i=0; i < list.length; i++){
      this.__states[list[i].id] = list[i];
    }
  };

  States.prototype.parse = function(url){
    var stateId    = url.length && url.split("/")[1],
        stateByUrl = (stateId && this.__states[stateId]);

    return stateByUrl || this.__defaultState;
  };

  window.States = States;
}).call(this);