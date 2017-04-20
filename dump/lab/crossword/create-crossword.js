var app = angular.module("create-crossword", []);
app.controller("MatrixController", ["$scope", function ($scope) {

	var matrix = {
		word: null,
		relatives: [],
		setRoot: function(word){
			matrix.word = "india";
		},
		addRelative: function(word){
			var rootWordLetters = matrix.word.split(""),
					crosses = [];

			rootWordLetters.forEach(function(letter, index){
				crosses.push({
					indexInStem : index,
					indexInWord : word.indexOf(letter),
				});
			});

			matrix.relatives.push({
				word: word,
				crosses: crosses
			});
		},
		crossRelations: function(){
			var crosses = matrix.word.split("").map(function(){return null;}),
					positions = [],
					unrelated = [];

			matrix.relatives.forEach(function(relative, relativeIndex){
				var occupied = [],
						even = relativeIndex%2 == 0,
						crosses = relative.crosses.filter(function (cross) {
							return cross.indexInWord > -1 && occupied.indexOf(cross.indexInWord) == -1;
						}).sort(),
						index = even ? crosses[crosses.length -1] : crosses[0];

				if(index){
					occupied.push(index);
					positions.push({
						index : index,
						word  : relative.word,
						vertical: true
					});
				} else{
					unrelated.push({word  : relative.word});
				}
			});

			return  {
				stem: {
					index : 0,
					word  : matrix.word,
					vertical: false
				},
				relatives: positions,
				unrelated: unrelated
			};
		},
		calculateGrid: function(positions){
			var grid = {
				cells: positions
			};
			return positions;
		}
	};

	matrix.setRoot("india");
	matrix.addRelative("monday");
	matrix.addRelative("daring");
	matrix.addRelative("cot");
	$scope.layout = JSON.stringify(matrix.calculateGrid(matrix.crossRelations()));

	$scope.matrix = matrix;
}]);