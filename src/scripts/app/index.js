(function() {
  "use strict";

  angular
    .module('mainApp', [

    // External
      'ui.bootstrap',
      'ngMaterial',

    // Custom JS
      'scripts.app.controller.main-controller',

    // Directives
      'scripts.app.directive.match-detail',
      'scripts.app.directive.match-history',
      'scripts.app.directive.spinner',
      'scripts.app.directive.on-enter',

    ]);

})();
