var app = angular.module("imagepicker", []);
app.constant("FILEPICKER", {
	key: "Ah4UJf1UdQPOwFhCtECGqz",
	options: {
		mimetype: 'image/*',
		container: 'modal',
		services: ['COMPUTER', 'FACEBOOK', 'INSTAGRAM', 'GOOGLE_DRIVE', 'DROPBOX']
	}
});

app.service("FileUploadService", [function(){
	var service = {
		uploads: [],
		addUpload: function (file) {
			service.uploads.push({
				name: file.filename,
				url : file.url
			});
		}
	};
	return service;
}]);

app.controller("FormController" ,[ "$scope", "FileUploadService", function($scope, FileUploadService){

}]);
app.directive("imagepicker", ["FILEPICKER", "$timeout", function(FILEPICKER, $timeout){
	return{
		restrict: "A",
		scope   : true,
		link : function(scope, element, attrs){
			filepicker.setKey(FILEPICKER.key);
			element.on("click", function(){
				filepicker.pick(
						FILEPICKER.options,
						function(file){
							scope.lastUploaded = {
								name: file.filename,
								url : file.url
							};
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