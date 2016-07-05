

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.send('<h1>Welcome World of Wente</h1>');
});

//在线用户
var onlineUsers = {};
//当前在线人数
var onlineCount = 0;
var ReCount=0;
var TofWho = 0;
io.on('connection', function(socket){
	console.log('a user connected');
	
	//监听新用户加入
	socket.on('login', function(obj){
		//将新加入用户的唯一标识当作socket的名称，后面退出的时候会用到
		socket.name = 1;
		
		//检查在线列表，如果不在里面就加入
		//if(!onlineUsers.hasOwnProperty(obj.userid)) {
			onlineUsers[obj.userid] = obj.username;
			//在线人数+1
			ReCount++
			onlineCount=ReCount
		//}
		
		//向所有客户端广播用户加入
		socket.broadcast.emit('PlayerID1', 1);
		io.emit('login', {onlineUsers:onlineUsers, onlineCount:onlineCount, user:obj});
		//var countRe=function(){onlineCount=0}
		if(ReCount==2)ReCount=0
		
		console.log('Player-'+onlineCount+'加入了决斗');
	});
	
	//监听用户退出
	socket.on('disconnect', function(){
		//将退出的用户从在线列表中删除
		if(onlineUsers.hasOwnProperty(socket.name)) {
			//退出用户的信息
			var obj = {userid:socket.name, username:onlineUsers[socket.name]};
			
			//删除
			delete onlineUsers[socket.name];
			//在线人数-1
			onlineCount--;
			
			//向所有客户端广播用户退出
			io.emit('logout', {onlineUsers:onlineUsers, onlineCount:onlineCount, user:obj});
			console.log(obj.username+'退出了决斗');
		}
	});
	
	//监听用户 移动卡行为
	socket.on('move', function(obj){
		//向所有客户端广播发布的消息
		socket.broadcast.emit('move',{cardX:obj.cardX,cardY:obj.cardY,key:obj.key});
		console.log('移动了'+obj.cardX+','+obj.cardY+','+obj.key);
	});
  	//监听用户 召唤卡行为
	socket.on('summon', function(obj){
		//向所有客户端广播发布的消息
		socket.broadcast.emit('summon',{cardX:obj.cardX,cardY:obj.cardY,key:obj.key});
		console.log('召唤了'+obj.cardX+','+obj.cardY+','+obj.key);
	});
	socket.on('changeMy', function(obj){
		//向所有客户端广播发布的消息
		socket.broadcast.emit('changeMy',{change:obj.change});
		console.log('换人');
	});
	socket.on('battle', function(obj){
		//向所有客户端广播发布的消息
		socket.broadcast.emit('battle',{akey:obj.akey,hkey:obj.hkey});
		console.log('战斗开始了');
	});
	socket.on('action', function(obj){
		//向所有客户端广播发布的消息
		socket.broadcast.emit('action',{user:obj.user,action:obj.action,x:obj.x,y:obj.y});
		console.log('对方使用行动了');
	});	
	socket.on('uni', function(obj){
		//向所有客户端广播发布的消息
		socket.broadcast.emit('uni',{user:obj.user,x:obj.x,y:obj.y});
		console.log('对方使用必杀了');
	});	
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});