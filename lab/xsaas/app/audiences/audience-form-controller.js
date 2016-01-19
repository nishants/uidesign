(function () {
  "use strict"
  app.controller("AudienceFormController", function ($scope, Audiences) {
    $scope.form = {
      targets: Audiences.targets()
    };
  })
}).call(this);