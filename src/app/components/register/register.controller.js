MyApp.controller("RegisterController", function ($scope, $location, ApiService) {
  $scope.user = {
    nickname: "",
    email: "",
    password: "",
    role: "user",
    avatar: "",
    avatarFileType: ""
  };
  
  $scope.avatar = {};
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
    ApiService.register($scope.user, onRegister);
  };
  
  function onRegister() {
    $location.path("/login");
  }
});
