var app = angular.module("ng-google-auth", []);

app.controller("SignupController", ["$scope", function($scope){
  var account = {
    setDetails : function(user){
      console.log(user);
    }
  };
  $scope.account = account;
}]);


app.directive("googleLogin", [function(){

  return {
    restrict : "C",
    scope    : true,
    template : '<span id="google-login-button"></span>',
    link     : function(scope, element, attrs){
      var
          signOut = function(){
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
              $('.userContent').html('');
              $('#gSignIn').slideDown('slow');
            });
          },
          loggedIn = function(googleUser){
            var profile = googleUser.getBasicProfile();
            gapi.client.load('plus', 'v1', function () {
              var request = gapi.client.plus.people.get({
                'userId': 'me'
              });
              //Display the user details
              request.execute(function (resp) {
                scope.$googleUser = {
                    name        : resp.name.givenName,
                    image       : resp.image.url,
                    displayName : resp.displayName,
                    email       : resp.emails[0].value,
                    gender      : resp.gender,
                    profile     : resp.url,
                    orgs        : resp.organizations.map(function(org){return org.name;}).join(", "),
                };
                scope.$eval(attrs.onLogin);
              });
            });
          },
          loginFailed = function(e){
            alert("Login failed")
            console.error(e);
          },
          renderButton = function(id){
            gapi.signin2.render(id, {
              'scope'     : 'profile email',
              //'width'     : 240,
              //'height'    : 50,
              'longtitle' : false,
              //'theme'     : 'dark',
              'onsuccess' : loggedIn,
              'onfailure' : loginFailed
            });
          };

      renderButton("google-login-button");
    }
  };
}]);

