const db = require('../models');
var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
module.exports = function (app) {
    app.get('/api/messages', (req, res) => {
        db.message.find({}).then(function (dbMessages) {
            res.send(dbMessages);
        });
    });

    app.post('/api/messages', (req, res) => {
       db.message.create(req.body).then(function (dbMessage) {
        res.json(dbMessage);
        io.emit('message', dbMessage);
       });
    });
  
    app.delete('/api/messages/:id', (req, res, next) =>{
        let id = ObjectID(req.params.id);
        db.message.deleteOne(id, (err,result) => {
            if(err) {
                throw err;
            }

            res.send('message deleted')
        });
    });
}