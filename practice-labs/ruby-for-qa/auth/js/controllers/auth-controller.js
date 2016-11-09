auth.controller("AuthController", ["$scope","UserService", function ($scope, userService) {
  $scope.user = userService;
}]);
