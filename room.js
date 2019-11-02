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
        for (let i = this.connections.length - 1; i >= 0; i--) {
            if (this.connections[i] == connection) {
                this.connections.splice(i, 1);
            }
        }
    }
    
    isEmpty() {
        return this.connections.length == 0;
    }
}

module.exports.Room = Room;