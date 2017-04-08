var App = function () {
  this.server = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/lobby'
};

App.prototype.init = function() {
  app.fetch();
  app.clearMessages();
};

App.prototype.send = function(message) {

  $.ajax({
  // This is the url you should use to communicate with the parse API server.
  url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/lobby',
  type: 'POST',
  data: JSON.stringify(message),
  contentType: 'application/json',
  success: function (data) {
    console.log('chatterbox: Message sent');
  },
  error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to send message', data);
  }
});

};

App.prototype.fetch = function(data) {

  $.get(app.server, function(data) {
    data.results.forEach(function(item) {
      app.renderMessage(item);
    });
  });

};

App.prototype.clearMessages = function() {
  $('#chats').empty();
};

App.prototype.renderMessage = function(message) {
  var $user = $('<div class = "username"></div>');
  var $msg = $('<div></div>');
  var $chat = $('<div class = "chat"></div>');
  $user.html(escapeRegExp(message.username));
  $msg.html(escapeRegExp(message.text));
  $chat.append($user);
  $chat.append($msg);
  $('#chats').prepend($chat);

};

App.prototype.renderRoom = function(roomName) {
  var $room = $('<option></option>');
  $room.text(roomName);
  $("#roomSelect").append($room);
};

function escapeRegExp(str) {
  if (str === undefined) {
    return undefined;
  } else {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "");
  }
};

$(document).ready(function() {
  
  $('#submit').on('click', (event) => {
    var $input = $("#input").val()
    var msg = {
      username: window.location.search.slice(10), 
      text: $input, 
      roomname: 'lobby'
    };
    app.send(msg);
  });

});

setInterval(function(){
  app.init();
}, 1000)

var app = new App();