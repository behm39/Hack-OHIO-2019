const express = require('express');
const app = express();

app.use(express.static('./public'));

var server = app.listen(8000, () => {
    console.log('App listening on port 8000!');
});

app.get('/socket', (req, res) => {
    res.sendFile(__dirname + '/public/socket.html');
});

var io = require('socket.io')(server);

// Add a connect listener
io.on('connection', (socket) => {
    console.log('Client connected.');
    
    socket.emit('news', {
        msg: 'hello world!'
    });

    socket.on('my other event', (data) => {
        console.log(data);
    });

});