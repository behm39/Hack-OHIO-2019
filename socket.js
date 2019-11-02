var Room = require('./room').Room;

var rooms = [];

function initSockets(server) {
    var io = require('socket.io')(server);

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
    let num = generateNumber();
    let r = new Room(num, rootName);
    rooms.push(r);
    return r;
}

function generateNumber() {
    const available = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    let res = null;
    while (true) {
        res = "";
        for (let i = 0; i < 4; i++) {
            res += available.charAt(Math.floor(Math.random() * available.length));
        }
        let exists = rooms.find((r) => {
            r.num == res;
        }) == undefined;
        if (exists) {
            break;
        }
    }
    return res;
}


module.exports.initSockets = initSockets;
module.exports.createRoom = createRoom;