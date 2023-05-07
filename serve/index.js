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



// app.get('*', (req, res) => {

// });

app.get('*', function (req, res) {
  res.sendFile(__dirname + '/public/index.html')
})

var allMessage = [];
var userInfo = [];

io.on('connection', (socket) => {
  console.log('A user connected');
  // io.emit('userinfo',socket);
  // console.log('ip=>',socket.handshake.address.replace(/^.*:/, ''))
  // console.log('allMessage=>',allMessage)
  // socket.emit('allmsg',allMessage)

  // socket.on('clicked', (data) => {
  //   // console.log(data);
  //   allMessage.push(data)
  //   io.emit('ret', data);
  // });
  // socket.on('message', (data) => {
  //   console.log('received message from client:', data);
  //   allMessage.push(data)
  // });

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
    // socket.emit('accountAndUuid', userInfo)
  })

  socket.on('submitMsg',(req,callback)=>{
    allMessage.push(req)
    console.log(allMessage)
    io.emit('allMessage',allMessage)
    callback(allMessage)
  })

  io.emit('allMessage',allMessage)
 

  socket.on('status',(req)=>{
    console.log(req)
    io.emit('status',req)
  })


  socket.on('disconnect', () => {
    console.log('A user disconnected');
    for(var a=0;a<userInfo.length;a++){
      if(userInfo[a].socketId==socket.id) var tar=a;
    }
    io.emit('userLeave',userInfo[tar])
  });
});




// io.on('connection', (socket) => {
//   console.log('A user connected');
//   socket.on('disconnect', () => {
//       console.log('A user disconnected');
//   });
// });


http.listen(3030, () => {
  console.log('listening on port 3030');
});


// app.get('/', function (req, res) {
//   res.send('hello my fucking friend')
// })

// app.get('/signIn', function (req, res) {
//     res.sendFile(__dirname + '/public/index.html')
//   })

// app.get('/test',function(req,res){
//     res.send({a:1,b:2,c:3})
// })

// app.listen(3030, function () {
//   console.log('Example app listening on port 3030!')
// })
