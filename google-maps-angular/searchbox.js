angular.module("search-box-example", ['uiGmapgoogle-maps'])

    .config(['uiGmapGoogleMapApiProvider', function (GoogleMapApi) {
      GoogleMapApi.configure({
        key: 'AIzaSyDnRA9bsV_CtLr-f0NnFdf7dXZPPMvsEoU',
        v: '3.21',
        libraries: 'places'
      });
    }])

    .run(['$templateCache', function ($templateCache) {
      $templateCache.put('searchbox.tpl.html', '<input id="pac-input" class="pac-controls" type="text" placeholder="Search">');
      $templateCache.put('window.tpl.html', '<div ng-controller="WindowCtrl" ng-init="showPlaceDetails(parameter)">{{place.name}}</div>');
    }])

    .controller('WindowCtrl', function ($scope) {
      $scope.place = {};
      $scope.showPlaceDetails = function(param) {
        $scope.place = param;
      }
    })

    .controller("SearchBoxController",['$scope', '$timeout', 'uiGmapLogger', '$http','uiGmapGoogleMapApi'
      , function ($scope, $timeout, $log, $http, GoogleMapApi) {
        $log.doLog = true

        $scope.toggleMap = function () {
          $scope.searchbox.options.visible = !$scope.searchbox.options.visible
        }

        GoogleMapApi.then(function(maps) {
          maps.visualRefresh = true;
          $scope.defaultBounds = new google.maps.LatLngBounds(
              new google.maps.LatLng(40.82148, -73.66450),
              new google.maps.LatLng(40.66541, -74.31715));


          $scope.map.bounds = {
            northeast: {
              latitude:$scope.defaultBounds.getNorthEast().lat(),
              longitude:$scope.defaultBounds.getNorthEast().lng()
            },
            southwest: {
              latitude:$scope.defaultBounds.getSouthWest().lat(),
              longitude:-$scope.defaultBounds.getSouthWest().lng()

            }
          }
          $scope.searchbox.options.bounds = new google.maps.LatLngBounds($scope.defaultBounds.getNorthEast(), $scope.defaultBounds.getSouthWest());
        });

        var selectPlace = function(map, eventName, arguments){
          // Clear existing markers (these came on last search
          $scope.map.markers = [];

          // Create marker for location
          var clickedLocation = arguments[0].latLng;

          if($scope.marker){
            $scope.marker.setMap(null);
            $scope.area.setMap(null);
          }

          $scope.marker = new google.maps.Marker({
            position: clickedLocation,
            map: map,
            animation: google.maps.Animation.DROP,
            title: "I selected this marker"
          });
          var toggleBounce = function(){
            if ($scope.marker.getAnimation() !== null) {
              $scope.marker.setAnimation(null);
            } else {
              $scope.marker.setAnimation(google.maps.Animation.BOUNCE);
            }
          };
          $scope.marker.addListener('click', toggleBounce);

          $scope.area = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            map: map,
            center: clickedLocation,
            radius: 500
          });

          map.panTo(new google.maps.LatLng(clickedLocation.lat(),clickedLocation.lng()));

          //Show marker
          console.log(eventName);
          console.log(arguments);
          console.log("lat: "+ clickedLocation.lat()+", long: "+clickedLocation.lng());
          //location.stop();
        };
        var onPlaceChange = function (searchBox) {

          places = searchBox.getPlaces()

          if (places.length == 0) {
            return;
          }
          // For each place, get the icon, place name, and location.
          newMarkers = [];
          var bounds = new google.maps.LatLngBounds();
          for (var i = 0, place; place = places[i]; i++) {
            // Create a marker for each place.
            var marker = {
              id: i,
              place_id: place.place_id,
              name: place.name,
              latitude: place.geometry.location.lat(),
              longitude: place.geometry.location.lng(),
              options: {
                visible: false
              },
              templateurl: 'window.tpl.html',
              templateparameter: place
            };
            newMarkers.push(marker);

            bounds.extend(place.geometry.location);
          }

          $scope.map.bounds = {
            northeast: {
              latitude: bounds.getNorthEast().lat(),
              longitude: bounds.getNorthEast().lng()
            },
            southwest: {
              latitude: bounds.getSouthWest().lat(),
              longitude: bounds.getSouthWest().lng()
            }
          }

          _.each(newMarkers, function (marker) {
            marker.closeClick = function () {
              $scope.selected.options.visible = false;
              marker.options.visble = false;
              return $scope.$apply();
            };
            marker.onClicked = function () {
              $scope.selected.options.visible = false;
              $scope.selected = marker;
              $scope.selected.options.visible = true;
            };
          });

          $scope.map.markers = newMarkers;
        };
        angular.extend($scope, {
          selected: {
            options: {
              visible:false

            },
            templateurl:'window.tpl.html',
            templateparameter: {}
          },
          map: {
            control: {},
            center: {
              latitude: 40.74349,
              longitude: -73.990822
            },
            zoom: 12,
            options: {
              draggableCursor: 'crosshair'
            },
            dragging: false,
            bounds: {},
            markers: [],
            idkey: 'place_id',
            events: {
              idle: function (map) {

              },
              click: selectPlace,
              dragend: function(map) {
                //update the search box bounds after dragging the map
                var bounds = map.getBounds();
                var ne = bounds.getNorthEast();
                var sw = bounds.getSouthWest();
                $scope.searchbox.options.bounds = new google.maps.LatLngBounds(sw, ne);
                //$scope.searchbox.options.visible = true;
              }
            }
          },
          searchbox: {
            template: 'searchbox.tpl.html',
            //position:'top-right',
            position:'top-left',
            options: {
              bounds: {},
              visible: true
            },
            //parentdiv:'searchBoxParent',
            events: {
              places_changed: onPlaceChange,
            }
          }
        });
      }]);