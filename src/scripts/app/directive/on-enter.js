(function() {

  'use strict';

  angular
    .module('scripts.app.directive.on-enter', [])
    .directive('onEnter', onEnter)
  ;

  function onEnter() {
    return function(scope, element, attrs) {
      element.bind("keydown keypress", function(event) {
        if(event.which === 13) {
          scope.$apply(function() {
            scope.$eval(attrs.onEnter);
          });
          event.preventDefault();
        }
      });
    };
  }
})();
