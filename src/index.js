const express = require('express');

const app = express();

app.get('/',(req,resp) => {
    console.log("Hello World");
    return resp.json({message: "Hello World"});
});

app.listen(8080);