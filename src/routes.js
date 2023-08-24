require('dotenv').config();
const routes = require('express').Router();

const {createGame,getGame, putGame} = require('./controllers/GameController');
const {createWords} = require('./controllers/WordController');
const {createHint, getGameHints} = require('./controllers/HintController');


// Game
routes.get('/game/:session', getGame);
routes.post('/game/create-game', createGame);
routes.put('/game/:session', putGame);

// Words
routes.post('/create-words', createWords);

// Hints
routes.get('/hints/:session', getGameHints);
routes.post('/hints/create/:session', createHint);

module.exports = routes




