const express = require('express');
const databaseUtils = require('./utils/databaseUtils');
const cors = require('cors');
const routes = require('./routes');
const http = require('http');
const mongoose = require('mongoose');
const app = express();
const server = http.Server(app);
const {setupWebsocket} = require('./websocket');
setupWebsocket(server);
mongoose.connect(databaseUtils.getDatabaseURI(), databaseUtils.getDatabaseOptions());
app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(process.env.LISTEN_PORT);