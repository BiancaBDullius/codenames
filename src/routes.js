require('dotenv').config();
const {createGame} = require('./controllers/GameController');
const {createWords} = require('./controllers/WordController');

const routes = require('express').Router();

// Game
routes.post('/create-game', createGame);

// Words
routes.post('/create-words', createWords);

module.exports = routes