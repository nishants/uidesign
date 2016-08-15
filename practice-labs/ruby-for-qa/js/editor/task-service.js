(function(){
  "use strict"
  app.service("taskService", ["$http", "compileServers", function($http, compileServers){
    var remote = compileServers[0];

    return {
      getAssignment : function(id){
        return $http.get(remote.url+"/tasks/:id/worksheet".replace(":id", id)).then(function(response){
          return response.data;
        })
      },
      evaluateAssignment : function(taskId, solutionText){
        return $http.put(remote.url+"/tasks/:id/evaluate".replace(":id", taskId), solutionText).then(function(response){
          return response.data;
        })
      }
    }
  }]);

}).call(this);