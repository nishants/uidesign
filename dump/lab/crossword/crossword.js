var app = angular.module("crossword", []);
app.controller("CrosswordController", ["$scope", function($scope){
	$scope.crossword={
		cellWidth 	: 30,
		cellHeight  : 30,
		cellsPerRow : 10,
		crosswordLayout:{
			cells : [
				true , true , true , true , true , true , true , true , true , true ,
				false, true , true , true , true , true , true , true , true , true , 
				false, true , true , true , true , true , true , true , true , true , 
				false, false, false, false, false, false, false, false, false, false,
				false, true , true , true , true , true , true , true , true , true , 
				false, true , true , true , true , true , true , true , true , true , 
				false, true , true , true , true , true , true , true , true , true , 
				false, true , true , true , true , true , true , true , true , true , 
				false, true , true , true , true , true , true , true , true , true , 
			]
		},
		inputLayout: {}
	}
}]);