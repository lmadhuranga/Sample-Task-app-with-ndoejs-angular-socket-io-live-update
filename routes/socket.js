// Keep track of which names are used so that there are no duplicates
var userNames = (function () {
  var names = {};

  var claim = function (name) {
    if (!name || names[name]) {
      return false;
    } else {
      names[name] = true;
      return true;
    }
  };

  // find the lowest unused "guest" name and claim it
  var getGuestName = function () {
    var name,
      nextUserId = 1;

    do {
      name = 'Guest ' + nextUserId;
      nextUserId += 1;
    } while (!claim(name));

    return name;
  };

  // serialize claimed names as an array
  var get = function () {
    var res = [];
    for (user in names) {
      res.push(user);
    }

    return res;
  };

  var free = function (name) {
    if (names[name]) {
      delete names[name];
    }
  };

  return {
    claim: claim,
    free: free,
    get: get,
    getGuestName: getGuestName
  };
}());



// export function for listening to the socket
module.exports = function (socket) {
    name = userNames.getGuestName();
     // send the new user their name and a list of users
    socket.emit('init', {
        name: name,
        users: userNames.get()
    });

    // notify other clients that a new user has joined
    socket.broadcast.emit('user:join', {
        name: name
    }); 
    
    socket.on('push_data',function(data,callback){
      socket.broadcast.emit('task:add',{new_task:data.new_task});
      callback('data_recieved');
    });
    
    // lisent to the user is typing
    socket.on('user:typing',function(data, callback) { 
        socket.broadcast.emit('user:typing',{user_typing:data.user_typing});
        callback();
        
    })
};
