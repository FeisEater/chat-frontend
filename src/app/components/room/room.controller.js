MyApp.controller("RoomController", function ($scope, $stateParams, $location, $anchorScroll, ApiService) {
  $scope.newmsg = {};
  function refreshMessages(x) {
    ApiService.getRoom($stateParams.roomId)
    .then(function(data) {
      $scope.room = data.room;
      $scope.messages = data.room.messages;
      $scope.moderator = data.moderator;
      $scope.messages.reverse();
    });
  }
  
  function onSend(x) {
    refreshMessages({});
    setTimeout(function() {
      $location.hash("sendbtn");
      $anchorScroll();    
    }, 1000);
    $scope.newmsg.content = "";    
  }
  
  function refreshUsers(x) {
    if (angular.equals($scope.currentUser, {}) || !$scope.moderator) {
      return;
    }
    ApiService.getUsersForRoom($stateParams.roomId)
    .then(function(data) {
      $scope.members = data;
    });
  }

  refreshMessages({});
  setTimeout(function() {
    $location.hash("sendbtn");
    $anchorScroll();  
    $scope.newroom = {
      name: $scope.room.name,
      inviteonly: $scope.room.inviteonly,
      unlisted: $scope.room.unlisted
    };
  }, 1000);
  var autorefresh = setInterval(refreshMessages, 1000);
  $scope.editSuccess = false;

  $scope.send = function() {
    ApiService.sendMessage($stateParams.roomId, $scope.newmsg, onSend);
  };

  $scope.editRoom = function() {
    $scope.editSuccess = false;
    if ($scope.changePassword) {
      if ($scope.newroom == undefined || $scope.newroom.password == undefined)
        $scope.newroom.password = "";
    } else {
      delete $scope.newroom.password;
    }
    ApiService.editRoom($stateParams.roomId, $scope.newroom, onEdit);
  };
  
  function onEdit(x) {
    $scope.editSuccess = true;
    setTimeout(function(){$scope.editSuccess = false;}, 5000)
    refreshMessages({});
  }
  
  $scope.findUserByName = function() {
    ApiService.findUserByName($scope.userToFind)
    .then(function(data) {
      $scope.foundUser = data;
    });
  };
  
  $scope.blockUser = function(userId) {
    ApiService.blockUser(userId, refreshMessages);
  };
    
  $scope.setMemberShip = function(user, role) {
    ApiService.setMembership(user._id, $stateParams.roomId, role, refreshUsers);
  };
  
  $scope.refUsers = function() {
    refreshUsers({});
  };
  
  $scope.formatDate = function(date) {
    return new Date(date).toLocaleString();
  };
  
  $scope.$on("$destroy", function(){
    clearInterval(autorefresh);
  });
});
