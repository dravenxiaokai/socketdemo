var net = require('net');  
var chatServer = net.createServer(),
    clientMap=new Object();

var ii=0;
chatServer.on('connection', function(client) {
  console.log('有人连上来了');
  // JS 可以为对象自由添加属性。这里我们添加一个 name 的自定义属性，用于表示哪个客户端（客户端的地址+端口为依据）  
  //client.name = client.remoteAddress + ':' + client.remotePort;    
  //client.write('Hi ' + client.name + '!\n');    
  //clientList.push(client);
    client.name=++ii;//保证每一个连上来的流水号是唯一的
    clientMap[client.name]=client;
  //client.setEncoding('utf-8');
   //超时事件
//    client.setTimeout(timeout,function(){
//        console.log('连接超时');
//        client.end();
//    });

  client.on('data', function(data) {
     console.log('客户端传来:'+data);
     //client.write('你发来:'+data);
     broadcast(data, client);// 接受来自客户端的信息
  });
  //数据错误事件
    client.on('error',function(exception){
        console.log('client error:' + exception);
        client.end();
    });
    //客户端主动关闭事件
    client.on('close',function(data){
        delete clientMap[client.name];
        console.log(client.name+'下线了');
        broadcast(client.name+'下线了',client);

    });
  
});  
function broadcast(message, client) {
    for(var key in clientMap){
        clientMap[key].write(client.name+'say:'+message+'\n');//向每一个客户端转发消息
    }
}  
chatServer.listen(9090);