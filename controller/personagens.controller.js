const Personagem = require("./../models/personagens");

function validarEntrada(dados) {
    const listaErros = [];

    var nome = {
        vazio: false,
        tamanho: true
    }
    var imagem = {
        vazio: false,
    }

    if(!dados.nome) {
        nome.vazio = true;
    } else if (dados.nome.length > 50) {
        nome.tamanho = true;
    } else {
        nome.tamanho = false;
    }

    if (!dados.imagemUrl) {
        imagem.vazio = true;
    }

    // if (isAlphaNumeric(dados.nome)){
    //     nome.num = true;
    // }

    listaErros.push(nome);
    listaErros.push(imagem);

    console.log(listaErros);
    return listaErros;
}

function validaID(res, id){
    if(id.length != 24){
        res.status(400).json({message: "O ID precisa ter 24 caracteres."})
        return true;
    }
}

exports.getAll = async (req, res) => {
    await Personagem.find({}).then((personagens) => {
        res.status(200).json(personagens);
    }).catch((err) => {
        res.status(404).json({message: "Nenhum personagem foi encontrado!"});
        console.error(err);
    })
}

exports.getSingle = async (req, res) => {
    if (validaID(res, req.params.id)) return;
    await Personagem.findById(req.params.id).then((personagem) => {
        res.status(200).json(personagem);
    }).catch((err) => {
        res.status(404).json({message: "Nenhum personagem foi encontrado!"});
        console.error(err);
    });
}

exports.postCreate = async (req, res) => {
    const lista = validarEntrada(req.body);
    lista.map((item) => {
        res.status(400).json({message: "Algo deu errado!"})
    });
   
    await Personagem.create(req.body).then( () => {
        res.status(201).json({message: "Personagem inserido com sucesso!"})
    }).catch((err) => {
        res.status(400).json({message: "Algo deu errado!"});
        console.error(err);
    });
}

exports.putUpdate = async (req, res) => {
    if (validaID(res, req.params.id)) return;
    if (validarEntrada(req.body)) return;
    await Personagem.findByIdAndUpdate(req.params.id, req.body).then(() => {
        res.status(200).json({message: "Personagem atualizado com sucesso!"})
    }).catch((err) => {
        res.status(400).json({message: "Algo deu errado!"});
        console.error(err);
    });
}

exports.delDelete = async (req, res) => {
    if (validaID(res, req.params.id)) return;
    await Personagem.findByIdAndDelete(req.params.id).then(() => {
        res.status(200).json({message: "Seu personagem foi excluído com sucesso!"})
    }).catch((err) => {
        res.status(404).json({message: "Nenhum personagem foi encontrado!"});
        console.error(err);
    });
}