
const urlParams = new URLSearchParams(window.location.search);
let url = `${window.location.protocol}://${window.location.hostname}:${window.location.port}`
var socket = io(url, {query: `num=${urlParams.get("num")}`});

socket.on('announcement', (data) => {
    console.log(data);
});