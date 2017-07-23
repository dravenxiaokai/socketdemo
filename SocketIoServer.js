var app = require('express')();    
var http = require('http').Server(app);    
var io = require('socket.io')(http);    
var  fs=  require('fs');

//----------------httpServer设置-------------------
app.get('/', function(req, res){    
    function recall(data){    
            res.send(data.toString());    
        }    
        fs.readFile('./socketIoClient.html', function(err,  data)  {    
            if  (err)  {    
              // console.log("bbbbb:"+err);    
              recall('文件不存在');    
            }else{    
              //console.log(data.toString());    
              recall(data);    
            }    
        });    
    //res.send('<h1>Welcome Realtime Server</h1>');    
});

app.get('/js/socket.io.js', function(req, res){    
    function recall(data){    
            res.send(data.toString());    
        }    
        fs.readFile('./js/socket.io.js', function(err,  data)  {    
            if  (err)  {    
              // console.log("bbbbb:"+err);    
              recall('文件不存在');    
            }else{    
              //console.log(data.toString());    
              recall(data);    
            }    
        });    
    //res.send('<h1>Welcome Realtime Server</h1>');    
});
//-----------------WebSocket设置------------------------
var onlineUsers = {};
var ii=0;
io.on('connection',function(socket){
  console.log('有人连上来了')
  //监听新用户加入
  socket.name=++ii;
  onlineUsers[socket.name] = socket

  //监听用户退出
  socket.on('disconnect',function(){
    console.log('有人退出');
    delete onlineUsers[socket.name];
  })
   //监听用户发布聊天内容    
  socket.on('message', function(msg){    
    //向所有客户端广播发布的消息
    // console.log(socket.name+'说：'+msg);
    // socket.send(socket.name+'说：'+msg)
    sayall(msg,socket);
  });
})
function sayall(msg,socket){
  for(var key in onlineUsers){
    onlineUsers[key].send(socket.name+'说：'+msg);
  }
}
http.listen(9090, function(){
    console.log('listening on *:9090');
});