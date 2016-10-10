(function () {
  "use strict"

  angular.module("look-like").controller("cucumberController", ["$scope","aceEditor", function ($scope, aceEditor) {
    var cucumber = {
      showing: false,
      sampleName: "Cucumber",
      running: false,
      errors: [],
      table : {
        rows: [
            {name: "User One"  , email: "user1@abc.com", amount: "$5,008.00", accept: "yes" , url: "https://www.facebook.com/profile.php?id=76273"},
            {name: "User Two"  , email: "user2@abc.com", amount: "$208.00"  , accept: "no"  , url: "https://www.facebook.com/profile.php?id=76273"},
            {name: "User Three", email: "user3@abc.com", amount: "$0.00"    , accept: "yes" , url: ""}
        ],
        values: function(){
          return cucumber.table.rows.map(function(row){
            return [row.name, row.email, row.amount, row.accept, row.url];
          });
        },
      },
      editors : {
        steps:  aceEditor.create("step-editor"),
        features : aceEditor.create("gherkin-editor"),
      },
      run: function(){
        cucumber.running = true;
        var table_rows = cucumber.table.values(),
            snippet = 'expect(' + JSON.stringify(table_rows)+ ').to look_like([["name", "email", "$amount", "yes/no", "url*"]])';

        aceEditor.run(snippet).then(function(result){
          cucumber.errors  = result;
          cucumber.running = false;
        }, function(){
          alert("Unknown error!");
        });
      }
    };

    cucumber.editors.steps.setValue("Then(/^I should see employees table like$/) do |definition| \n\trows = homepage.open.employee_table_rows \n\texpect(rows).to look_like(definition.rows)\nend\n");
    cucumber.editors.features.setValue("Scenario: View employees detail table\n\tGiven I am an admin \n\tThen  I should see employees table like \n\t\t|name      |email     |  $amount  | yes/no | url* |\n");
    cucumber.editors.steps.setReadOnly(true);
    cucumber.editors.features.setReadOnly(true);

    $(window).on("hashchange", function () {
      var url = window.location.hash.length ? window.location.hash : "#/",
          sampleName = decodeURI(url.split("/")[1]);
      cucumber.showing = (sampleName == cucumber.sampleName);
    });

    cucumber.run();
    $scope.cucumber = cucumber;
  }]);

}).call(this);