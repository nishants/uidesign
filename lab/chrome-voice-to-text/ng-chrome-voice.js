var app = angular.module("ng-chrome-voice", []);
app.controller("ChromeVoiceDemoController", ["$scope","$timeout", function($scope, $timeout){
  var hindi = {name: "Indian Hindi", code: "hi-IN"},
      indianEnglish = {name: "Indian English", code: "en-IN"},
      usEnglish = {name: "US English", code: "en-US"};

  var languages =  [indianEnglish, hindi, usEnglish,],
      chromeVoice = ChromeVoice({
        continuous: false,
        language  : hindi.code
      });
  var microphone = {
    active    : false,
    listening : false,
    history   : [],
    input     : {text: "", confidence: 0, interimText: "", processing: false},
    listen    : function () {
      microphone.active = true;
      chromeVoice.onTextProcessed(function (result, confidence) {
        microphone.listening = true;
        $timeout(function(){
          if(result.isFinal){
            microphone.input.text && microphone.history.push(microphone.input.text);
            microphone.input.text       = result.text[result.text.length -1];
            microphone.input.confidence = result.confidence;
            microphone.listening = false;
            microphone.processing = false;
          } else{
            microphone.processing = true;
          }
        });
      });
      chromeVoice.start();
    }
  };
  $scope.microphone = microphone
}]);