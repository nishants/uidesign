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
		}
	};

	matrix.setRoot("india");
	matrix.addRelative("monday");
	matrix.addRelative("daring");
	matrix.addRelative("cot");

	$scope.matrix = matrix;
}]);