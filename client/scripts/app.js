// YOUR CODE HERE:
  



var lastCheckedTime = new Date().getTime() - 172800;
const app = {

  server: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
  appData: [],
  init() {
      const interval = 100000;
      var addRoomnameOptions = function(){}
      // fetch
    app.fetch(function(data){
      app.appData=data.results;
      app.renderLast20(data);
      data.results.forEach(function(message){
        app.renderRoom(message.roomname);
      });
    });
    
    setInterval(function(){
      
      app.fetch(function(data){
        app.clearMessages();
        app.appData=data.results;
        data.results.forEach(function(message){
          if (message.roomname === $('#roomSelect').val()){
          app.renderMessage(message);
        };
      });

      });
    },interval);
  },
 
  // and put them in the DOM if there are any new posts

  send(message) {
  // post a message to the server using an ajax post request
    $.ajax({
      url: app.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: (data) => {
        app.fetch(app.renderLast20);
        
        console.log('success!', data);
      },
      failure: data => console.error('you messed up', data)
    });
  },
    

  // call fetch on set interval. passing in filter of createdAt (using lastCheckedTime) and room
  fetch(cb) {

    // var filter= (!filterObj) ? '' : `where=${JSON.stringify(filterObj)},`;
    // var data = `${filter}limit=10000000`;
    return $.ajax({
      url: app.server,
      type: 'GET',
      data: 'order=-createdAt',
      //data: 'limit=100',
      success: cb,
      failure: data => console.error('Trouble', data)

    });
  }, 

  clearMessages() {
    $('#chats').empty();
  },

  renderMessage({username, text, createdAt}) {
    var $div = $('<div class="tweet"></div>');
    var $username = $(`<p class="username ${username}"></p>`).text(username);
    var $text = $('<p class="text"></p>').text(text);
    var $createdAt = $('<p class="createdAt"></p>').text(createdAt);
    $div.append($username, $text, $createdAt);
    $('#chats').append($div);
  },
  
  renderLast20(data) {
    app.clearMessages();
      for (var i = 0; i < 20; i++) {
        app.renderMessage(data.results[i]);
      } 
  }, 
  
  renderRoom(roomname) {
    var found = false;
    var $options = $('option');
    for (var i = 0; i < $options.length; i++) {
      if ($options[i].value === roomname) {
        found = true;
        break;
      }
    }
    if (!found && roomname) {
      $('select').append($(`<option value="${roomname}">${roomname}</option>`))
    }
  },
  
  // on dropdown, clearMessages and new get request filtering by room

  handleUsernameClick(){

  }, 
  // store friends and bold the messages from those friends

  handleSubmit(tweetInput) {
    var message = {
    // grab username from window.location.search, parse username
      username: window.location.search.slice(10),
      text: tweetInput,
      roomname: $('#roomSelect').val()
    };
    //console.log(message);
    app.send(message);
  }

};


$(document).ready(function() {
  app.init();
  $('.submit').on('click', function(){
    app.handleSubmit($('#message').val());
  });

  $('.roomSubmit').on('click', function(){
    app.renderRoom($('#roomEnter').val());
  });

  $('#roomSelect').on('change', function(){
    app.clearMessages();
    app.appData.forEach(function(message){
      if (message.roomname === $('#roomSelect').val()){
      app.renderMessage(message);
      }
    });
    
  });

  $('#chats').on('click', ".username", function() {
    $('.'+$(this).text()).toggleClass('friend')
  })

});




