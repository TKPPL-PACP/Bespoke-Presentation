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
    var urlGetHeroes = "https://api.steampowered.com/IEconDOTA2_570/GetHeroes/v0001/?key=C3CB04CAA921917E39D9F8329E4A8130&language=en_us";
    $http.get(urlGetHeroes).then(function(response) {
      $scope.heroes = response.data.result.heroes;
    });
	}

  function ConvertBit() {

    function convertTo64Bit(id) {
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

    return {
      convertTo64Bit: convertTo64Bit
    };
  }

})();
