(function(){
  "use strict"

  var game = angular.module("game", []);
  game.value("server", "https://findfalcone.herokuapp.com");
  window.game = game;

}).call(this);