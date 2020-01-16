const { Router } = require('express');
const routes = Router();
const DevController = require('./controllers/DevController');
routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);

module.exports = routes;