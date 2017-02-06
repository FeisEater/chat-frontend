MyApp.service("ImgService", function () {
  this.showAvatar = function(user) {
    if (user.avatar == "" || user.avatar == undefined)
      return "img/noavatar.png";
    return "data:" + user.avatarFileType + ";base64," + user.avatar;
  };
});
