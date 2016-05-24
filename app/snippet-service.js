(function(){
  "use strict"

  var files = {
    "controller" : ["request"]
  }

  app.service("snippetService", ["$http", function($http){

    var service = {
      _cache : {},
      get: function (name) {
        return _cache[name];
      },
      all: function () {
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
            id: "query",
            title: "URL Parameters",
            description: "Access request query parameters from template."
          }
        ];
      }
    };

    service.all().forEach(function(snippet){
      service._cache[snippet.id] = $http.get("../code/<name>".replace("<name>", snippet.id));
    });

    return service;
  }]);

}).call(this);