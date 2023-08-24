require('dotenv').config();

const ids = require('short-id');


const Word = require('../models/Word.js');
const Game = require('../models/Game.js');
const {randomNumbers, messages, calculateTimer } = require("../utils");

let language = 'ptBr'

async function getGame(req, res){
  try {
    let {session} = req.params;
    let message = messages[language].game.found
    let restPink=0, restBlue=0;
    let game = await Game.findOne({session});

    if(!game) message = messages[language].game.notFound

    game.game_state.map(item => {
      if(item.team === "pink" && !item.turned) restPink++;
      if(item.team === "blue" && !item.turned) restBlue++;
    })

    return res.status(201).send({
      message,
      session,
      game_state: game ? game.game_state.map(item =>  ({word: item.word, turned: item.turned, position: item.position, team: item.team})) : [],
      turn: game ? game.turn : "",
      rest_pink:restPink,
      rest_blue:restBlue,
      timer: calculateTimer(game.timer)
    });
   
  } catch (e) {
    console.log(e)
    return res.status(500).send({
      message: "Falha ao processar sua requisição",
      t:'Erro',
      e
    });
  }
}

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
          let team = "pink";

          if(i >= 9) team = "blue"
          if(i >= 17) team = "white"
          if(i === 24) team = "black"
          
          game_state.push({
            word:  registeredWords[positions[i]].name, 
            position: positions[i], 
            turned: false,
            team
          });
        }
    
        const response = await Game.create({
          session,
          game_state,
          turn: "pink",
          timer: Date.now()
        })
    
        return res.status(201).send({
          session: response.session,
          game_state: response.game_state.map(item =>  ({word: item.word, turned: item.turned, position: item.position, team: item.team})),
          turn: response.turn,
          timer: calculateTimer()
        });
       
      } catch (e) {
        return res.status(500).send({
          message: "Falha ao processar sua requisição",
        });
      }
}

async function putGame(req, res){
  try {
    let {session} = req.params;
    let {turn, game_state} = req.body;
    let message = messages[language].game.altered
    let timer;

    let model = {
      turn
    };

    const game = await Game.findOne({session});
    
    if(!game) message = messages[language].game.notFound

    if(game.turn !== turn) {
      model.timer = Date.now();
      timer = calculateTimer(model.timer);
    } else{
      timer = calculateTimer(game.timer)
    }

    if(game_state && game_state.length !== 0) model.game_state = game_state;
    
    await Game.updateOne({session}, model)

    return res.status(201).send({
      message,
      timer
    });
   
  } catch (e) {
    console.log(e)
    return res.status(500).send({
      message: "Falha ao processar sua requisição",
    });
  }
}

module.exports = {createGame,getGame, putGame};