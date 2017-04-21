var app = angular.module("crossword", ['create-crossword']);

app.controller("CrosswordController", ["$scope", "Matrix", function ($scope, Matrix) {
	var matrix = Matrix.create();
	matrix.setRoot("demanding");
	matrix.addRelative("monday");
	matrix.addRelative("daring");
	matrix.addRelative("india");
	matrix.addRelative("tuberculosis");
	matrix.addRelative("magician");
	matrix.addRelative("fabrication");
	matrix.addRelative("intensity");
	matrix.addRelative("electrical");
	matrix.addRelative("magnificent");
	$scope.matrix = matrix.createCells(matrix.calculateGrid(matrix.crossRelations()));
}]);