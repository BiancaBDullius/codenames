require('dotenv').config();

const ids = require('short-id');

const Word = require('../models/Word.js');
const Game = require('../models/Game.js');
const {randomNumbers } = require("../utils");

async function createGame(req, res){
    try {
        let {word_count} = req.body;
        let positions, game_state = [];
    
        const session = ids.generate();
    
        positions = randomNumbers(word_count, process.env.WORD_COUNT);
    
        if(positions.length !== word_count){
          throw `Erro ao gerar as ${word_count} palavras!`
        }
    
        let registeredWords = await Word.find({id: positions});
    
        positions = randomNumbers(word_count, word_count);
    
        for(let i=0;i<registeredWords.length;i++){
          game_state.push({
            word:  registeredWords[positions[i]].name, 
            position: positions[i], 
            turned: false,
            team: 0
          });
        }
    
        const response = await Game.create({
          session,
          game_state,
          turn: 0,
          timer: Date.now()
        })
    
        return res.status(201).send({
          session: response.session,
          game_state: response.game_state.map(item =>  ({word: item.word, turned: item.turned, position: item.position, team: item.team})),
          turn: response.turn,
          timer: response.timer
        });
       
      } catch (e) {
        return res.status(500).send({
          message: "Falha ao processar sua requisição",
          t:'erro',
          e
        });
      }
}

// async function getGame(req, res){

// }

module.exports = {createGame};