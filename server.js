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
    let roomNum = req.query.num;
    if (sockets.roomExists(roomNum)) {
        return res.sendFile(__dirname + '/public/room.html');
    } else {
        return res.redirect("https://google.com/teapot");
    }
});

app.get('/host', (req, res) => {
    let subject = req.query.subject;
    sockets.createRoom(subject).then((room) => {
        console.log(`Creating Room: ${room.num}; Subject: ${subject}`);
        return res.redirect(`/room?num=${room.num}`);
    });
});

app.use(express.static('./public'));

sockets.initSockets(server);