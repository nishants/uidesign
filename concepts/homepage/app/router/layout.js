(function () {
  "use strict"

  app.directive("layout", function (config) {

    var resize = function(){
          var layout       = $(".views").first();
          var viewHeight   = $("#app").height() - $("#top-bar").height();
          var viewWidth    = $("#app").width();

          layout.height( viewHeight);
          layout.width(config.routes.length * viewWidth);

          // resize the current view to app width
          $(window).trigger("hashchange");
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