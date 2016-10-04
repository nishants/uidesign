(function () {
  "use strict"
  app.controller("snippetController", ["$scope", "snippetService", function(scope, snippetService){

    scope.$watch(function(){return snippetService.selected && snippetService.selected.id;}, function(value){
      snippetService.selected && snippetService.get(snippetService.selected.id).then(function(data){
        scope.snippet = data;
      });
    });

  }]);
}).call(this);