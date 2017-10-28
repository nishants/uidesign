var app = angular.module("ng-chrome-voice", []);
app.controller("ChromeVoiceDemoController", ["$scope","$timeout", function($scope, $timeout){
  var hindi = {name: "Indian Hindi", code: "hi-IN"},
      indianEnglish = {name: "Indian English", code: "en-IN"},
      usEnglish = {name: "US English", code: "en-US"};

  var languages =  [indianEnglish, hindi, usEnglish,];
  var microphone = {
    listening : false,
    history   : [],
    input     : {text: "", confidence: 0, interimText: "", processing: false},
    params    : {continuous: false, language  : hindi.code},
    _chromeVoice: null,
    createChromeVoice: function(){
      microphone._chromeVoice = ChromeVoice(microphone.params);
    },
    listen    : function () {
      !microphone._chromeVoice && microphone.createChromeVoice();
      microphone.listening = true;
      microphone._chromeVoice.onTextProcessed(function (result, confidence) {
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
      microphone._chromeVoice.start();
    },
    stop: function(){
      microphone.processing = false;
      microphone.listening = false;
      microphone._chromeVoice.stop();
    },
    abort: function(){
      microphone.processing = false;
      microphone.listening = false;
      microphone._chromeVoice.abort();
    }
  };
  $scope.microphone = microphone
}]);