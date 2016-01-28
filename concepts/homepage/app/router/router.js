(function(){
  "use strict"
  app.service("router",function(routes){

    var defaultView   = null,
        defaultState  = null;

    return {
      view: defaultView,
      state: defaultState,
      param: {id: null},
      load: function (url) {
        var tokens = url.split("/");
        this.view  = routes.forName(tokens[1]);
        this.state = this.view.stateByName(tokens[3]);
        this.param.id = tokens[2];
      }
    };
  });
}).call(this);