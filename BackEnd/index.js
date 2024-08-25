const express = require("express");
const mongoose = require("mongoose");
const requireDir = require("require-dir");
const cors = require('cors');
const cron = require('node-cron');
const nodemailer = require('nodemailer');

// Cria uma aplicação Express
const app = express();

//const uri = "<connection string>";
const uri = "mongodb://127.0.0.1:27017/";
mongoose.connect(uri, { dbName: "db_Veiculos" });

//Registra o Model em index.js
requireDir("./models");

//Manipula o que vem da requisção e transforma em objeto o json
app.use(express.json());

// Permite pode receber solicitações do front
app.use(cors({origin: 'http://localhost:5173'}));

//Ao utilizar /api nas requisções, vai ser direcionado para o arquivo routes.js
app.use("/api", require("./routes"));
//Executa rotina diária com CRON todos os dias às 17h
cron.schedule('41 19 * * *', async () => {
  try {
    const Veiculos = mongoose.model("Veiculos");
    const dataAtual = new Date(); 
    const seisMesesAtras = new Date(dataAtual.getFullYear(), dataAtual.getMonth() - 6, dataAtual.getDate(), 0, 0, 0, 0);
    seisMesesAtras.setUTCHours( 0, 0, 0, 0)
    const registrosAntigos = await Veiculos.find({ dataManu: { $eq: seisMesesAtras } });
    if (registrosAntigos.length > 0) {
      let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true ,
        auth: {
          user: 'insira_um_email@gmail.com',
          pass: 'Insira sua chave'
        }
      });
      //
      for(let i = 0; i < registrosAntigos.length; i++){
        const veiculo = registrosAntigos[i];
        await transporter.sendMail({
          from: 'App <insira_um_email@gmail.com>',
          to: veiculo.email,
          subject: 'Manutenção do Veículo',
          html: `Olá,<br><br>
          Este é um lembrete de que fazem 6 meses desde a última manutenção do seu veículo.<br>
          Recomendamos agendar uma nova manutenção o quanto antes.<br><br>`
        });
        console.log(`Email enviado para ${veiculo.email}`);
      }
    } else {
      console.log("Não existem registros com mais de 6 meses!");
    }
  } catch (error) {
    console.error("Erro ao verificar registros antigos:", error);
  }
});


// Inicia o servidor na porta '3000'
app.listen(3000, () => {
  console.log("Aplicativo rodando na porta 3000");
});
