var app = angular.module("ng-chrome-voice", []);
app.controller("ChromeVoiceDemoController", ["$scope", function($scope){
  var chromeVoice = ChromeVoice();

  $scope.microphone = {
    active : false,
    listening : false,
    input  : {
      text      : "",
      confidence: 0,
    },
    listen : function(){
      chromeVoice.start();
    }
  }
}]);