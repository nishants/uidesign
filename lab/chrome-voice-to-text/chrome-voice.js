window.ChromeVoice = function(params){
  var recognitionAvailable = !!webkitSpeechRecognition,
      defaultLang          = "en-US",
      speechRecognizer     =  recognitionAvailable ? new webkitSpeechRecognition() : null,
      ChromeVoice = {
        available    : recognitionAvailable,
        listening    : false,
        start        : function(){
          // Listening ends after user stops speaking(even if user pauses)if set to false (default)
          speechRecognizer.continuous = true;

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


            var textRecognised = toArray(event.results).map(function (text) {
              return toArray(text).map(function (word) {
                // ignore word.confidence
                return word.transcript;
              }).join(" ");
            });

            console.log(event);
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