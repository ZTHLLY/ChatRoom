const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/socket.html');
});
io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});
http.listen(8080, () => {
    console.log('listening on port 8080');
});