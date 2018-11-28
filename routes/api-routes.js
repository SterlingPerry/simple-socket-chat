const db = require('../models');

module.exports = function (app) {
    app.get('/api/messages', (req, res) => {
        db.message.find({}).then(function (dbMessages) {
            res.send(dbMessages);
        });
    });

    app.post('/api/messages', (req, res) => {
       db.message.create(req.body).then(function (dbMessage) {
        res.json(dbMessage);
       });
    });
}