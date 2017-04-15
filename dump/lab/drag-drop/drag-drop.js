var app = angular.module("drag-drop", []);
app.directive("drag-drop", [function(){
	return {
		restrict : "C",
		scope    : true,
		link     : function(element, scope, attrs){
			console.log("drag drop active")
		}
	};
}])