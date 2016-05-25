(function() {
  "use strict";

  angular
    .module('mainApp', [
      'ui.bootstrap',
      'ngMaterial',

      'src.scripts.test',       

      'scripts.app.directive.test-http',
      'scripts.app.directive.on-enter',
      'scripts.app.directive.match-history',

    ])
    .controller("mainController", mainController);

    mainController.$inject = [
        "$scope",
	    "$filter", 
	    "$http"
	];

	function mainController($scope, $filter, $http) {
    	var urlGetHeroes = "https://api.steampowered.com/IEconDOTA2_570/GetHeroes/v0001/?key=C3CB04CAA921917E39D9F8329E4A8130&language=en_us";
    	$http.get(urlGetHeroes).then( function(response) {
    		$scope.heroes = response.data.result.heroes;
    		console.log(response.data.result.heroes);
    	});
	}

})();
