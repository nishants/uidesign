(function () {
  "use strict"
  var app = angular.module("ngClientApp", []);
  app.service("ngClientApp", function(){
    return {
      html: null,
      load: function(){
        return LZString.decompressFromUTF16(this.html) ;
      },
      update: function(html){
        this.html = LZString.compressToUTF16(html);;
      }
    };
  });


}).call(this);