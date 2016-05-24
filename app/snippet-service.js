(function(){
  "use strict"

  var files = {
    "controller" : ["request"]
  }

  app.service("snippetService", ["$http", function($http){

    var SEPARATOR = "-------------------------",
        service = {
      _cache  : {},
      selected: null,
      select: function(card){
        this.selected = card;
      },
      unselect: function(){
        this.selected = null;
      },
      get: function (name) {
        return this._cache[name];
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
      service._cache[snippet.id] = $http.get("../code/<name>".replace("<name>", snippet.id)).then(
          function(response){
            var data = response.data.split(SEPARATOR);
            return {
              request   : data[0],
              controller: data[1],
              template  : data[2],
              response  : data[3]
            };
          });
    });

    return service;
  }]);

}).call(this);