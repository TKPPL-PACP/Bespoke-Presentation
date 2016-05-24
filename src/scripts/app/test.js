(function() {
  "use strict";

  angular
    .module("src.scripts.test",[])
    .controller("testController", testController);

  testController.$inject = [
    "$scope",
    "$filter", 
  ];

  function testController($scope, $filter) {
    $scope.test = "test";

    function greeting() {
      alert('Hello '+$scope.greet);
    }
    $scope.greet = "PACP Members";
    $scope.greeting = greeting;
  }
})();

