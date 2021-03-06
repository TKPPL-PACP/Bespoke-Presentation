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
      vm.forPrev = [];

      if($scope.accountUser != '') {

        var urlVanity = "http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=C3CB04CAA921917E39D9F8329E4A8130&vanityurl="+$scope.accountUser;
        $http.get(urlVanity).then(function (response) {
          if(response.data.response.steamid) {

            //var steamId = ConvertBit.convertTo64Bit(response.data.response.steamid);
            vm.steamId = response.data.response.steamid;

            var urlSteamProfile = "http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/";
            urlSteamProfile +=  "?key=C3CB04CAA921917E39D9F8329E4A8130";
            urlSteamProfile += "&steamids=";

            var urlMatchHistory = "https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/V001/";
            urlMatchHistory += "?key=C3CB04CAA921917E39D9F8329E4A8130";
            urlMatchHistory += "&matches_requested=6";
            urlMatchHistory += '&account_id=' + vm.steamId;

            vm.steamId32bit = ConvertBit.convertTo32Bit(vm.steamId); 

            $http.get(urlSteamProfile + vm.steamId).then(function (response) {
              vm.user = response.data.response.players[0];

              $http.get(urlMatchHistory).then(function (response) {
                console.log(response.data);
                vm.datas = response.data.result;
                $scope.endMatchId = vm.datas.matches[5].match_id;
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
          else { 
            alert('We can\'t find that user. His or Her MMR maybe under 1k.\nTry another one !!'); 
            vm.hideSpinner = false;
          }
        }, function() {
            alert('We can\'t find that user. His or Her MMR maybe under 1k.\nTry another one !!'); 
            vm.hideSpinner = false;
        });
      }
    }

    function findNext() {
      vm.prenext = true;
      vm.forPrev.push(vm.datas.matches[0].match_id);
      var urlMatchHistory = "https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/V001/";
      urlMatchHistory += "?start_at_match_id=" + $scope.endMatchId;
      urlMatchHistory += "&key=C3CB04CAA921917E39D9F8329E4A8130";
      urlMatchHistory += "&matches_requested=6";
      urlMatchHistory += '&account_id=' + vm.steamId;

      $http.get(urlMatchHistory).then(function (response) {
        console.log(response.data);
        vm.datas = response.data.result;
        $scope.endMatchId = vm.datas.matches[5].match_id;
        vm.prenext = false;
      }, function() {
          alert('Well, history is history. Don\'t mind it anymore.\nYou must go forward');
          vm.prenext = false;
      });
    }

    function findPrev() {
      vm.prenext = true;
      var urlMatchHistory = "https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/V001/";
      urlMatchHistory += "?start_at_match_id=" + vm.forPrev[vm.forPrev.length - 1];
      urlMatchHistory += "&key=C3CB04CAA921917E39D9F8329E4A8130";
      urlMatchHistory += "&matches_requested=6";
      urlMatchHistory += '&account_id=' + vm.steamId;

      $http.get(urlMatchHistory).then(function (response) {
        console.log(response.data);
        vm.datas = response.data.result;
        $scope.endMatchId = vm.datas.matches[5].match_id;
        vm.prenext = false;
        vm.forPrev.pop();
      }, function() {
          alert('Well, history is history. Don\'t mind it anymore.\nYou must go forward');
          vm.prenext = false;
          vm.forPrev.pop();
      });
    }

    vm.findHistory = findHistory;
    vm.findNext = findNext;
    vm.findPrev = findPrev;
    vm.prenext = false;
  }

})();
