require('dotenv').config();

const Word = require('../models/Word.js');

async function createWords(req, res){
        try {
            //palavras a serem adicionadas
            let words = [];
          let newWords=[];
      
          words.map((w, i) =>  newWords.push({id: i, name: w, date_created: Date.now()}))
          
          const response = await Word.create(newWords)
      
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

module.exports = {createWords};