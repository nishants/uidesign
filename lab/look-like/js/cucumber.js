(function () {
  "use strict"

  angular.module("look-like").controller("cucumberController", ["$scope","aceEditor", function ($scope, aceEditor) {
    var cucumber = {
      showing: false,
      sampleName: "Cucumber",
      editors : {
        steps: aceEditor.create("step-editor"),
        features : aceEditor.create("gherkin-editor"),
      },
      run: function(){

      }
    };

    cucumber.editors.steps.setValue("Then(/^I should see employees table like$/) do |definition| \n\trows = homepage.open.employee_table_rows \n\texpect(rows).to look_like(definition.rows)\nend");
    cucumber.editors.features.setValue("Scenario: View employees detail table\n\tGiven I am an admin \n\tThen  I should see employees table like \n\t\t|name      |email     |  $amount  | yes/no | url* |");
    cucumber.editors.steps.setReadOnly(true);
    cucumber.editors.features.setReadOnly(true);

    $(window).on("hashchange", function () {
      var url = window.location.hash.length ? window.location.hash : "#/",
          sampleName = decodeURI(url.split("/")[1]);
      cucumber.showing = (sampleName == cucumber.sampleName);
      cucumber.showing ? $scope.editor.disable(): $scope.editor.enable();
    });

    $scope.cucumber = cucumber;
  }]);

}).call(this);