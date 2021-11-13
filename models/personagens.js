const mongoose = require('mongoose');

const personagensModel = new mongoose.Schema({
    nome: {type: String, required: true},
    imagemUrl: {type: String, required: true},
    dataCriacao: {type: Date, default: Date.now}
})

const Personagem = mongoose.model("Personagens", personagensModel);

module.exports = Personagem;