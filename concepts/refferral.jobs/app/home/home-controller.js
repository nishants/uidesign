(function(){
  "use strict"

  app.controller("homeController", ['$scope', "mailService", "loginService", function($scope, mailService, loginService){
    var home = {
      referralMails: [],
      logout : function(){
        $scope.ui.user = null;
        loginService.logout();
      }
    };
    var init = function(){
      mailService.mailsFor($scope.ui.user.email).then(
          function (response) {
            home.referralMails = response.data.referrals;
          },
          function (err) {
            console.error(err)
          });
    };

    $scope.home = home;
    init();
  }])

}).call(this);