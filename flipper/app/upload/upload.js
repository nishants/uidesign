(function () {
  "use strict"
  window.Flipper.app.controller("UploadController", function ($scope) {
    $scope.uploadForm = {
      lastUpload: {name: 'none'},
      onUpload: function (file) {
        $scope.uploadForm.lastUpload = {
          "url": file.url,
          "name": file.filename,
          "size": file.size,
          "id": file.id,
        }
      }
    };
  })
}).call(this);