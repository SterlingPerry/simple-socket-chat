const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    name: String,
    message: String
});

var message = mongoose.model('message', MessageSchema);
module.exports = message;