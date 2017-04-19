var app = angular.module("crossword", []);
app.controller("CrosswordController", ["$scope", function($scope){
	$scope.crossword={
		cellWidth 	: 30,
		cellHeight  : 30,
		cellsPerRow : 10,
		crosswordLayout:{
			cells : [
				{value: "", solid: false},  {value: "", solid: false}, {value: "", solid: false}, {value: "", solid: false}, {value: "", solid: false}, {value: "", solid: false}, {value: "", solid: false}, {value: "", solid: false}, {value: "", solid: false}, {value: "", solid: false},
				{value: "", solid: true },  {value: "", solid: true }, {value: "", solid: true }, {value: "", solid: true }, {value: "", solid: true }, {value: "", solid: true }, {value: "", solid: true }, {value: "", solid: true }, {value: "", solid: true }, {value: "", solid: true },
				{value: "", solid: true },  {value: "", solid: true }, {value: "", solid: true }, {value: "", solid: true }, {value: "", solid: true }, {value: "", solid: true }, {value: "", solid: true }, {value: "", solid: true }, {value: "", solid: true }, {value: "", solid: true },
				{value: "", solid: true },  {value: "", solid: true },  {value: "", solid: true },  {value: "", solid: true },  {value: "", solid: true },  {value: "", solid: true },  {value: "", solid: true },  {value: "", solid: true },  {value: "", solid: true },  {value: "", solid: true },
				{value: "", solid: true },  {value: "", solid: true }, {value: "", solid: true }, {value: "", solid: true }, {value: "", solid: true }, {value: "", solid: true }, {value: "", solid: true }, {value: "", solid: true }, {value: "", solid: true }, {value: "", solid: true },
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
				}
			]
		}
	}
}]);