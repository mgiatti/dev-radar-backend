const express = require('express');
const databaseUtils = require('./utils/databaseUtils');
const cors = require('cors');
const routes = require('./routes');
const mongoose = require('mongoose');
const app = express();

mongoose.connect(databaseUtils.getDatabaseURI(), databaseUtils.getDatabaseOptions());
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(8080);