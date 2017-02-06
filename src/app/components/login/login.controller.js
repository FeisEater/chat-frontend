MyApp.controller("LoginController", function ($scope, $location, ApiService) {
  $scope.submit = function() {
    ApiService.login($scope.user, onLoggedIn, onError);
  }
  
  function onLoggedIn(data) {
    $scope.setCurrentUser(data.user);
    $location.path("/intro");
  }
  
  function onError(err) {
    console.error("Error could not login: " + err);
  }
});
