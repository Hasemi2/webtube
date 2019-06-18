const express = require('express');
const app = express();

const PORT = 4000;

function handleListening(){
    console.log('Listen on : http://localhost:${PORT}');
}

app.listen(PORT, handleListening);
