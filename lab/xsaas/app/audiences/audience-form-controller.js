(function () {
  "use strict"
  app.controller("AudienceFormController", function ($scope, Audiences) {
    $scope.audienceTargets = Audiences.targets();
  })
}).call(this);