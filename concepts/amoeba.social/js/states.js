(function () {
  "use strict"

  var States = function(){
    this.__states = {};
  };

  States.prototype.load = function(list){
    for(var i=0; i < list.length; i++){
      this.__states[list[i].id] = list[i];
    }
    this.__defaultState = list[0];
  };

  States.prototype.parse = function(url){
    var stateId    = url.length && url.split("/")[1],
        stateByUrl = (stateId && this.__states[stateId]);

    return stateByUrl || this.__defaultState;
  };

  window.States = new States();
}).call(this);