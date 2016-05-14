(function () {
  "use strict"
  app.factory('requestHeaders', ["localData", function (localData) {
    return {
      request: function (config) {
        config.headers['Authorization'] = localData.getUser().token;
        config.headers['Accept'] = 'application/json;';
        return config;
      }
    };
  }]);

  app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('requestHeaders');
  })
}).call(this);