var express = require('express')
var app = express()
const cors = require('cors');


app.use(cors());
app.use(express.static('public'))


const http = require('http').Server(app);
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
  }
});


app.get('*', function (req, res) {
  res.sendFile(__dirname + '/public/index.html')
})

var allMessage = [];
var userInfo = [];

io.on('connection', (socket) => {
  console.log('A user connected');

// receive the user name and uuid from client
  socket.on('accountAndUuid', (data,callback) => {
    var flag=true
    console.log(`user ${data[0]} connected to the server, with the uuid ${data[1]}`);

    io.emit('notification',data[0])

    var user={
      account: data[0],
      uuid: data[1],
      socketId: socket.id,
    };
    for(var i=0;i<userInfo.length;i++){
      if(userInfo[i].uuid==user.uuid){
        flag=false;
      }
    }
    if(flag) userInfo.push(user)
    console.log('userInfo=>',userInfo)
    io.emit('userList',userInfo)
    callback(userInfo)
  })
//receive the message and store in server
  socket.on('submitMsg',(req,callback)=>{
    allMessage.push(req)
    console.log(allMessage)
    io.emit('allMessage',allMessage)
    callback(allMessage)
  })

  io.emit('allMessage',allMessage)
 
//show all the users a exact user's status
  socket.on('status',(req)=>{
    console.log(req)
    io.emit('status',req)
  })

//tell all the users that a user leave the chat room
  socket.on('disconnect', () => {
    console.log('A user disconnected');
    for(var a=0;a<userInfo.length;a++){
      if(userInfo[a].socketId==socket.id) var tar=a;
    }
    io.emit('userLeave',userInfo[tar])
  });
});

http.listen(3030, () => {
  console.log('listening on port 3030');
});



