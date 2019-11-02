const express = require('express');
const app = express();

var server = app.listen(8000, () => {
    console.log('App listening on port 8000!');
});

app.get('/room', (req, res) => {
    let roomNum = req.query.num;
    console.log(roomNum);
    res.sendFile(__dirname + '/public/room.html');
});

app.use(express.static('./public'));


var io = require('socket.io')(server);

// Add a connect listener
io.on('connection', (socket) => {
    console.log(`Connection: ${socket.id}`);
    console.log(socket);
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
                val: "wheel",
                parent: "car"
            },
            {
                val: "tire",
                parent: "wheel"
            },
            {
                val: "rim",
                parent: "wheel"
            },
            {
                val: "hood",
                parent: "car"
            },
            {
                val: "spoiler",
                parent: "car"
            },
            {
                val: "seat",
                parent: "car"
            },
            {
                val: "fender",
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
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});