var app = angular.module("crossword", ['create-crossword']);

app.controller("CrosswordController", ["$scope", "Matrix", function ($scope, Matrix) {
	var form = {
				words: "demanding monday daring india magician intensity electrical magnificent",
				create: function(){
					var trimmed = function (word) {return word.trim();},
							nonEmpty = function(word){ return word.length > 0;};
					var words = form.words.split(" ").map(trimmed).filter(nonEmpty),
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