// Importando as dependências
const mongoose = require("mongoose");
const Veiculos = mongoose.model("Veiculos");

// Vamos exportar um objeto com algumas funções 
module.exports = {
  // Vai retornar todos os avisos de nosso banco de dados    AQUi
  async index(req, res) {
    try{
        const avisos = await Veiculos.find();
        return res.json(avisos);
    }catch(error){
      res 
        .status(500)
       .json({error:"Erro ao tentar criar registro!"})
    }
  },
  // Criar um novo aviso              Aqui
  async store(req, res) {
    try{
      const avisos = await Veiculos.create(req.body);
      return res.json(avisos);
    }catch(error){
      res 
        .status(500)
        .json({error:"Erro ao tentar criar registro!"})
    }
    
  },
    // Excluir um aviso
    async delete(req, res) {
      try{
        await Veiculos.findByIdAndDelete(req.params.id);
        return res.send({ msg: "Registro apagado com sucesso!" });
      }
      catch(error){
        res 
          .status(500)
          .json({error:"Erro ao tentar excluir!"})
      }
    },
    //buscar por carro especifico           Aqui
    async filtra(req, res) {
      try {
        const query = {};
        if (req.query.veiculo !== undefined) {
          query.veiculo = req.query.veiculo;
        }
        const avisos = await Veiculos.find(query);
        if (Object.keys(avisos).length > 0){
          return res.json(avisos);
        } 
        return res.json({veiculo:"Veiculo não encontrado!"});
      } catch (error) {
        return res
          .status(500)
          .json({ error: "Erro ao buscar veículos." });
      }
    },
    //Editar aviso
    async update(req, res) {
      try{
        const avisos = await Veiculos.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
        });
        return res.json(avisos);
      }
      catch(error){
        res
          .status(500)
          .json({error:"Erro ao tentar editar o registro!"})
      }
    },
};
