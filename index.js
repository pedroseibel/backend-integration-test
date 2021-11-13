const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors"); //Imports CORS
app.use(express.json());

const Conn = require('./models/conn/index');

Conn();

app.use(cors()); //Always before routes
app.options("*", cors()); // All traffic allowed

app.get("/", (req, res) => {
    res.status(200).json({message:"API Rick and Morty"})
})

const personagensRouter = require("./routers/personagens.routes");
app.use("/personagens", personagensRouter);

app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando em: http://localhost:${process.env.PORT}`);
})