(function () {
  "use strict"
  module.directive("button", [function(){
    return {
      restrict: 'E',
      transclude: false,
      scope: false,
      link: function(scope, element){
        element.on("mousedown", function(){element.addClass("pressed-button");;})
        element.on("mouseup", function(){element.removeClass("pressed-button");;})
      }
    };
  }]);

}).call(this);