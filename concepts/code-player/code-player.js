(function () {
  var module = angular.module("video-player", ["editor"]);
  module.directive("videoPlayer", [function(){

    return {
      restrict: "C",
      scope: true,
      transclude : false,
      link : function(scope, element){

      }
    };
  }]);

}).call(this);