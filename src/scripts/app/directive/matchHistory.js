(function() {

  'use strict';

  angular
    .module('scripts.app.directive.match-history', [])
    .directive('matchHistory', matchHistory);

  matchHistory.$inject = [
    '$http',
  ];

  function matchHistory($http) {
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
        $scope.accountId = '173271017';
        function findHistory() {
          var urlMatchHistory = "https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/V001/";
          urlMatchHistory += "?key=C3CB04CAA921917E39D9F8329E4A8130";
          urlMatchHistory += "&matches_requested=10";

          if($scope.accountId != '') {
            urlMatchHistory += '&account_id=' + $scope.accountId;
          }

          $http.get(urlMatchHistory).then(function (response) {
            $scope.datas = response.data.result;
          }, function() {
            alert('error');
          });
        }
        $scope.findHistory = findHistory;
      }
    };
  }

})();
