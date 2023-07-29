require('dotenv').config();
const router = require('express').Router();

const mongoose = require('mongoose');
const ids = require('short-id');

const {randomNumbers, words, wordValues, randomTeam} = require("../utils");





router.post("/create-game", async (req, res, next) =>  {
  try {
    let {word_count} = req.body;
    let  positions,game_state =[], grupo1, grupo2, grupo3, grupo4 = [];

    //create session
    const session = ids.generate();

    positions = randomNumbers(word_count, process.env.WORD_COUNT);


    //get words from database at positions
    let wordsA  = words;

    positions = randomNumbers(25, 25);

    // console.log(positions, word_count, wordValues[word_count][0], wordValues[word_count][1], wordValues[word_count][2])
    // const teams = randomTeam(wordValues[word_count][0], wordValues[word_count][1], wordValues[word_count][2])
    // console.log(teams);
    for(let i=0;i<positions.length;i++){
      const word = wordsA.splice(positions[i], 1)[0];

      game_state.push({
        word, 
        position: positions[i], 
        team: 0, 
        turned: false
      });
    }

    return res.status(200).send({
      session,
      game_state,
      turn: 0,
      timer: Date.now()
    });
   
  } catch (e) {
    return res.status(500).send({
      message: "Falha ao processar sua requisição",
      t:'erro'
    });
  }
});




module.exports = router;