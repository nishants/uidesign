(function(){
  "use strict"

  app.controller("homeController", ['$scope', function($scope){
    var home = {
      referralMails: [{id: "abc", name: "FW : Java Developers : Referral Call", body: "TODO ACCEPT HTML BODY"}],
    };

    $scope.home = home;

  }])

}).call(this);