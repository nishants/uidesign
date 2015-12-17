(function () {
  "use strict"
  var app = angular.module("ngClientApp", []);
  app.service("ngClientApp", function(){
    return {
      html: null,
      load: function(){
        return this.html ;
      },
      update: function(html){
        this.html = html;
      }
    };
  });


}).call(this);