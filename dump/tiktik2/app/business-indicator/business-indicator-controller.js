(function () {
  "use strict"

  angular.module("tiktik").controller("BusinessIndicatorController", ["$scope", function ($scope) {
    $scope.account = {
      resets: function(subject, valueChanged){
        if(!valueChanged){return;}

        this.input.value = null;

        if(subject == "account"){
          this.selected.subaccount = null;
        }
        if(subject == "business"){
          this.selected.account = null;
          this.selected.subaccount = null;
        }
      },

      set : function(subject, value){
        var valueChanged = this.selected[subject] != value;
        this.resets(subject, valueChanged);
        this.selected[subject] = value;
        this.input.select(null);
      },

      input: {
        value: null,
        subject: null,
        subjectOptions: [],

        select: function(subject){
          var userTryingToUnselect = (subject == this.subject);
          this.subject = userTryingToUnselect ? null : subject;
        },
        subjectIs: function(name){
          return name == this.subject;
        },
      },

      selected: {
        business    : {name: "Tookitako", id: 1},
        account     : {name: "Demo", id: 1},
        subaccount  : {name: "Demo1", id: 1},

      },
      
      options: {
        business    : [{name: "Tookitako", id: 1} , {name: "Biba", id: 2}       , {name: "Rangriti", id: 3}     ],
        account     : [{name: "Demo", id: 1}      , {name: "Campaigns", id: 2}  , {name: "Rangriti-Demo", id: 3}],
        subaccount  : [{name: "Demo1", id: 1}     , {name: "Demo2", id: 2}      , {name: "Demo3", id: 3}        ],

        of: function(subjectName){
          return this[subjectName];
        }
      },

      filter: function(options, input){
        var filtered = [];
        if(!input) return options;
        for(var i =0 ; i < options.length; i++){
          if(options[i].name.toLowerCase().startsWith(input.toLocaleString())){
            filtered.push(options[i]);
          }
        }
        return filtered;
      }
    };

  }]);

}).call(this);