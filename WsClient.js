var ws = new WebSocket("ws://127.0.0.1:9090/");      
ws.onopen = function() {       
   alert("Opened"); 
   ws.send("I'm client");
};       
       
ws.onmessage = function (evt) {        
    // alert(evt.data);
    var chatroom = document.getElementById('chatroom')
    chatroom.innerHTML += '<br>' + evt.data
};       
       
ws.onclose = function() {       
   alert("Server Closed");
};       
       
ws.onerror = function(err) {       
   alert("Error: " + err);       
};