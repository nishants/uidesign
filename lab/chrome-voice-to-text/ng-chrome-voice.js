var app = angular.module("ng-chrome-voice", []);
app.controller("ChromeVoiceDemoController", ["$scope", function($scope){
  var chromeVoice = ChromeVoice();
  chromeVoice.start();
  $scope.chromeVoice = chromeVoice;
}]);