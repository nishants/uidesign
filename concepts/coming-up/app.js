(function () {
  "use strict"

  window.treniq = {
    app:  angular.module("treniq", [])
  };

  treniq.app.directive("card" , [function(){
    return {
      restrict: "C",
      transclude: false,
      scope: false,
      link: function(scope, element){
        Cards.bind($(element));
      }
    };
  }
  ]);

}).call(this);