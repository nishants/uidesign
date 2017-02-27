var app = angular.module("imagepicker", []);
app.constant("FILEPICKER", {
	key: "Ah4UJf1UdQPOwFhCtECGqz",
	options: {
		mimetype: 'image/*',
		container: 'modal',
		services: ['COMPUTER', 'FACEBOOK', 'INSTAGRAM', 'GOOGLE_DRIVE', 'DROPBOX']
	}
});

app.value("Remote", {
	url: "http://localhost:5000/items"
});

app.controller("FormController", ["$scope", "$http", "Remote", function($scope, $http, Remote){
	var form = {
		name  : "Saree",
		title  : "Premium Blue Benarasi Saree",
		description  : "Made with blue silk and golden threads. Be the royalty to the party.",
		saving: false,
		images: [
			{name: "one", url: "https://cdn.filestackcontent.com/FV8pOUsxRpiA56uC7306"},
			{name: "two", url: "https://cdn.filestackcontent.com/azOXY2iASm6clQ3YVTDg"},
			{name: "three", url: "https://cdn.filestackcontent.com/FV8pOUsxRpiA56uC7306"},
			{name: "four", url: "https://cdn.filestackcontent.com/azOXY2iASm6clQ3YVTDg"}
		],
		serialize: function () {
			return {
				data: {
					name 				: form.name,
					title 			: form.title,
					description : form.description,
					images  		: form.images
				}
			};
		},
		save: function () {
			var create = function(){
				$http.post(Remote.url, form.serialize()).then(function (response) {
					form.id = response.id;
					form.saving = false;
				});
			}, save = function(){
				$http.put(Remote.url, form.serialize()).then(function (response) {
					form.saving = false;
				})
			};
			form.saving = true;
			form.id ? save() : create();
		}
	};

	$scope.form = form;
}]);
app.directive("imagepicker", ["FILEPICKER", "$timeout", function(FILEPICKER, $timeout){
	return{
		restrict: "A",
		scope   : true,
		link : function(scope, element, attrs){
			filepicker.setKey(FILEPICKER.key);
			element.on("click", function(){
				filepicker.pickMultiple(
						FILEPICKER.options,
						function(files){
							scope.lastUploaded = files.map(function(file){
								return {
									name: file.filename,
									url : file.url
								};
							});
							$timeout(function(){
								scope.$eval(attrs.onUpload);
							});
							console.log(JSON.stringify(Blob));
						},
						function(FPError){
							console.log(FPError.toString());
						});
			})
		}
	};
}])