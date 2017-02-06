MyApp.controller("NewRoomController", function ($scope, $location, ApiService) {
  $scope.createRoom = function() {
    ApiService.createRoom($scope.newroom, onCreatedRoom);
  };
  
  function onCreatedRoom(data) {
    $location.path("/room/" + data.room._id);
  }
});
