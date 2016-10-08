(function () {
  "use strict"
  var app = angular.module("editor", []);

  app.directive("codeEditor", function ($log) {
    var
        defaultOptions = {
          //remove default red dots for unknown character(linefeed, etc)
          specialCharPlaceholder: function () {
            return document.createElement("span")
          },
          readOnly: true,

          // show line numbers in editor
          lineNumbers: true,

          // renders whole document at once (else only part in view is rendered, and text searches wont work)
          //viewportMargin: Infinity,

          // syntax highlighter mode
          mode: "htmlmixed"
        },


        showError = function (err) {
          $log.error(err);
        },

        initializeCodeMirror = function (textArea, editorOptions) {
          CodeMirror.fromTextArea(textArea, editorOptions);
        };

    return {
      scope: false,
      transclude: false,
      restrict: 'C',
      link: function (scope, element, attrs) {
        var editorOptions = angular.extend(defaultOptions, {});
        editorOptions.mode = attrs.mode || editorOptions.mode;

        initializeCodeMirror(element[0], editorOptions);
      }
    };
  })

}).call(this);