const express = require('express');
const router = express.Router();
const PersonagemController = require('./../controller/personagens.controller')

router.get("/", (req,res) => {
    res.status(200).json({message: "Rota ok."})
})

router.get("/readAll", PersonagemController.getAll)

router.get("/readSingle/:id", PersonagemController.getSingle);

router.post("/create", PersonagemController.postCreate);

router.put("/update/:id", PersonagemController.putUpdate);

router.delete("/delete/:id", PersonagemController.delDelete);

module.exports = router;