angular.module("rearrange", ["ngDraggable"]).controller("RearrangeWordController", ["$scope", function($scope){

	var challenge = {
		word 		: "magnificent",
		letters	: "",
		update: function(){
			challenge.letters = challenge.word.split("");
		}
	};
	challenge.update();
	$scope.challenge = challenge;
}]);