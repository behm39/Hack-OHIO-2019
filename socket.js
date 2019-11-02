var Room = require('./room').Room;

var rooms = [];

function initSockets(server) {
    var io = require('socket.io')(server);

    io.on('connection', (socket) => {
        console.log(`Connection: ${socket.id}`);

        // add the socket to the room
        let roomNum = socket.handshake.query.num;
        getRoom(roomNum).addConnection(socket.id);
        socket.join('roomNum');

        console.log(rooms);

        socket.on('disconnect', (reason) => {
            console.log(`Disconnect: ${socket.id}`);
            getRoom(roomNum).removeConnection(socket.id);
            console.log(rooms);
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
}

function createRoom(rootName) {
    return new Promise((resolve, reject) => {
        let num = generateNumber();
        let r = new Room(num, rootName);
        rooms.push(r);
        resolve(r);
    });
}

function getRoom(roomNum) {
    for (let i = 0; i < rooms.length; i++) {
        if (rooms[i].num == roomNum) {
            return rooms[i];
        }
    }
    return null;
}

function roomExists(roomNumber) {
    return getRoom(roomNumber) != null;
}

function generateNumber() {
    const available = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    let res = null;
    while (true) {
        res = "";
        for (let i = 0; i < 4; i++) {
            res += available.charAt(Math.floor(Math.random() * available.length));
        }

        if (!roomExists(res)) {
            break;
        }
    }
    return res;
}


module.exports.initSockets = initSockets;
module.exports.createRoom = createRoom;
module.exports.roomExists = roomExists;
module.exports.getRoom = getRoom;