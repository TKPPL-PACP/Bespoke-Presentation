(function() {
  "use strict";

  angular
    .module('scripts.app.controller.main-controller', [])
    .controller('MainController', MainController)
    .service('ConvertBit', ConvertBit);

  MainController.$inject = [
    '$scope',
    '$filter',
    '$http',
    'ConvertBit',
	];

	function MainController($scope, $filter, $http, ConvertBit) {
    //init function in scope
    $scope.convertTo64Bit = ConvertBit.convertTo64Bit;
    
    //init get heroes list
    var urlGetHeroes = "https://api.steampowered.com/IEconDOTA2_570/GetHeroes/v0001/?key=C3CB04CAA921917E39D9F8329E4A8130&language=en_us";
    $http.get(urlGetHeroes).then(function(response) {
      $scope.heroes = response.data.result.heroes;
    });

    //init get item list
    var urlGetItems = "https://api.steampowered.com/IEconDOTA2_570/GetGameItems/v0001/?key=C3CB04CAA921917E39D9F8329E4A8130&language=en_us&format=JSON";
    setTimeout(function() {
      $http.get(urlGetItems).then(function(response) {
        $scope.items = response.data.result.items;
      });
    }, 1500);
    //init pcap steam profiles
    var steamids = ConvertBit.convertTo64Bit('173271017');

    var urlSteamProfile = "http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/";
    urlSteamProfile +=  "?key=C3CB04CAA921917E39D9F8329E4A8130";
    urlSteamProfile += "&steamids=";

    setTimeout(function() {
      $http.get(urlSteamProfile + steamids).then(function (response) {
        $scope.userPCAP = response.data.response.players;
        console.log($scope.userPCAP);
      }, function() {
          alert('These accounts has been blocked maybe ...');
      });
    }, 1500);
  
	}

  function ConvertBit() {

    function convertTo64Bit(id) {
      id = id.toString();
      var to64 = '76561197960265728',
          hasil = '',
          tmp = 0,
          carry = 0,
          now = id.length - 1;
      for(var i = to64.length-1;i>=0;i--) {
        tmp = to64.charCodeAt(i) - 48;
        if(now >= 0) {
          tmp += id.charCodeAt(now) - 48;
          now--;
        }
        tmp += carry;
        carry = 0;
        if(tmp >= 10) carry = 1, tmp -= 10;
        hasil = tmp + hasil;
      }
      return hasil;
    }

    function convertTo32Bit(id) {
      id = id.toString();
      var to32 = '76561197960265728',
          hasil = '',
          hasilTanpaZero = '',
          tmp = 0,
          carry = 0,
          leadZero = 1,
          now = to32.length - 1;

      for(var i = id.length-1;i>=0;i--) {
        tmp = id.charCodeAt(i) - 48;
        if(now >= 0) {
          tmp -= to32.charCodeAt(now) - 48;
          now--;
        }
        tmp -= carry;
        carry = 0;
        if(tmp < 0) carry = 1, tmp += 10;
        hasil = tmp + hasil;
      }
      for(var i = 0;i<hasil.length;i++) {
        if(leadZero && hasil[i] == '0') {
          continue;
        }
        else {
          hasilTanpaZero += hasil[i];
          leadZero = 0;
        }
      }
      return hasilTanpaZero;
    }

    return {
      convertTo32Bit: convertTo32Bit,
      convertTo64Bit: convertTo64Bit
    };
  }
})();
