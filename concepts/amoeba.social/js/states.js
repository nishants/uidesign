(function () {
  "use strict"

  var States = function(){
    this.__states = {};
  };

  States.prototype.load = function(list){
    for(var i=0; i < list.length; i++){
      this.__states[list[i].id] = list[i];
    }
  };

  States.prototype.parse = function(url){
    var stateId = url.split("/")[1];

    return this.__states[stateId];
  };

  window.States = new States();
}).call(this);