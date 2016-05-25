(function() {

  'use strict';

  angular
    .module('scripts.app.directive.match-history', [])
    .directive('matchHistory', matchHistory)
    .controller('MatchHistoryController', MatchHistoryController);

  matchHistory.$inject = [
    '$http',
    'ConvertBit',
  ];

  function matchHistory($http, ConvertBit) {
    var headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': '*',
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    return {
      restrict: 'AE',
      controller: 'MatchHistoryController',
      controllerAs: 'vm',
      bindToController: true
    };
  }
  
  function MatchHistoryController($scope, $http, ConvertBit) {

    var vm = this;

    $scope.accountId = '173271017';
    
    function findHistory() {
      var steamId = ConvertBit.convertTo64Bit($scope.accountId);

      var urlSteamProfile = "http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/";
      urlSteamProfile +=  "?key=C3CB04CAA921917E39D9F8329E4A8130";
      urlSteamProfile += "&steamids=" + steamId;

      var urlMatchHistory = "https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/V001/";
      urlMatchHistory += "?key=C3CB04CAA921917E39D9F8329E4A8130";
      urlMatchHistory += "&matches_requested=10";

      if($scope.accountId != '') {
        urlMatchHistory += '&account_id=' + $scope.accountId;
      }

      $http.get(urlMatchHistory).then(function (response) {
        vm.datas = response.data.result;
      }, function() {
          alert('Well, history is history. Don\'t mind it anymore.\nYou must go forward');
      });
      $http.get(urlSteamProfile).then(function (response) {
        vm.user = response.data.response.players[0];
      }, function() {
          alert('That account has been blocked maybe ...');
      });

    }

    vm.findHistory = findHistory;
  }

})();
