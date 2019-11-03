var Room = require('./room').Room;
var listToDB = require('./myDB').listToDB;

var rooms = [];

function initSockets(server) {
    var io = require('socket.io')(server);

    io.on('connection', (socket) => {
        console.log(`Connection: ${socket.id}`);

        // add the socket to the room
        let roomNum = socket.handshake.query.num;
        getRoom(roomNum).addConnection(socket.id);
        socket.join(roomNum);

        console.log(rooms);

        socket.on('disconnect', (reason) => {
            console.log(`Disconnect: ${socket.id}`);
            let r = getRoom(roomNum);
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
            let r = getSocketRoom(socket.id);
            r.updates.push(data);
            console.log(r);
            for (let i = 0; i < r.updates.length; i++) {
                console.log(r.updates[i]);
            }
            io.to(roomNum).emit('create-node', data);
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