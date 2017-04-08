var App = function () {
  this.server = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages'
};

App.prototype.init = function() {
};

App.prototype.send = function(message) {

  $.ajax({
  // This is the url you should use to communicate with the parse API server.
  url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
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
  console.log(message.username)
  console.log(message.text)
  $user.html(escapeRegExp(message.username));
  $msg.html(escapeRegExp(message.text));
  $chat.append($user);
  $chat.append($msg);
  $('#chats').prepend($chat);

};

App.prototype.renderRoom = function() {
};

function escapeRegExp(str) {
  if (str === undefined) {
    return undefined;
  } else {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "");
  }
};

$(document).ready(function() {
  
  $('#submit').on('click',function(event){
    app.send();
    app.fetch();
  });

  // $(document).on("pageload",function(){
  //   app.fetch();
  // });

});

var app = new App();