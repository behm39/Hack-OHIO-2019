class Room {
    constructor(number, rootName) {
        this.num = number;
        this.rootName = rootName;
        this.connections = [];
    }

    addConnection(connection) {
        this.connections.push(connection);
    }

    removeConnection(connection) {
        this.connections = this.connections.filter((con) => {
            con != connection;
        });
    }
    
    isEmpty() {
        return this.connections.length == 0;
    }
}

module.exports.Room = Room;