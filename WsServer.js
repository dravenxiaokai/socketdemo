var WebSocketServer = require('ws').Server   
  , wss = new WebSocketServer({port: 9090});

var clientMap = new Object()
var ii = 0;
wss.on('connection', function(ws) {   
    console.log(ws+'上线');
    ws.name = ++ii;
    clientMap[ws.name] = ws;
    ws.on('message', function(message) {   
        console.log('received: %s', message);
        // ws.send(message)
        broadcast(message,ws)
    });   
    ws.on('close', function(){   
        global.gc();    //调用内存回收   
        console.log("leave");   
    });   
}); 
//运行：node --expose-gc WsServer.js   //让global.gc()可以执行 不加参数会报错

function broadcast(msg,socket){
  for(key in clientMap){
    clientMap[key].send(socket.name+' 说： '+msg)
  }
}