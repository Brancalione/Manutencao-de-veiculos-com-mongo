// Importando as dependências do projeto
const express = require("express");
const routes = express.Router();

// Referencia o Controller VeiculosController
const VeiculosController = require("./controllers/VeiculosController");

// associa as rotas ao seu método do Controller
routes.get("/avisos", VeiculosController.index);
routes.get("/avisos/filtra/", VeiculosController.filtra);
routes.post("/avisos", VeiculosController.store);
//Rotas futuras 
routes.delete("/avisos/:id", VeiculosController.delete);
routes.put("/avisos/:id", VeiculosController.update);

module.exports = routes;
