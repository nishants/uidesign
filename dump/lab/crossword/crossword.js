var app = angular.module("crossword", []);
app.controller("CrosswordController", ["$scope", function($scope){
	var crossword = {
		cellWidth 	: 30,
		cellHeight  : 30,
		cellsPerRow : 10,
		update: function(input){
			var fromIndex = input.index,
					cells = crossword.crosswordLayout.cells;
			if(!input.vertical){
				for(var i = 0; i< input.length; i++){
					cells[i + fromIndex].value = input.value[i] || null;
				}
			}

			if(input.vertical){
				for(var i = 0; i< input.length; i++){
					cells[i*crossword.cellsPerRow + fromIndex].value = input.value[i] || null;
				}
			}

		},
		crosswordLayout:{
			cells : [
				{value: "", solid: false},  {value: "", solid: false}, {value: "", solid: false}, {value: "", solid: false}, {value: "", solid: false}, {value: "", solid: false}, {value: "", solid: false}, {value: "", solid: false}, {value: "", solid: false}, {value: "", solid: false},
				{value: "", solid: false },  {value: "", solid: true }, {value: "", solid: true }, {value: "", solid: true }, {value: "", solid: true }, {value: "", solid: true }, {value: "", solid: true }, {value: "", solid: true }, {value: "", solid: true }, {value: "", solid: true },
				{value: "", solid: false },  {value: "", solid: true }, {value: "", solid: true }, {value: "", solid: true }, {value: "", solid: true }, {value: "", solid: true }, {value: "", solid: true }, {value: "", solid: true }, {value: "", solid: true }, {value: "", solid: true },
				{value: "", solid: false },  {value: "", solid: true },  {value: "", solid: true },  {value: "", solid: true },  {value: "", solid: true },  {value: "", solid: true },  {value: "", solid: true },  {value: "", solid: true },  {value: "", solid: true },  {value: "", solid: true },
				{value: "", solid: false },  {value: "", solid: true }, {value: "", solid: true }, {value: "", solid: true }, {value: "", solid: true }, {value: "", solid: true }, {value: "", solid: true }, {value: "", solid: true }, {value: "", solid: true }, {value: "", solid: true },
				{value: "", solid: true },  {value: "", solid: true }, {value: "", solid: true }, {value: "", solid: true }, {value: "", solid: true }, {value: "", solid: true }, {value: "", solid: true }, {value: "", solid: true }, {value: "", solid: true }, {value: "", solid: true },
				{value: "", solid: true },  {value: "", solid: true }, {value: "", solid: true }, {value: "", solid: true }, {value: "", solid: true }, {value: "", solid: true }, {value: "", solid: true }, {value: "", solid: true }, {value: "", solid: true }, {value: "", solid: true },
				{value: "", solid: true },  {value: "", solid: true }, {value: "", solid: true }, {value: "", solid: true }, {value: "", solid: true }, {value: "", solid: true }, {value: "", solid: true }, {value: "", solid: true }, {value: "", solid: true }, {value: "", solid: true },
				{value: "", solid: true },  {value: "", solid: true }, {value: "", solid: true }, {value: "", solid: true }, {value: "", solid: true }, {value: "", solid: true }, {value: "", solid: true }, {value: "", solid: true }, {value: "", solid: true }, {value: "", solid: true },
			]
		},
		inputLayout: {
			inputs: [
				{
					value: "abcdefghij",
					index: 0,
					length: 10,
					vertical: false,
				},
				{
					value: "bcde",
					index: 10,
					length: 4,
					vertical: true,
				}

			]
		}
	};

	crossword.update(crossword.inputLayout.inputs[0]);
	crossword.update(crossword.inputLayout.inputs[1]);
	$scope.crossword= crossword}]);