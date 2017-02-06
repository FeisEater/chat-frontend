var MyApp = angular.module("MyApp", ["ui.router", "naif.base64"]);

MyApp.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/intro");

  $stateProvider
    .state("main", {
      url: "/",
      templateUrl: "templates/main/main.html",
      controller: "MainController",
      controllerAs: "main",
    })
    .state("main.intro", {
      url: "intro",
      templateUrl: "templates/intro/intro.html",
      controller: "IntroController",
      controllerAs: "intro"
    })
    .state("main.room", {
      url: "chatroom/:roomId",
      templateUrl: "templates/room/room.html",
      controller: "RoomController",
      controllerAs: "room"
    })
    .state("main.newroom", {
      url: "newroom",
      templateUrl: "templates/newroom/newroom.html",
      controller: "NewRoomController",
      controllerAs: "newroom"
    })
    .state("main.login", {
      url: "signin",
      templateUrl: "templates/login/login.html",
      controller: "LoginController",
      controllerAs: "login"
    })
    .state("main.register", {
      url: "register",
      templateUrl: "templates/register/register.html",
      controller: "RegisterController",
      controllerAs: "register"
    })
    .state("main.edituser", {
      url: "edituser",
      templateUrl: "templates/edituser/edituser.html",
      controller: "EditUserController",
      controllerAs: "edituser"
    })
    .state("main.other", {
      url: "other",
      templateUrl: "templates/other/other.html",
    });
});
