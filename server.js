const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/room', (req, res) => {
    let roomNum = req.query.num;
    console.log(roomNum);
    res.sendFile(__dirname + '/public/room.html');
});

app.use(express.static('./public'));

app.listen(8000, () => {
    console.log('App listening on port 8000!');
});

