var app = angular.module("create-crossword", []);
app.controller("MatrixController", ["$scope", function ($scope) {

	var matrix = {
		word: null,
		relatives: [],
		setRoot: function(word){
			matrix.word = "india";
		},
		addRelative: function(word){
			matrix.relatives.push({
				word: word,
				relations: matrix.word.split("").map(function(char){return word.indexOf(char);})
			});
		},
		getLayout: function(){
			var crosses = matrix.word.split("").map(function(){return null;}),
					positions = [];

			matrix.relatives.forEach(function(relative){
				positions.push({
					index: 0,
					length: relative.word.length
				});
			});

			return positions;
		}
	};

	matrix.setRoot("india");
	matrix.addRelative("monday");
	matrix.addRelative("daring");
	matrix.addRelative("cot");
	$scope.layout = JSON.stringify(matrix.getLayout());

	$scope.matrix = matrix;
}]);