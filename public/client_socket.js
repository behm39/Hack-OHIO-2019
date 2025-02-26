
/*
    Format to send through socket
  {type: "create", created: "name", parent: "parent-name"}
  {type: "modify", old: "oldname", new: "newname", parent: "parent-name"}
  {type: "createRoot", root: "root-name"} 
*/

const urlParams = new URLSearchParams(window.location.search);
let url = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`
console.log(`URL: ${url}`);
var socket = io(url, {query: `num=${urlParams.get("num")}`});

socket.on('send-data', (data) => {
    console.log('socket data' + JSON.stringify(data));
    cy.json({elements: buildElements(data)});
});

socket.on('create-node', (data) => {
    console.log(data);
    addNode(data.created, data.parent);
})

function emitCreateNode(created, parent) {
    socket.emit('create-node', {
        type: 'create',
        created: created,
        parent: parent
    });
}