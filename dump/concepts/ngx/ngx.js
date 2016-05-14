(function () {
  "use strict"

  var helper = {
    setterFor: function (string) {
      var capitalized = string.charAt(0).toUpperCase() + string.slice(1);
      return "set" + capitalized;
    }
  };
  var findScopesIn = function ($target) {
    var elements = $target.find("[ngx-scope]"),
        scopes = [];
    for (var i = 0; i < elements.length; i++) {
      var $e = $(elements[i]),
          name = $e.attr("ngx-scope");

      scopes.push({name: name, $target: $e});
    }
    return scopes;
  }, findModelsIn = function (scope) {
    var elements = scope.$target.find("[ngx-model]"),
        models = [];
    for (var i = 0; i < elements.length; i++) {
      var $e = $(elements[i]),
          name = $e.attr("ngx-model").replace(scope.name + ".", "");

      models.push({name: name, $target: $e});
    }
    return models;


    return {name: $target.find("[ngx-model]"), $target: $target, models: {}};
  };

  var ngx = {
    $modules: {},
    parse: function ($e) {
      this.$modules[$e.attr("ngx-app")] = {$target: $e};
    },
    module: function (name, params) {
      var newModule = {
            scopes: {},
            scope: function (name, params) {
              this.scopes[name] = params[params.length - 1]();
            }
          },
          self = this;
      if (params != undefined) {
        findScopesIn(self.$modules[name].$target).forEach(function (scope) {
          findModelsIn(scope).forEach(function (model) {
            model.$target.on("input", function () {
              var setterName = helper.setterFor(model.name);
              var ngxScope = newModule.scopes[scope.name];
              var setterFunction = ngxScope[setterName];
              setterFunction.call(ngxScope);
            });
            console.log(model.name);
          });
        });
      }

      return newModule;
    }
  };

  $(document).ready(function () {
    var $target = $("[ngx-app]").first();
    ngx.parse($target);
  });
  window.ngx = ngx;
}).call(this);