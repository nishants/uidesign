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

  treniq.app.directive("fieldset" , [function(){

    return {
      restrict: "C",
      transclude: false,
      scope: true,
      link: function(scope, element){
      }
    };
  }
  ]);

}).call(this);