(function(){
  "use strict"

  angular.module("slider", []).directive("slider", function(){
    return {
      restrict: 'C',
      scope: true,
      template: "",
      transclude: false,
      link: function(scope, element){
      }
    }
  })

}).call(this);