(function () {
  "use strict"
  var app = angular.module("ngClientApp", []);
  app.service("ngClientApp", function(){
    return {
      html: null,
      load: function(){
        return LZString.decompress(this.html) ;
      },
      update: function(html){
        this.html = LZString.compress(html);;
      }
    };
  });


}).call(this);