(function () {
  "use strict"
  var app = angular.module("ngClientApp", ["LocalStorageModule"]);

  app.config(function (localStorageServiceProvider) {
    localStorageServiceProvider
        .setPrefix('ngClientApp');
  });

  app.service("ngClientApp", function($log, localStorageService){
    if(!localStorageService.isSupported) {
      $log.error("LocalStorageModule not found.");
    }
    return {
      load: function(){
        return LZString.decompressFromUTF16(localStorageService.get("client-data")) ;
      },
      update: function(html){
        localStorageService.set("client-data", LZString.compressToUTF16(html))
      }
    };
  });


}).call(this);