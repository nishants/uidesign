(function(){
  "use strict"
  app.service("router",function(Contexts){

    var setView = function(viewIndex, stateIndex){
      var views       = $(".views").first(),
          states      = $(".view" + viewIndex+" > .states").first(),

          viewHeight  = $("[layout]").first().height(),
          viewWidth   = $("[layout]").first().width(),

          offsetView  = viewIndex * viewWidth,
          offsetState = stateIndex * viewHeight;

      views.css("transform", "translateX(-" +offsetView +"px)");
      states.css("transform", "translateY(-"+offsetState + "px)");
    };

    var currentView = null,currentState = null;;
    return {
      param: {id: null},
      load: function (url) {
        var tokens = url.split("/");
        currentView  = Contexts.forName(tokens[1]);
        currentState = currentView.stateByName(tokens[3]);
      },
      render : function(){
        setView(currentView.index, currentState ? currentState.index : 0);
      }
    };
  });
}).call(this);