(function(){
  "use strict"
  app.service("router",function(Contexts){

    var currentView = null,currentState = null;;
    return {
      param: {id: null},
      load: function (url) {
        var contextName = url.split("/")[1].split("?")[0],
            urlQuery = url.split("/")[1].split("?")[1],
            stateId  = urlQuery ? urlQuery.split("state=")[1] : "";

        Contexts.forName(contextName).load(stateId);
      }
    };
  });
}).call(this);