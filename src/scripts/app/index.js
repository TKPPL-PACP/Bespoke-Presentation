(function() {
  "use strict";

  angular
    .module('mainApp', [
      'ui.bootstrap',
      'ngMaterial',

      'src.scripts.test',       

      'scripts.app.directive.test-http',
      'scripts.app.directive.on-enter',
    ]);

})();
