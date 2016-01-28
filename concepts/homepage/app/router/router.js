(function(){
  "use strict"
  app.service("router",function(Contexts){

    var defaultView   = null,
        defaultState  = null;

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
    return {
      view: defaultView,
      state: defaultState,
      param: {id: null},
      load: function (url) {
        var tokens = url.split("/");
        this.view  = Contexts.forName(tokens[1]);
        this.state = this.view.stateByName(tokens[3]);
      },
      render : function(){
        setView(this.view.index, this.state ? this.state.index : 0);
      }
    };
  });
}).call(this);