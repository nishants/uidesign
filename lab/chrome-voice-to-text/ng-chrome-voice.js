var app = angular.module("ng-chrome-voice", []);
app.controller("ChromeVoiceDemoController", ["$scope","$timeout", function($scope, $timeout){
  var chromeVoice = ChromeVoice();

  var microphone = {
    active    : false,
    listening : false,
    input     : {text: "", confidence: 0, isFinal: false},
    listen    : function () {
      chromeVoice.onTextProcessed(function (result, confidence) {
        $timeout(function(){
          microphone.input.text       = result.text;
          microphone.input.isFinal    = result.isFinal;
          microphone.input.confidence = result.confidence;
        });
      });
      chromeVoice.start();
    }
  };
  $scope.microphone = microphone
}]);