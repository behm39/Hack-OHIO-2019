var Room = require('./room').Room;
var listToDB = require('./myDB').listToDB;

var rooms = [];

function initSockets(server) {
    var io = require('socket.io')(server);

    io.on('connection', (socket) => {
        console.log(`Connection: ${socket.id}`);

        // add the socket to the room
        let roomNum = socket.handshake.query.num;
        let r = getRoom(roomNum);
        if (!r) {
            return;
        }
        r.addConnection(socket.id);
        socket.join(roomNum);

        socket.emit('send-data', r.structure);

        console.log(rooms);

        socket.on('disconnect', (reason) => {
            console.log(`Disconnect: ${socket.id}`);
            r.removeConnection(socket.id);
            if (r.isEmpty()) {
                listToDB(r.updates);
                for (let i = rooms.length; i >= 0; i--) {
                    if (r == rooms[i]) {
                        rooms.splice(i, 1);
                        break;
                    }
                }
            }
            console.log(rooms);
        });

        socket.on('create-node', (data) => {
            r.addNode(data);
            console.log(r);
            io.to(roomNum).emit('create-node', data);
        });
    });
}

function createRoom(rootName, structure) {
    return new Promise((resolve, reject) => {
        let num = generateNumber();
        let r = new Room(num, rootName, structure);
        rooms.push(r);
        resolve(r);
    });
}

function getSocketRoom(socketId) {
    for (let i = 0; i < rooms.length; i++) {
        if (rooms[i].connections.includes(socketId)) {
            return rooms[i];
        }
    }
    return null;
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