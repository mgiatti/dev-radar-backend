const express = require('express');
const utils = require('./utils/utils');
const routes = require('./routes');
const mongoose = require('mongoose');
const app = express();

mongoose.connect(utils.getDatabaseURI(), utils.getDatabaseOptions());
app.use(express.json());
app.use(routes);

app.listen(8080);