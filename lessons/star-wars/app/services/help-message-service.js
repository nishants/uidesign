(function () {
  "use strict"
  game.service("HelpMessageService", function () {
    var messages = [
      {
        name: "onLoad",
        messageFor: function (state) {
          return "Create 4 missions.";
        },
        appliesTo: function (state) {
          return !state.expandBottomBar && !state.selectedPlanet && state.assignedMissons() == 0;
        },
      },
      {
        name: "showVehicles",
        messageFor: function () {
          return "Select planet and assign vehicle.";
        },
        appliesTo: function (state) {
          return state.expandBottomBar && !state.selectedPlanet && !state.noMoreMissions();
        },
      },
      {
        name: "selectVehicle",
        messageFor: function (state) {
          return "Select a spacecraft with range over " + state.selectedPlanet.distance + "megamiles.";
        },
        appliesTo: function (state) {
          return state.expandBottomBar && state.selectedPlanet;
        },
      },
      {
        name: "selectMore",
        messageFor: function (state) {
          return "Create " + (4 - state.assignedMissons()) + " more missions.";
        },
        appliesTo: function (state) {
          return !state.expandBottomBar && !state.selectedPlanet && !state.noMoreMissions();
        },
      },
      {
        name: "submit",
        messageFor: function (state) {
          return "Click on Find Falcone. Good Luck !";
        },
        appliesTo: function (state) {
          return state.noMoreMissions();
        },
      }
    ];

    return {
      messageFor: function (state) {
        for (var i = 0; i < messages.length; i++) {
          if (messages[i].appliesTo(state)) {
            return messages[i].messageFor(state);
          }
        }
      }
    };

  });
}).call(this);
