MyApp.controller("OtherController", function ($scope) {
  $scope.filter = true;
  $scope.toggleFilter = function () {
    $scope.filter = !$scope.filter;
  };
});
