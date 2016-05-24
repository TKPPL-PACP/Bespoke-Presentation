(function() {

  'use strict';

  angular
    .module('scripts.app.directive.test-http', [])
    .directive('testHttp', testHttp);

  testHttp.$inject = [
    '$http',
  ];

  function testHttp($http) {
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
          console.log(url);
          $http.get(url).then(function (response) {
            console.log(response.data);
            $scope.datas = response.data.result;
            console.log($scope.datas);
            console.log($scope.datas.players);
          }, function() {
            alert("Error things");
          });
        }
        $scope.find = find;
      }
    };
  }

})();
