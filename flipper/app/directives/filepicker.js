(function () {
  "use strict"

  window.Flipper.app.directive("picImages", [function(){
    var pickFiles = function(onSuccess, onFailure){
      filepicker.pick({
            cropRatio: 4/3,
            conversions: ['crop', 'rotate'],
            mimetype: 'image/*',
            container: 'window',
            services: ['COMPUTER', 'CONVERT']
          },
          function(upload){
            onSuccess(upload);
          },
          function(error){
            onFailure(error.toString());
          }
      )
    }
    return {
      scope: false,
      transclude: false,
      restrict: "C",
      link: function (scope, element, attrs) {
        var expression = attrs.onUpload.split("."), callback = scope;
        for(var i =0; i<expression.length; i++){
          callback = callback[expression[i]];
        }

        var onUpload = function (file) {
              callback(file);
              scope.$apply();
            },
            onError = function (error) {
              console.error(error);
            };

        element.bind("click", function(){
          pickFiles(onUpload, onError);
        })
      }
    };
  }]);

}).call(this);