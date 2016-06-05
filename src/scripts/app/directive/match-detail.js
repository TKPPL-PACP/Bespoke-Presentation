(function() {

  'use strict';

  angular
    .module('scripts.app.directive.match-detail', [
      'scripts.app.controller.main-controller'
    ])
    .directive('matchDetail', matchDetail);

  matchDetail.$inject = [
    '$http',
    'ConvertBit',
  ];

  function matchDetail($http, ConvertBit) {
    var headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': '*',
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    return {
      restrict: 'AE',
      controller:function($scope) {
        $scope.matchID = 2386390039;
        $scope.hideSpinner = true;
        function find(id) {
          $scope.details = undefined;
          $scope.hideSpinner = false;
          $scope.matchID = id;
          var url = "https://api.steampowered.com/IDOTA2Match_570/GetMatchDetails/V001/?key=C3CB04CAA921917E39D9F8329E4A8130&match_id="+id;
          var urlSteamProfile = "http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/";
          var steamids = "";

          urlSteamProfile +=  "?key=C3CB04CAA921917E39D9F8329E4A8130";
          urlSteamProfile += "&steamids=";

          setTimeout(function() {
            $http.get(url).then(function (response) {
              for(var i=0;i<response.data.result.players.length;i++) {
                var accId = response.data.result.players[i].account_id;
                if(i) steamids += ",";
                steamids += ConvertBit.convertTo64Bit(accId);
                $scope.details = response.data.result;
              }
              setTimeout(function() {
                $http.get(urlSteamProfile + steamids).then(function (response2) {
                  $scope.profiles = response2.data.response.players;
                  $scope.hideSpinner = true;
                }, function() {
                  alert('These accounts has been blocked maybe ...');
                  $scope.hideSpinner = true;
                });
              }, 1500);
            }, function() {
                alert("Turn out I got nothing. Try again");
                $scope.hideSpinner = true;
            });
          }, 1500);
        }

        function insertInfo(detail, player) {
          var tmp = [],
              item = [];
          tmp = tmp.concat((detail.item_0)? detail.item_0 : -1);
          tmp = tmp.concat((detail.item_1)? detail.item_1 : -1);
          tmp = tmp.concat((detail.item_2)? detail.item_2 : -1);
          tmp = tmp.concat((detail.item_3)? detail.item_3 : -1);
          tmp = tmp.concat((detail.item_4)? detail.item_4 : -1);
          tmp = tmp.concat((detail.item_5)? detail.item_5 : -1);
          for(var i=0; i<6;i++){
            for(var j=0; j<$scope.items.length; j++){
              if(tmp[i] === $scope.items[j].id) { 
                item.push($scope.items[j].name);
              }
            }
          }
          console.log(item);
          if(player) {
            $scope.playerInfo = {
              nick: player.personaname,
              avatar: player.avatarfull,
              lastlogoff: player.lastlogoff * 1000
            };
          }
          else {
            $scope.playerInfo = {
              nick: "This person is so private",
              avatar: "images/anonym.jpeg",
              lastlogoff: undefined,
            };
          }
          $scope.playerInfo.items = item;
          $scope.playerInfo.gpm = detail.gold_per_min;
          $scope.playerInfo.xpm = detail.xp_per_min;
        }

        $scope.find = find;
        $scope.insertInfo = insertInfo;
      }
    };
  }

})();
