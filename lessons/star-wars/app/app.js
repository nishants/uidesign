(function(){
  "use strict"

  var game = angular.module("FindFalcone", []);
  game.value("server", "https://findfalcone.herokuapp.com");
  window.game = game;

}).call(this);