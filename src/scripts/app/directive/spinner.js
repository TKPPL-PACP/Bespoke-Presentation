(function() {
  
  "use strict";

  angular
    .module('scripts.app.directive.spinner', [])
    .directive('rotatingPlaneSpinner', rotatingPlaneSpinner)
    .directive('doubleBounceSpinner', doubleBounceSpinner)
    .directive('waveSpinner', waveSpinner)
    .directive('pulseSpinner', pulseSpinner)
    .directive('chasingDotsSpinner', chasingDotsSpinner);

  function rotatingPlaneSpinner() {
    return {
      restrict: 'AE',
      template: '<div class="three-dots-row-spinner"></div>'
    };
  }

  function doubleBounceSpinner() {
    return {
      restrict: 'AE',
      template: '<div class="double-bounce-spinner">\n' +
                ' <div class="double-bounce1"></div>\n' +
                ' <div class="double-bounce2"></div>\n' +
                '</div>'
    };
  }

  function waveSpinner() {
    return {
      restrict: 'AE',
      template: '<div class="wave-spinner">\n' +
                ' <div class="rect1"></div>\n' +
                ' <div class="rect2"></div>\n' +
                ' <div class="rect3"></div>\n' +
                ' <div class="rect4"></div>\n' +
                ' <div class="rect5"></div>\n' +
                '</div>'
    };
  }

  function pulseSpinner() {
    return {
      restrict: 'AE',
      template: '<div class="pulse-spinner"></div>'
    };
  }

  function chasingDotsSpinner() {
    return {
      restrict: 'AE',
      template: '<div class="chasing-dots-spinner">\n' +
                ' <div class="dot1"></div>\n' +
                ' <div class="dot2"></div>\n' +
                '</div>'
    };
  }
})();
