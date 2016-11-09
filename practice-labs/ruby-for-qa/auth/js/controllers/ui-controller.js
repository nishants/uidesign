auth.controller("UIController", ["$scope","UserService", function ($scope, userService) {
  $scope.user = userService;
}]);
