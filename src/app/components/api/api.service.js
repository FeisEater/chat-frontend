MyApp.service("ApiService", function ($http, $window) {
  this.syncMethod = function () {
    return 0;
  };

//  var path = window.env.API_URL;
//  console.log(path);

  this.getRooms = function () {
    return $http.get("/room")
      .then(function (response) {
        return response.data;
      })
      .catch(function (err) {
        console.error("Error ApiService getRooms ", err);
        return {};
      });
  };

  this.getRoom = function (roomId) {
    return $http.get("/room/" + roomId)
      .then(function (response) {
        return response.data;
      })
      .catch(function (err) {
        console.error("Error ApiService getRoom ", err);
        return {};
      });
  };
  
  this.createRoom = function (room, successEvent) {
    return $http.post("/room", room)
      .then (function (response) {
        $http.defaults.headers.common['X-Access-Token'] = response.data.token;
        $window.sessionStorage.token = response.data.token;
        successEvent(response.data);
      },
      function (response) {
        console.error("Error room could not be created: " + response.data)
      });
  }
  
  this.sendMessage = function (roomId, msg, successEvent) {
    return $http.post("/room/" + roomId + "/message", msg)
      .then(function (response) {
        successEvent(response.data);
      },
      function (response) {
        console.error("Error message could not be sent: " + response.data);
      });
  };

  this.getUsersForRoom = function (roomId) {
    return $http.get("/room/" + roomId + "/member")
      .then (function (response) {
        return response.data;
      })
      .catch(function (err) {
        console.error("Error ApiService getUsersForRoom ", err);
        return {};
      });
  };
  
  this.findUserByName = function (name) {
    return $http.get("/user/" + name)
      .then (function (response) {
        return response.data;
      })
      .catch(function (err) {
        console.error("Error ApiService findUserByName ", err);
        return {};
      });
  };
  
  this.blockUser = function (userId, successEvent) {
    return $http.put("/user/" + userId + "/block")
      .then (function (response) {
        $http.defaults.headers.common['X-Access-Token'] = response.data.token;
        $window.sessionStorage.token = response.data.token;
        $window.sessionStorage.user = JSON.stringify(response.data.user);
        successEvent(response.data);
      },
      function (response) {
        console.error("Error ApiService blockUser ", response.data);
      });
  };

  this.unblockUser = function (userId, successEvent) {
    return $http.put("/user/" + userId + "/unblock")
      .then (function (response) {
        $http.defaults.headers.common['X-Access-Token'] = response.data.token;
        $window.sessionStorage.token = response.data.token;
        $window.sessionStorage.user = JSON.stringify(response.data.user);
        successEvent(response.data);
      },
      function (response) {
        console.error("Error ApiService blockUser ", response.data);
      });
  };
  
  this.getBlockedUsers = function () {
    return $http.get("/blockedusers")
      .then (function (response) {
        return response.data;
      })
      .catch(function (err) {
        console.error("Error ApiService getBlockedUsers ", err);
        return {};
      });
  };
  
  this.setMembership = function (userId, roomId, role, successEvent) {
    return $http.post("/room/" + roomId + "/member", {userId: userId, role: role})
      .then (function (response) {
        successEvent(response.data);
      },
      function (response) {
        console.error("Error ApiService setMembership ", response.data);
      });
  };
  
  this.login = function (user, successEvent, failEvent) {
    return $http.post("/login", user)
      .then(function (response) {
        $http.defaults.headers.common['X-Access-Token'] = response.data.token;
        $window.sessionStorage.token = response.data.token;
        $window.sessionStorage.user = JSON.stringify(response.data.user);
        successEvent(response.data);
      },
      function (response) {
        failEvent(response.data);
      });
  };

  this.register = function (user, successEvent) {
    return $http.post("/user", user)
      .then(function (response) {
        successEvent();
      },
      function (response) {
        console.error("Error ApiService register: " + response.data);
      });
  };
  
  this.editProfile = function(user, successEvent) {
    return $http.put("/user", user)
      .then(function (response) {
        $window.sessionStorage.user = JSON.stringify(user);
        successEvent(user);
      },
      function (response) {
        console.error("Error ApiService editProfile: " + response.data);
      });
  };
  
  this.editRoom = function(roomId, room, successEvent) {
    return $http.put("/room/" + roomId, room)
      .then(function (response) {
        successEvent(room);
      },
      function (response) {
        console.error("Error ApiService editRoom: " + response.data);
      });
  };

  this.roomPassword = function (roomId, pw, successEvent) {
    return $http.post("/room/" + roomId, pw)
      .then(function (response) {
        $http.defaults.headers.common['X-Access-Token'] = response.data.token;
        $window.sessionStorage.token = response.data.token;
        successEvent(response.data);
      },
      function (response) {
        console.error("Error password could not be sent: " + response.data);
      });
  };
  
  this.getSessionToken = function () {
    $http.defaults.headers.common['X-Access-Token'] = $window.sessionStorage.token;
  };
  
  this.getSessionUser = function() {
    var user = $window.sessionStorage.user;
    if (user == undefined || user == "undefined" || user == null)
      return undefined;
    return JSON.parse($window.sessionStorage.user);
  };
  
  this.logout = function() {
    delete $http.defaults.headers.common['X-Access-Token'];
    delete $window.sessionStorage.token;
    delete $window.sessionStorage.user;
  };
});
