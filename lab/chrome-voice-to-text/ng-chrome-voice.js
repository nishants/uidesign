var app = angular.module("ng-chrome-voice", []);
app.service("Microphone", ["$timeout", function($timeout){
  var hindi         = {name: "Indian Hindi", code: "hi-IN"},
      indianEnglish = {name: "Indian English", code: "en-IN"},
      usEnglish     = {name: "US English", code: "en-US"},
      languages     =  [indianEnglish, hindi, usEnglish],
      microphone    = {
        listening : false,
        processing : false,
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
                microphone.input.text       = result.text[result.text.length -1].join(" ");
                microphone.input.confidence = result.confidence;
                microphone.listening        = false;
                microphone.processing       = false;
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
  return microphone;
}]);

app.controller("ChromeVoiceDemoController", ["$scope","Microphone", function($scope, Microphone){
  $scope.microphone = Microphone;
}]);
