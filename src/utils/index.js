const wordValues = {
    "25": [9,8,7],
    "16": [6,5,3],
    "9": [3,3,2]
}

const words = [
        "Verde",
        "oceano",
        "cavalo",
        "anel",
        "líder",
        "Celebridade",
        "cruz",
        "carro",
        "mantis",
        "aço",
        "algodão",
        "pêssego",
        "salto",
        "alegria",
        "sopa",
        "peixe",
        "bonde",
        "caixa",
        "planeta",
        "poste",
        "metal",
        "botão",
        "rei",
        "templo",
        "vermelho",
        "Abacaxi", 
        "Macaco", 
        "Bicicleta", "Lua", "Elefante", "Tesouro", "Pipoca", "Girassol", "Guitarra", "Dinossauro", "Bola", "Chocolate", "Computador", "Arco-íris", "Sereia", "Papagaio", "Piano", "Cachoeira", "Avestruz", "Barco", "Feijão", "Sol", "Palhaço", "Espada", "Águia", "Igreja", "Pinguim", "Tigre", "Balão", "Cenoura", "Pente", "Vulcão", "Caranguejo", "Fada", "Asa", "Leão", "Relógio", "Mergulho", "Girafa", "Cacto", "Colher", "Martelo", "Morango", "Gorila", "Gelo", "Algodão", "Coelho", "Maçã", "Telefone", "Açúcar", "Cadeira", "Panda", "Mola", "Ovelha", "Biscoito", "Microfone", "Óculos", "Cachorro", "Aranha", "Anel", "Montanha", "Bomba", "Sapo", "Carro", "Sino", "Cobra", "Espelho", "Diamante", "Sombra", "Pincel", "Rio", "Cama", "Garfo", "Vela", "Rato", "Escada", "Escudo", "Melancia", "Pato", "Vento", "Avião", "Livro", "Flores", "Ferro", "Abelha", "Folha", "Caneca", "Arco", "Fogo", "Donut", "Ponte", "Bússola", "Cinto", "Índio", "Poção", "Nuvem", "Tesoura", "Escova", "Espantalho", "Cesto", "Lápis", "Vassoura", "Xícara", "Neve", "Laranja", "Agulha", "Sino", "Garrafa", "Tromba", "Pássaro", "Foguete", "Tinta", "Dente", "Castelo", "Folha", "Tigela", "Fogão", "Urso", "Bolsa", "Globo", "Leque", "Bala", "Galinha", "Fada", "Manga", "Navalha", "Rã", "Fogo", "Tapete", "Gravata", "Gato", "Sofá", "Vaso", "Mão", "Árvore", "Queijo", "Coelho", "Lâmpada", "Carta", "Canhão", "Marte", "Cobre", "Inglês", "Pijama", "Pá", "Barata", "Lupa", "Beija-flor", "Pão", "Pescador", "Dado", "Piscina", "Freio", "Salto", "Carretel", "Ostra", "Envelope", "Carteira", "Camelo", "Hélice", "Vampiro", "Teia", "Grilo", "Carrinho", "Tapete", "Noite", "Trem", "Injeção", "Prato", "Arame", "Pantera", "Ferida", "Manga", "Caneca", "Quilha", "Arado", "Pomba", "Garoa", "Bolha", "Ovo", "Cavalo", "Limão", "Cobra", "Martelo", "Asa", "Névoa", "Álbum", "Campo", "Dado", "Peão", "Tempestade", "Cacho", "Poeta", "Isca", "Barra", "Banco", "Rua", "Pala", "Alvo", "Cobra", "Feixe", "Brasa", "Tabua", "Briga", "Latir", "Pá", "Zebra", "Noite", "Haste", "Pena", "Cabo", "Parque", "Laje", "Placa", "Miúdo", "Livro", "Esgrima", "Ataque", "Forca", "Sino", "Trigo", "Manga", "Viga", "Farol", "Naval", "Doença", "Fundo", "Terno", "Riso", "Suor", "Cesto", "Música", "Burro", "Refugo", "Poeira", "Gato", "Nota", "Assalto", "Cortina", "Guerra", "Vento", "Falar", "Pilar", "Entregar", "Gravata", "Tinta", "Campo", "Pino", "Pássaro", "Formiga", "Forca", "Chave", "Cinza", "Bico", "Tapa", "Braço", "Navalha", "Faca", "Espada", "Relógio", "Luz", "Capa", "Escada", "Hino", "Rádio", "Cachorro", "Caçador", "Pára-quedas", "Névoa", "Picolé", "Salada", "Balde", "Patins", "Escorrega", "Fivela", "Girino", "Barulho", "Canoa", "Chapéu", "Dedo", "Orelha", "Olho", "Nariz", "Boca", "Voz", "Cabelo", "Vaso", "Marte", "Cobre", "Ostra", "Formiga", "Briga", "Laje", "Pássaro", "Mão", "Naval", "Olho", "Vento", "Piano", "Sapato", "Nuvem", "Dente", "Computador", "Carro", "Trem", "Tinta", "Bola", "Morango", "Folha", "Cama", "Teia", "Banana", "Macaco", "Cachorro", "Piscina", "Grilo", "Abacate", "Nuvem", "Livro", "Balão", "Gravata", "Quadro", "Carro", "Papel", "Girafa", "Chapéu", "Garrafa", "Guitarra", "Peru", "Limão", "Tábua", "Fotografia", "Uva", "Trem", "Leão", "Melão", "Avião", "Castelo", "Limão", "Espada", "Terra", "Rato", "Mesa", "Ar", "Tigre"
];

 const randomNumbers = (n, X) =>{
  if (n > X) {
    console.log("Não é possível gerar n números únicos entre 0 e X-1.");
    return;
  }

  const uniqueNumbers = new Set();
  const result = [];

  while (uniqueNumbers.size < n) {
    const randomNumber = Math.floor(Math.random() * X);
    if (!uniqueNumbers.has(randomNumber)) {
      uniqueNumbers.add(randomNumber);
      result.push(randomNumber);
    }
  }

  return result;
}

const randomTeam = (countTeam0, countTeam1, countTeam2) => {
  const totalNumbers = countTeam0 + countTeam1 + countTeam2 + 1;

  const teamRequirements = [countTeam0, countTeam1, countTeam2, 1];
  const teams = [[], [], [], []];

  while (teams[0].length < countTeam0 || teams[1].length < countTeam1 || teams[2].length < countTeam2 || teams[3].length < 1) {
    const randomNumber = Math.floor(Math.random() * 4);
    teams[randomNumber].push(randomNumber);
  }

  const randomNumbers = teams.flat();
  return randomNumbers;
}


  module.exports = {randomNumbers, words, wordValues, randomTeam};