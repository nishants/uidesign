(function () {
  "use strict"

  window.Flipper.app.directive("picImages", [function(){
    return {
      scope: false,
      transclude: false,
      restrict: "C",
      link: function(scope, element, attrs){


        scope.pickFiles = function(){
          filepicker.pick(
              {
                mimetype: 'image/*',
                container: 'window',
                services: ['COMPUTER']
              },
              function(Blob){

                console.log(JSON.stringify(Blob));
              },
              function(FPError){
                console.log(FPError.toString());
              }
          )
        };
      }
    };
  }]);

}).call(this);