const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const app = express();

app.use(fileUpload());

app.get('/', (req, res) => {
    res.send("Hello World!");
});

app.get('/upload', (req, res) => {
    res.sendFile('upload.html', {
        root: path.join(__dirname, './')
    })
});

app.post('/upload', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    let upload = req.files.testFile;

    res.send("The file '" + upload.name + "' with data '" + upload.data + "' has been uploaded...");
});

app.listen(8000, () => {
    console.log('App listening on port 8000!');
});