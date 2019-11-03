const express = require('express');
const app = express();
const sockets = require('./socket');
const fileUpload = require('express-fileupload');

let PORT = process.env.PORT || 8000;

app.use(fileUpload());

var server = app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});

app.get('/', (req, res) => {
    return res.sendFile(__dirname + '/public/index.html');
});

app.get('/room', (req, res) => {
    let roomNum = req.query.num;
    if (sockets.roomExists(roomNum)) {
        return res.sendFile(__dirname + '/public/room.html');
    } else {
        return res.sendFile(__dirname + '/public/error.html');
    }
});

app.post('/host-upload', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    console.log(req.files);
    let upload = req.files.myfile;
    let data = JSON.parse(upload.data);
    sockets.createRoom(data.root, data).then((room) => {
        console.log(`Loading Room: ${room.num}; Subject: ${data.root}`);
        return res.redirect(`/room?num=${room.num}`);
    });
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