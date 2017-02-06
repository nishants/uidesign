angular.module("timeline").service("SearchService", ["", function () {
	var parse       = function(){},
			matches     = function(){},
			service = {
				query: "",
				items : [],
				result: [],
				index : function(taggedList){
					service.items = taggedList;
				},
				search: function (query) {
					service.result = service.items.filter(matches(parse(query)));
				}
			};

	return service;
}]);


