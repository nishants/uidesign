var app = angular.module("create-crossword", []);
app.controller("MatrixController", ["$scope", function ($scope) {

	var matrix = {
		word: null,
		relatives: [],
		setRoot: function(word){
			matrix.word = word;
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
		calculateGrid: function(structure){
			var columns		= 0,
					rows 			= 0,
					maxAboveStem = 0,
					maxBelowStem = 0,
					gridHeight   = 0,
					gridWidth   = 0,
					positions = [];
			structure.relatives.forEach(function(relative){
				var aboveStem = relative.index.indexInStem,
						belowStem = relative.word.length - relative.index.indexInWord -1;
				maxAboveStem = Math.max(maxAboveStem, aboveStem);
				maxBelowStem = Math.max(maxBelowStem, belowStem);
				positions.push({
					word: relative.word,
					col: relative.index.indexInStem,
					row: relative.index.indexInWord,
				});
			});
			gridWidth = structure.stem.word.length;
			gridHeight = maxBelowStem + maxAboveStem +1;
			positions.push({
				word: structure.stem.word,
				col: 0,
				row: 0
			});

			positions = positions.map(function(position){
				position.row = maxAboveStem - position.row;
				return position;
			});

			return {
				rows  : gridWidth,
				height: gridHeight,
				cells: positions
			};
		}
	};

	matrix.setRoot("india");
	matrix.addRelative("monday");
	matrix.addRelative("daring");
	matrix.addRelative("cot");
	matrix.addRelative("col");
	$scope.layout = JSON.stringify(matrix.calculateGrid(matrix.crossRelations()));

	$scope.matrix = matrix;
}]);