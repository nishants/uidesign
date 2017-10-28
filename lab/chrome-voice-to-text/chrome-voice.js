window.ChromeVoice = function(config){
  var recognitionAvailable = !!webkitSpeechRecognition,
      defaultLang          = "en-US",
      speechRecognizer     =  recognitionAvailable ? new webkitSpeechRecognition() : null,
      ChromeVoice = {
        available         : recognitionAvailable,
        listening         : false,
        _onTextProcessed  : function(text, confidence){},
        onTextProcessed   : function (callback) {
          ChromeVoice._onTextProcessed = callback;
        },
        start        : function(){
          // Listening ends after user stops speaking(even if user pauses)if set to false (default)
          speechRecognizer.continuous = config.continuous;

          // Results returned by the recognizer are final and will not change
          speechRecognizer.interimResults = true;

          speechRecognizer.onstart = function() {
            console.log("I can listen you.");
          };

          speechRecognizer.onresult = function(event) {
            var toArray = function(list){
              var array = [];
              for(var i = 0; i < list.length; i++){
                array.push(list.item(i));
              }
              return array;
            };


            var results  = toArray(event.results),
                allFinal = true;
            results.forEach(function(result){
              allFinal = allFinal && result.isFinal;
            });

            var textRecognised = results.map(function (text) {
              var words = function (word) {
                // ignore word.confidence
                return word.transcript;
              };
              
              return toArray(text).map(words) ;
            });

            ChromeVoice._onTextProcessed({text: textRecognised, isFinal : allFinal});
            console.log(event.results.item(0).isFinal);
            console.log("You said : " + textRecognised);
          };

          speechRecognizer.onerror = function(event) {
            console.error(event);
          };

          speechRecognizer.onend = function() {
            console.log("User ended speech");
          };

          speechRecognizer.lang = defaultLang;
          speechRecognizer.start();
        }
      };
  return ChromeVoice;
};