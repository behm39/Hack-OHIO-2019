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
    console.log(`Connection: ${socket.id}`);
    socket.join('only-room');

    socket.on('disconnect', (reason) => {
        console.log(`Disconnect: ${socket.id}`);
    });

    io.to('only-room').emit('announcement', {
        msg: 'This is an announcement!'
    });

    io.to('only-room').emit('update-map', {
        root: "car",
        nodes: [{
                node: "wheel",
                parent: "car"
            },
            {
                node: "tire",
                parent: "wheel"
            },
            {
                node: "rim",
                parent: "wheel"
            },
            {
                node: "hood",
                parent: "car"
            },
            {
                node: "spoiler",
                parent: "car"
            },
            {
                node: "seat",
                parent: "car"
            },
            {
                node: "fender",
                parent: "car"
            },
        ]
    });
});

let count = 0;
setInterval(() => {
    io.to('only-room').emit('announcement', {
        msg: `Count: ${count}`
    });
    count++;
}, 1000);