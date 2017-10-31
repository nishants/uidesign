var app = angular.module("ng-google-auth", []);

app.controller("SignupController", ["$scope", function($scope){

}]);
function onSuccess(e){
  console.log("success")
}

function onFailure(){
  console.log("failed")
}

function renderButton() {
  gapi.signin2.render('google-sign-in', {
    'scope': 'profile email',
    'width': 240,
    'height': 50,
    'longtitle': true,
    'theme': 'dark',
    'onsuccess': onSuccess,
    'onfailure': onFailure
  });
}