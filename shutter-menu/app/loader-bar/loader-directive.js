(function () {
  "use strict"
  module.directive("loaderBar", ["loader", function(loader){
    return {
      restrict: 'A',
      transclude: false,
      scope: false,
      link: function(scope, element){
        /* Creates and instanceof data loader,
         doen't show it, unless #waitFor(expectedTimeToFinish) is invoked            */
        loader.init($(element));
      }
    };
  }]);
}).call(this);