(function () {
  "use strict"

  angular.module("look-like").service("aceEditor", ["$http", function ($http) {
    var createSample = function(config){
      return {
        name: config[0],
        snippet : config.slice(1).filter(function(line){ return line.length > 0;})
      }
    };
    return {
      run : function(script){
        return $http({
          method: 'PUT',
          url   : "https://amoeba-social-look-like-server.herokuapp.com/assertion/evaluate",
          data  : unescape(script),
          headers: {'Content-Type': 'text/plain'},
          transformResponse: [function (data) {
            return decodeURI(data);
          }]
        }).then(function(response){
          return response.data.split("<---->").filter(function(result){
            return result.length  > 0;
          });
        });

      },
      create: function (elment) {
        var aceEditor = ace.edit(elment);
        aceEditor.getSession().setMode("ace/mode/ruby");
        aceEditor.setShowPrintMargin(false);
        aceEditor.getSession().setTabSize(2);
        aceEditor.getSession().setUseSoftTabs(true);

        return aceEditor;
      },
      getAllSamples : function(){
        return $http.get("config/samples.txt").then(function(response){
          return response.data.split("#").map(function(sample){
            return sample.split("\n");
          }).filter(function(sample){
            return sample.length > 1;
          }).map(function(sample){
            return createSample(sample)
          });
        });
      }
    };
  }])}).call(this);