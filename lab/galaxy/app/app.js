(function(){
  "use strict"

  var galaxy = angular.module("galaxy", ["game"]);
  galaxy.value("server", "https://findfalcone.herokuapp.com");
  window.galaxy = galaxy;

}).call(this);