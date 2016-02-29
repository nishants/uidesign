(function () {
  "use strict"
  app.factory('localData', function () {

    return {
      getUser: function () {
        return localStorage.user && JSON.parse(localStorage.user);
      },
      resetUser: function () {
        localStorage.user = null;
      },
      setUser: function (user) {
        localStorage.user = JSON.stringify(user);
      }
    };
  });

}).call(this);