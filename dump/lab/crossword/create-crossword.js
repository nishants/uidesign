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
			positions.push({
				index : 0,
				word  : matrix.word,
				vertical: false
			});

			matrix.relatives.forEach(function(relative, relativeIndex){
				var occupied = [],
						even = relativeIndex%2 == 0,
						crosses = relative.relations.filter(function (cross) {
							return cross > -1 && occupied.indexOf(cross) == -1;
						}),
						index = even ? crosses[crosses.length -1] : crosses[0];

				occupied.push(index);
				positions.push({
					index : index,
					word  : relative.word,
					vertical: true
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