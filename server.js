const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send("Hello World!");
});

app.get('/socket-demo', (req, res) => {
    res.sendFile(__dirname + 'socket.html');
});

app.listen(8000, () => {
    console.log('App listening on port 8000!');
});