(function(){
  "use strict"
  app.service("aceEditor", [function(){

    return {
      create : function(elment){
        var aceEditor = ace.edit(elment);
        aceEditor.getSession().setMode("ace/mode/ruby");
        aceEditor.setShowPrintMargin(false);
        aceEditor.getSession().setTabSize(2);
        aceEditor.getSession().setUseSoftTabs(true);

        return aceEditor;
      }
    };
  }]);

}).call(this);