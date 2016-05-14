(function () {
  "use strict"

  app.directive("layout", function (layout) {

    return {
      restrict: "A",
      scope: false,
      transclude: false,
      link: function(scope){
        var resize = function () {
          layout.resize();
        };

        $(window).on("resize", resize);
        scope.render = resize;
      }
    };
  });
}).call(this);