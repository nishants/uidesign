(function () {
  "use strict"

  app.directive("layout", function (config) {

    var resize = function(){
          var layout       = $(".views").first();
          var viewHeight   = $("#app").height() - $("#top-bar").height();
          var viewWidth    = $("#app").width();

          layout.height( viewHeight);
          layout.width(config.routes.length * viewWidth);
        };

    return {
      restrict: "A",
      scope: false,
      transclude: false,
      link: function(scope){
        $(window).on("resize", resize);
        scope.render = function(index){
          resize();
        };
      }
    };
  });
}).call(this);