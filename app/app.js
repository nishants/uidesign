(function(){
  "use strict"
  var app = angular.module("amoeba", ['editor']);
  window.app = app;
  app.run(["snippetService", function(snippetService){
    console.log("hoyaa");
  }])
}).call(this);