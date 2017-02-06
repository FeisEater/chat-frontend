MyApp.controller("EditUserController", function ($scope, $location, ApiService) {
  $scope.blockedUsers = [];
  refreshBlockedUsers();
  $scope.user = {
    nickname: $scope.currentUser.nickname,
    email: $scope.currentUser.email,
    avatar: $scope.currentUser.avatar,
    avatarFileType: $scope.currentUser.avatarFileType,
  };
  
  function refreshBlockedUsers()
  {
    ApiService.getBlockedUsers()
    .then(function(users) {
      $scope.blockedUsers = users;
    });
  }
  
  $scope.unblockUser = function(user) {
    ApiService.unblockUser(user._id, onUnblock);
  };
  
  function onUnblock(data)
  {
    refreshBlockedUsers();
  }

  $scope.$watch('avatar', function (newValue, oldValue, scope) {
    if (newValue.filesize > 500000) {
      scope.avatar = {};
      scope.errormsg = "Avatar too big";
    } else {
      scope.user.avatar = newValue.base64;
      scope.user.avatarFileType = newValue.filetype;
    }
  });
  
  $scope.submit = function() {
    ApiService.editProfile($scope.user, onEdit);
  };
  
  function onEdit(data) {
    $scope.setCurrentUser(data);
    $location.path("/intro");
  }
});
