(function(){
  "use strict"
  app.service("router",function(routes, $location, $rootScope){

    var defaultView   = null,
        defaultState  = null,
        update        = function(fn) {
          var phase = $rootScope.$$phase;
          if(phase == '$apply' || phase == '$digest') {
            if(fn && (typeof(fn) === 'function')) {
              fn();
            }
          } else {
            $rootScope.$apply(fn);
          }
        };
    return {
      view: defaultView,
      state: defaultState,
      param: {id: null},
      load: function (url) {
        var tokens = url.split("/");
        this.view  = routes.forName(tokens[1]);
        console.log("view :" + url)
        this.state = this.view.stateByName(tokens[3]);
        this.param.id = tokens[2];
      }
    };
  });
}).call(this);