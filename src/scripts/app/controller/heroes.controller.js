(function() {
  "use strict";

  angular
    .module('scripts.app.controller.heroes-controller', [])
    .controller("heroesController", heroesController);

  heroesController.$inject = [
    "$scope",
    "$filter",
    "$http",
	];

	function heroesController($scope, $filter, $http) {
    var urlGetHeroes = "https://api.steampowered.com/IEconDOTA2_570/GetHeroes/v0001/?key=C3CB04CAA921917E39D9F8329E4A8130&language=en_us";
    $http.get(urlGetHeroes).then(function(response) {
      $scope.heroes = response.data.result.heroes;
    });
	}
})();
