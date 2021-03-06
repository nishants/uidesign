(function(){
  "use strict"
  app.directive("code", ["$log", "snippetService", function($log, snippetService){
    var
        defaultOptions = {
          //remove default red dots for unknown character(linefeed, etc)
          specialCharPlaceholder: function(){return document.createElement("span")},
          readOnly: true,

          // show line numbers in editor
          lineNumbers: true,
          smartIndent: true,

          // renders whole document at once (else only part in view is rendered, and text searches wont work)
          //viewportMargin: Infinity,

          // syntax highlighter mode
          mode: "htmlmixed"
        },


        showError = function (err) {
          $log.error(err);
        },

        initializeCodeMirror = function (textArea, editorOptions) {
          return CodeMirror.fromTextArea(textArea, editorOptions);
        };

    return {
      scope: false,
      transclude: false,
      restrict: 'C',
      link : function(scope, element, attrs){
        var editorOptions = angular.extend(defaultOptions, {});
        editorOptions.mode = attrs.mode || editorOptions.mode;

        var editor = initializeCodeMirror(element[0], editorOptions);
        editor.on("change", function(){
          editor.save();
        });

        scope.$watch(attrs.snippet, function(value){
          value && editor.setValue(value);
          value || editor.setValue("");
          setTimeout(function(){
            editor.refresh();
          }, 100);
        });
      }
    };
  }])
})();