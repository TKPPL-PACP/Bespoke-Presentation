(function() {

  'use strict';

  angular
    .module('scripts.app.directive.match-detail', [])
    .directive('matchDetail', matchDetail);

  matchDetail.$inject = [
    '$http',
  ];

  function matchDetail($http) {
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
          }, function() {
            alert("Error things");
          });
        }
        $scope.find = find;
      }
    };
  }

})();
