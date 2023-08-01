require('dotenv').config();
const {createGame,getGame, putGame} = require('./controllers/GameController');
const {createWords} = require('./controllers/WordController');

const routes = require('express').Router();

// Game
routes.get('/:session', getGame); 
routes.post('/create-game', createGame);
routes.put('/:session', putGame);

// Words
routes.post('/create-words', createWords);

module.exports = routes