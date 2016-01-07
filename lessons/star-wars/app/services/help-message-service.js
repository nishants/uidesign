(function () {
  "use strict"
  game.service("HelpMessageService", function () {
    var messages = [
      {
        name          : "onLoad",
        messageFor    : function(state){
          return "Create four missions";
        },
        appliesTo     : function(state){
          return !state.expandBottomBar && !state.selectedPlanet && !state.noMoreMissions();
        },
      },
      {
        name          : "showVehicles",
        messageFor    : function(){
          return "Select planet and assign vehicle";
        },
        appliesTo     : function(state){
          return state.expandBottomBar && !state.selectedPlanet && !state.noMoreMissions();
        },
      }
    ];

    return {
      messageFor: function(state){
        for(var i = 0; i < messages.length; i++){
          if(messages[i].appliesTo(state)){
            return messages[i].messageFor(state);
          }
        }
      }
    };

  });
}).call(this);

/*
Messages
Start Message   : "Create four missions"
Show  Vehicles  : "Select planet and assign vehicle"
Select Planet   : "Select a vehicle to send to this [planet.name]"
Select More     : "Create [4-selected] mission to continue"
Submit          : "Submit to check your luck"
*/
