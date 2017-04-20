var app = angular.module("crossword", []);
app.controller("CrosswordController", ["$scope", function ($scope) {

	var isNextChar = function(keyCode){
				var isUppercase = keyCode > 64 && keyCode < 91,
						isLowercase = keyCode > 96 && keyCode < 123;
				return isUppercase || isLowercase;
			},

			isBackChar = function(keyCode){
				return keyCode == 8;
			},
			createCell = function(param){
				return {
					label: param.label,
					value: null,
					solid: param.solid
				};
			},
			crossword = {
				cellHeight: 50,
				cellWidth: 50,
				cellsPerRow: 5,
				_goingDown: false,
				focus : -1,
				cells: [
					createCell({label: 1}), createCell({}), createCell({}), createCell({}), createCell({}),
					createCell({}), createCell({solid: true}), createCell({solid: true}), createCell({solid: true}), createCell({solid: true}),
					createCell({}), createCell({}), createCell({}), createCell({}), createCell({}),
					createCell({}), createCell({}), createCell({}), createCell({}), createCell({}),
				],
				select: function(cellIndex){
					crossword.focus = cellIndex;
				},
				_goToPreviousOf: function(index){
					var
							topIndex  = index - crossword.cellsPerRow,
							leftIndex = index - 1,
							hasTop   = topIndex > 0,
							hasLeft  = leftIndex % crossword.cellsPerRow != (crossword.cellsPerRow -1),
							previousIndex = hasTop ? topIndex : (hasLeft ? leftIndex : -1);

					crossword.focus = previousIndex;
				},
				_goToNextOf: function(){},
				input: function(index, event){
					isNextChar(event.keyCode) ? console.log("going to next"): "";
					isBackChar(event.keyCode) ? crossword._goToPreviousOf(index): "";
					console.log(event.keyCode);
				}
			};
	$scope.crossword = crossword
}]);

app.directive("focusIf", [function(){
	return {
		link: function(scope, element, atts){
			scope.$watch(atts.focusIf, function(focusOn){
				if(focusOn){
					element[0].focus();
				}
			});
		}
	};
}])