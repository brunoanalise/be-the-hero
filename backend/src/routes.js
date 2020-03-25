const express = require ('express');


const OngController = require ('./controllers/OngController');

const IncidentController = require ('./controllers/IncidentController');

const ProfileController = require ('./controllers/ProfileController');

const SessionController = require ('./controllers/SessionController');

const routes = express.Router(); // desaclopando o modulo de rotas do express numa variavel routes


routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.index); // rota de listagem.
routes.post ('/ongs', OngController.create) ; // A logica daqui foi abstraida pelo controlller OngController

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete); // usando o router params id

routes.get('/profile', ProfileController.index);


module.exports = routes;// faz com que as rotas fiquem disponiveis no index