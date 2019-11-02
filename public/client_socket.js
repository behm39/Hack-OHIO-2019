var socket = io();

socket.on('announcement', (data) => {
    console.log(data);
});