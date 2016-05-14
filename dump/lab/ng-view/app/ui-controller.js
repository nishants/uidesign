(function(){
  "use strict"
  app.controller("UIController",function($scope){

    var viewOne = {
      name: "view1",
      load: function (url) {
        console.log("state : " + url);
      }
    };
    var views = {
      "view1" : viewOne,
      "" : viewOne,
    };
    var ui = {
      load : function(url){
        var viewName = url.split("/")[0];
        console.log("loading view :  " + viewName);
        views[viewName].load(url);
      },
      view : {
        name: "view",
        state: "state",
      }
    };

    $scope.ui = ui;
  });
}).call(this);