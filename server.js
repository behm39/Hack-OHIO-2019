const express = require('express');
const app = express();
const sockets = require('./socket');

var server = app.listen(8000, () => {
    console.log('App listening on port 8000!');
});

app.get('/', (req, res) => {
    return res.sendFile(__dirname + '/public/index.html');
});

app.get('/room', (req, res) => {
    console.log(req.query);
    let roomNum = req.query.num;
    console.log(roomNum);
    return res.sendFile(__dirname + '/public/room.html');
});

app.get('/host', (req, res) => {
    let subject = req.query.subject;
    let room = sockets.createRoom(subject);
    console.log(`Creating Room: ${room.num}; Subject: ${subject}`);
    return res.redirect(`/room?num=${room.num}`);
});

app.use(express.static('./public'));

sockets.initSockets(server);