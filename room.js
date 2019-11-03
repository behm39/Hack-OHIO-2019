class Room {
    constructor(number, rootName, structure) {
        this.num = number;
        this.rootName = rootName;
        this.structure = structure || {
            root: rootName,
            nodes: []
        };

        this.updates = [{
            type: "createRoot",
            root: rootName
        }];
        this.connections = [];
    }

    addConnection(connection) {
        this.connections.push(connection);
    }

    addNode(data) {
        this.updates.push(data);
        this.structure.nodes.push({
            node: data.created,
            parent: data.parent
        });
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