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

    function findHistory() {
      vm.hideSpinner = true;

      if($scope.accountUser != '') {

        var urlVanity = "http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=C3CB04CAA921917E39D9F8329E4A8130&vanityurl="+$scope.accountUser;
        $http.get(urlVanity).then(function (response) {
          if(response.data.response.success) {

            //var steamId = ConvertBit.convertTo64Bit(response.data.response.steamid);
            vm.steamId = response.data.response.steamid;

            var urlSteamProfile = "http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/";
            urlSteamProfile +=  "?key=C3CB04CAA921917E39D9F8329E4A8130";
            urlSteamProfile += "&steamids=";

            var urlMatchHistory = "https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/V001/";
            urlMatchHistory += "?key=C3CB04CAA921917E39D9F8329E4A8130";
            urlMatchHistory += "&matches_requested=5";
            urlMatchHistory += '&account_id=' + vm.steamId;

            vm.steamId32bit = ConvertBit.convertTo32Bit(vm.steamId); 

            $http.get(urlSteamProfile + vm.steamId).then(function (response) {
              vm.user = response.data.response.players[0];

              $http.get(urlMatchHistory).then(function (response) {
                console.log(response.data);
                vm.datas = response.data.result;
                vm.hideSpinner = false;
              }, function() {
                  alert('Well, history is history. Don\'t mind it anymore.\nYou must go forward');
                  vm.hideSpinner = false;
              });
            }, function() {
                alert('That account has been blocked maybe ...');
                vm.hideSpinner = false;
            });
          }
        }, function() {
            alert('We can\'t find that user. He\'s not famouse.\nTry another one !!'); 
            vm.hideSpinner = false;
        });
      }
    }

    vm.findHistory = findHistory;
  }

})();
