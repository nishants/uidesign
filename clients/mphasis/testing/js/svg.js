(function(){
  "use strict"
  app.directive("svg", ["$timeout", "scene-subjects", function($timeout, sceneSubjects){
    return {
      restrict  : "E",
      scope     : false,
      transclude: false,
      link      : function(scope, element){
        element.attr("width", "100%");

        for(var subjectName in sceneSubjects){
          var subject = $(sceneSubjects[subjectName].selector);
          subject.attr("cursor", "pointer");
          subject.click(function(e){
            $timeout(function(){
              scope.ui.scene.show(subjectName);
            });
          });
        }
      }
    };
  }]);

}).call(this);