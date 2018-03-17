// YOUR CODE HERE:
  
const url = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages';
const interval = 1000;
let lastCheckedTime = null;

const app = {

  init(){
    var data = fetch();
    for (var i = 0; i < 20; i++) {
      renderMessage(data.responseJSON.results[data.responseJSON.results.length - i]);
    }
  },
 
  // and put them in the DOM if there are any new posts

  send(message){
  // post a message to the server using an ajax post request
      $.ajax({
        url: url,
        type: 'POST',
        data: message,
        success: ()=>console.log('success!'),
        failure: data => console.error('you messed up', data)
      })
    },
      

// call fetch on set interval. passing in filter of createdAt (using lastCheckedTime) and room
  fetch(){

    // var filter= (!filterObj) ? '' : `where=${JSON.stringify(filterObj)},`;
    // var data = `${filter}limit=10000000`;
    return $.ajax({
      url: url,
      type: 'GET',
      data: 'limit=10000000',
      success: data => {
          console.log('response recieved'); 
          return data
      },
      failure: data => console.error('Trouble', data)

    });

}, 
  // on success: get messages from the server using an ajax request, passing in the filterObj in data field
      // forEach returned result.message call renderMes0sage
  // on failure: console log "failed to fetch messages"

// clearMessages()
  // remove DOM message elements

// : make it look good, put it on the DOM
  renderMessage(message) {
    var $div = $('<div class="tweet"></div>');
  },
  // sanitize data? here or elsewhere?
  // create <div> put it in the messages <section>
  // username
  // message
  // createdAt

// renderRoom()
  // on dropdown, clearMessages and new get request filtering by room

// handleUsernameClick() 
  // store friends and bold the messages from those friends

  handleSubmit(tweetInput){
    var message = {
    // grab username from window.location.search, parse username
      username: window.location.search.slice(10),
      text: tweetInput,
      roomname: '4chan'
    };
    //console.log(message);
    return message;
  }

};


$(document).ready(function(){
  // app.init();
  $('#submit').on('click', function(){
    app.send(app.handleSubmit($('#tweetInput').val()));
  });

});

