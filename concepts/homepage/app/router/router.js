(function(){
  "use strict"
  app.service("router",function(Contexts){

    var currentView = null,currentState = null;;
    return {
      param: {id: null},
      load: function (url) {
        var tokens = url.split("/");
        currentView  = Contexts.forName(tokens[1]);
        currentState = currentView.stateByName(tokens[3]);
      },
      render : function(){
        Contexts.switchTo(currentView.index, currentState ? currentState.index : 0);
      }
    };
  });
}).call(this);