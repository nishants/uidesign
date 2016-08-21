(function(){
  "use strict"
  app.directive("svg", ["$timeout", function($timeout){
    return {
      restrict  : "E",
      scope     : false,
      transclude: false,
      link      : function(scope, element, attrs){
        element.attr("width", "100%");
        var browser = $("g#Browser");

        browser.click(function(e){
          $timeout(function(){
            scope.ui.scene.show(browser.attr("id"))
          });
        });

      }
    };
  }]);

}).call(this);