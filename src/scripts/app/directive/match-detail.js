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
        $scope.matchID = 2382708300;
        function find() {
          var url = "https://api.steampowered.com/IDOTA2Match_570/GetMatchDetails/V001/?key=C3CB04CAA921917E39D9F8329E4A8130&match_id="+$scope.matchID;
          $http.get(url).then(function (response) {
            $scope.datas = response.data.result;
            for(var i=0;i<$scope.datas.players.length;i++) {
              console.log($scope.datas.players[i].account_id);
              var accId = $scope.datas.players[i].account_id;
              console.log(ConvertBit.convertTo64Bit(accId));
            }
          }, function() {
            alert("Turn out I got nothing. Try again");
          });
        }
        $scope.find = find;
      }
    };
  }

})();
