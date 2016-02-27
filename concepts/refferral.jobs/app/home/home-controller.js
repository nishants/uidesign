(function(){
  "use strict"

  app.controller("homeController", ['$scope', "mailService", function($scope, mailService){
    var home = {
      referralMails: [{id: "abc", name: "FW : Java Developers : Referral Call", body: "TODO ACCEPT HTML BODY"}],
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