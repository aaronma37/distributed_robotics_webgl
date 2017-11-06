var express = require('express'),
app = express(),
server = require('http').createServer(app),
io = require('socket.io').listen(server);

/*
var express = require('express'); // Get the module
const socketIO = require('socket.io');

const path = require('path');

const PORT = process.env.PORT || 3000;

*/
  class Agent {
	constructor(theta,omega,ping){
		this.theta=theta;
		this.omega=omega;
		this.ping=ping;
	}
    }

var agent_list = [];

var port = process.env.PORT || 3000;

server.listen(port);

app.use(express.static('./'));

/*const server = express()
  .use((req, res) => res.sendFile(__dirname + '/home.html') )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));
*/
app.get('/',function(req, res){
  res.sendFile(__dirname + '/home.html');
});

//const io = socketIO(server);



io.on('connection',function(socket){
  console.log('SOMEONE CONNECTED:', socket.id);
  agent_list[socket.id] = new Agent(0.0,0.001,0.0);

  var foo = setInterval (function () {
		for (key in agent_list){
			if (agent_list[key].ping>5){
				delete agent_list[key];
				break;
			}
			agent_list[key].ping=agent_list[key].ping+1;
  			console.log('SOMEONE CONNECTED:', socket.id);
			socket.emit('new', {id:key,theta:agent_list[key].theta,omega:agent_list[key].omega});
		}
	    }, 300);


  //io.sockets.emit('new', {id:socket.id,x:agent_list[socket.id].x,y:agent_list[socket.id].y,z:agent_list[socket.id].z});

  socket.on('send', function(data){
	if (agent_list[socket.id] != undefined){
	    agent_list[socket.id].theta=data.theta;
	    agent_list[socket.id].omega=data.omega;
	    agent_list[socket.id].ping=0.0;
    	}else{
  	    agent_list[socket.id] = new Agent(0.0,0.001,0.0);
	}



    //io.sockets.emit('new', {id:socket.id,x:agent_list[socket.id].x,y:agent_list[socket.id].y,z:agent_list[socket.id].z});
  });
});
