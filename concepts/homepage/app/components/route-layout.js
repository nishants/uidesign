(function () {
  "use strict"

  app.directive("layout", function (routesConfig) {
    window.setView = function(viewIndex, stateIndex){


      var views       = $(".views").first(),
          states      = $(".view" + viewIndex+" > .states").first(),

          viewHeight  = $("[layout]").first().height(),
          viewWidth   = $("[layout]").first().width(),

          offsetView  = viewIndex * viewWidth,
          offsetState = stateIndex * viewHeight;

      views.css("transform", "translateX(-" +offsetView +"px)");
      states.css("transform", "translateY(-"+offsetState + "px)");
    };

    var views = routesConfig.routes;
    var resize = function(){
      var layout       = $(".views").first();
      var viewHeight   = $("#app").height() - $("#top-bar").height();
      var viewWidth    = $("#app").width();

      layout.height( viewHeight);
      layout.width(routesConfig.routes.length * viewWidth);
    }

    return {
      restrict: "A",
      scope: false,
      transclude: false,
      link: function(scope){
        $(window).on("resize", resize);
        scope.render = function(index){
          if (index == scope.ui.views.length - 1){
            resize();
          }
        };

      }
    };
  });
}).call(this);