// Importar módulos necessários
const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
// Define o schema do Veiculos
const VeiculosSchema = new mongoose.Schema({
  veiculo: {
    type: String,
    required: true,
  },
  descricaoManu: {
    type: String,
    required: true,
  },
  Valor: {
    type: Number,
    required: true,
  },
  DescricaoManuDetalhada: {
    type: String,
    required: true,
  },
  dataManu: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

// Adiciona o plugin mongoosePaginate em nosso schema
VeiculosSchema.plugin(mongoosePaginate);

// Registra o model Veiculos em nossa aplicação informando seu schema
mongoose.model("Veiculos", VeiculosSchema);
