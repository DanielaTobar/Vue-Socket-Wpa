const app = require('express')();
const http = require('http').createServer(app);
const bodyParser = require("body-parser");

const io = require('socket.io')(http, {
  cors: {
    origins: ['https://demo.ofertasquito.com/']
  }
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/', (req, res) => {
  io.emit('my broadcast', `server: ${req.body.message}`);
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('my message', (msg) => {
    console.log('message: ' + msg);
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});