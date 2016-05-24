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
      },
      all: function(){
        return [
          {
            id: "repeater",
            title: "@repeat",
            description: "Create list dynamically with @repeat"
          },
          {
            id: "controller",
            title: "Controllers",
            description: "Add values to template scopes with controllers."
          },
          {
            id: "request",
            title: "Request Body",
            description: "Access request body right from template"
          },
          {
            id: "headers",
            title: "Header",
            description: "Access request headers and set response headers from template"
          },
          {
            id: "path",
            title: "Path",
            description: "Access request path parameters template"
          },
          {
            id: "path",
            title: "URL Parameters",
            description: "Access request query parameters from template."
          }
        ];
      }
    };
  }]);

}).call(this);