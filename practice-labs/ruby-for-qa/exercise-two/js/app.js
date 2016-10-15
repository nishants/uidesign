(function(){
  "use strict"

  var app = angular.module("ruby-for-qa", ["ngSanitize", "ngStorage"]);
  app.value("compileServers",[{
    name: "default",
    url: "http://amoeba-social-rubylab.herokuapp.com"
  }]);
  app.config(function($httpProvider) {
    //Enable cross domain calls
    $httpProvider.defaults.useXDomain = true;

    //Remove the header containing XMLHttpRequest used to identify ajax call
    //that would prevent CORS from working
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};
    $httpProvider.defaults.headers.options = {};
  });

  window.app = app;
}).call(this);