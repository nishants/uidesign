(function(){
  "use strict"

  app.service("loginService", ["$q","$timeout", "httpRequestInterceptor", "localData", function($q, $timeout, httpRequestInterceptor, localData){
    var loggedInUser = localData.getUser(),
        login = function(user){
          loggedInUser = user;
          localData.setUser(user);
        };

    return {
      login: function(email, password){
        return $q(function(resolve, error){
          var success = function(user){
                login(user);
                resolve(user);
              };
          $timeout(function(reponse){
            reponse = {user: {name: email, token: email}}
            email ? success(reponse.user) : error();
          }, 100)
        });
      },
      lastSession: function(){
        return $q(function(resolve, error){
          $timeout(function(){
            loggedInUser ? resolve(loggedInUser) : error();
          }, 100)
        });
      }
    };
  }]);

  app.factory('localData', function () {

    return {
      getUser : function(){
        return localStorage.user && JSON.parse(localStorage.user);
      },
      setUser: function (user) {
        localStorage.user = JSON.stringify(user);
      }
    };
  })

  app.factory('httpRequestInterceptor', ["localData", function (localData) {
    return {
      request: function (config) {
        config.headers['Authorization'] = localData.getUser().token;
        config.headers['Accept'] = 'application/json;';
        return config;
      }
    };
  }]);

  app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('httpRequestInterceptor');
  });

}).call(this);