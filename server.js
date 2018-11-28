const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'));

mongoose.connect('mongodb://localhost/chat', { useNewUrlParser: true });
var connect = mongoose.connection;
connect.on('error', console.error.bind(console, 'connection error:'));
connect.once('open', function() {
  // we're connected!
});
require('./sockets/message-socket')(io);
require('./routes/api-routes')(app);
require('./routes/html-routes')(app);

//listen to port
server.listen(PORT, () =>{
  console.log(`Server is listening on ${PORT}`);
});
  
  
  // process.env.PORT || 3000, function(){
  //   console.log('Express server listening on port %d in %s mode', this.address().port, app.settings.env);
  //   });