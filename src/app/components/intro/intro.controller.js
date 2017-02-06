MyApp.controller("IntroController", function ($scope, $location, ApiService) {
  ApiService.getRooms()
  .then(function(data) {
    $scope.rooms = data;
    $scope.rooms.reverse();
    $scope.rooms.forEach(function (room) {
      room.messages.reverse();
    });
  });
  $scope.attemptRoom = function(room) {
    console.log(room.passwordHash);
  };
  $scope.getInRoom = function(room) {
    $scope.pushRoom(room);
    $location.path("/chatroom/" + room._id);
  };
  $scope.sendPassword = function(room) {
    ApiService.roomPassword(room._id, {roomPassword: room.roomPassword}, onSentPassword);
  };
  
  function onSentPassword(data) {
    $scope.getInRoom(data.room);
  }
  
  $scope.formatDate = function(date) {
    return new Date(date).toLocaleString();
  };

  $scope.chooseRoomColor = function(room, index) {
    if (room.forbidden)
      return "disabled";
    if (Math.floor(index / 4) % 2 == 0) {
      if (index % 2 == 0) return "room1";
      return "room2";
    }
    if (index % 2 == 0) return "room2";
    return "room1";
  };
});
