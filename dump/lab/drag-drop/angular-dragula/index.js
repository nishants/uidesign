var app = angular.module('myApp', [angularDragula(angular)]);

 app.controller('IsContainerModel', ['$scope', '$element', 'dragulaService', function($scope, $element, dragulaService){
		
		$scope.items1 = [{
		  content: 'item 1'
		}, {
		  content: 'item 2'
		}, {
		  content: 'Item 3'
		}, {
		  content: 'Item 4'
		}];
    	$scope.cartModel = [];
	 
	 	var sourceContainer = document.querySelector('#containerLeft'),
      	targetContainer = document.querySelector('#cart');
		 function accepts(el, target, source) {
		  if (source === sourceContainer || source === target) {
			return true;
		  }
		}
		
	 	
	 	dragulaService.options($scope, 'bag-one', {
			// only copy from the target container
			copy: function (el, source) {
				return source === sourceContainer
		  	},
		  	//move only from left to right  
		  	accepts: accepts,
			copySortSource: function (el, target) {
				return true;
			}
		});

}]);