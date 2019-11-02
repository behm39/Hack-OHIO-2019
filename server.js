const express = require('express');
const app = express();

app.use(express.static('./public'));

var server = app.listen(8000, () => {
    console.log('App listening on port 8000!');
});

app.get('/socket', (req, res) => {
    res.sendFile(__dirname + '/public/socket.html');
});

var io = require('socket.io')(server);

// Add a connect listener
io.on('connection', (socket) => {


    /*
    var myObj = {root: "text",
                    {node: "text", parent: "text"},
                    {node: "text", parent: "text"},
                    {node: "text", parent: "text"};
    {
        root: "rootname",
        nodes: [
            {},
            {},

        ]
    } */

    console.log(`Socket: ${socket.id} connected`);

    socket.join('only-room');

    io.to('only-room').emit('announcement', {
        msg: 'This is an announcement!'
    });

    io.to('only-room').emit('update-map', {
        root: "car",
        nodes: [
            {node: "wheel", parent: "car"},
            {node: "tire", parent: "wheel"},
            {node: "rim", parent: "wheel"},
            {node: "hood", parent: "car"},
            {node: "spoiler", parent: "car"},
            {node: "seat", parent: "car"},
            {node: "fender", parent: "car"},
        ]
    });

});