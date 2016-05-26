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
        function find() {
          var url = "https://api.steampowered.com/IDOTA2Match_570/GetMatchDetails/V001/?key=C3CB04CAA921917E39D9F8329E4A8130&match_id="+$scope.matchID;
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
                }
                setTimeout(function() {
                    $http.get(urlSteamProfile + steamids).then(function (response2) {
                        $scope.datas = response.data.result;
                        $scope.profiles = response2.data.response.players;
                    }, function() {
                        alert('These accounts has been blocked maybe ...');
                    });
                }, 1500);
              }, function() {
                alert("Turn out I got nothing. Try again");
              });
          }, 1500);
        }
        $scope.find = find;
      }
    };
  }

})();
