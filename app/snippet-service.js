(function(){
  "use strict"

  var files = {
    "controller" : ["request"]
  }

  app.service("snippetService", ["$http", function($http){
    var
        template = "../code/<name>/<file>",
        cache = {};

    for(var name in files){
      var fileNames     = files[name],
          fileTemplate  = template.replace("<name>", name);
      cache[name] = {};
      fileNames.forEach(function(file){
            var fileUrl = fileTemplate.replace("<file>", file);
            cache[name][file] = $http.get(fileUrl).then(function(response){
              return response;
            }, function(err){
              console.error("File not found : " + err);
            });
          }
      );
    }

    return {
      get: function(sample, file){
        return cache[sample][file];
      }
    };
  }]);

}).call(this);