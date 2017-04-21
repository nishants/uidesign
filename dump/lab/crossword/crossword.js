var app = angular.module("crossword", ['create-crossword']);

app.controller("CrosswordController", ["$scope", "Matrix", function ($scope, Matrix) {
	var form = {
				words: "demanding monday daring india magician intensity electrical magnificent",
				create: function(){
					var words = form.words.split(" ").map(function(word){return word.trim();}),
							matrix = Matrix.create();
					matrix.setRoot(words[0]);
					words.slice(1).forEach(function(word){
						matrix.addRelative(word);
					});
					$scope.matrix = matrix.createCells(matrix.calculateGrid(matrix.crossRelations()));
				}
			};
	form.create();
	$scope.form = form;
}]);