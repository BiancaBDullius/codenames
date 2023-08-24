require('dotenv').config();

const { model } = require('mongoose');
const Hint = require('../models/Hint.js');

async function createHint(req, res){
        try {
          const {session} = req.params;
          const {text, team} = req.body;

          if(!session) {
            res.status(500).send({
                message: "Informe a sessão!"
            })
          }
           
          const response = await Hint.create({
            text,
            session,
            team
          })
     
          return res.status(201).send({
            response
          });
         
        } catch (e) {
          console.log(e)
          return res.status(500).send({
            message: "Falha ao processar sua requisição",
            t:'erro'
          });
        }
}

async function getGameHints(req, res){
    try {
      const {session} = req.params;
      const {team} = req.query;

      let model = {
        session
      }

      if(team){
        model.team = team;
      }

      const response = await Hint.find(model)
 
      return res.status(201).send({
        hints: response
      });
     
    } catch (e) {
      console.log(e)
      return res.status(500).send({
        message: "Falha ao processar sua requisição",
        t:'erro'
      });
    }
}


module.exports = {createHint, getGameHints};



