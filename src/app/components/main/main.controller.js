MyApp.controller("MainController", function ($scope, ApiService, ImgService) {
  ApiService.getSessionToken();
  $scope.setCurrentUser = function(user) {
    $scope.currentUser = user;
  };
  $scope.setCurrentUser(ApiService.getSessionUser());
  $scope.userLoggedIn = function() {
    return ApiService.getSessionUser() != undefined;
  };
  $scope.pushRoom = function(room) {
    var skip = false;
    $scope.openRooms.forEach(function (r) {
      if (r._id.toString() == room._id.toString())
        skip = true;
    });
    if (!skip)
      $scope.openRooms.push(room);
  };
  $scope.removeRoom = function(room) {
    $scope.openRooms.splice($scope.openRooms.indexOf(room), 1);
  };
  $scope.openRooms = [];
  $scope.showImage = function(user) {
    return ImgService.showAvatar(user);
  };
  $scope.logout = function() {
    ApiService.logout();
    $scope.setCurrentUser(undefined);
  };
});
