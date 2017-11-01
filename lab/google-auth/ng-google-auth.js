var app = angular.module("ng-google-auth", []);

app.controller("SignupController", ["$scope", function($scope){

}]);
function signOut(){
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    $('.userContent').html('');
    $('#gSignIn').slideDown('slow');
  });
}

function onSuccess(googleUser){
  var profile = googleUser.getBasicProfile();
  gapi.client.load('plus', 'v1', function () {
    var request = gapi.client.plus.people.get({
      'userId': 'me'
    });
    //Display the user details
    request.execute(function (resp) {
      var name = resp.name.givenName,
          image = resp.image.url,
          displayName = resp.displayName,
          email = resp.emails[0].value,
          gender = resp.gender,
          profile = resp.url;
    });
  });
}

function onFailure(){
  console.log("failed")
}

function renderButton() {
  gapi.signin2.render('google-sign-in', {
    'scope'     : 'profile email',
    //'width'     : 240,
    //'height'    : 50,
    'longtitle' : false,
    //'theme'     : 'dark',
    'onsuccess' : onSuccess,
    'onfailure' : onFailure
  });
}