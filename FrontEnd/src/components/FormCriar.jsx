import React, { useState } from "react";
import axios from "axios";
import { ValidarTodosCampos,dataAtual } from "../Funções/FuncoesAuxi";
import { Link } from "react-router-dom";


function FormCriar() {

    const [aviso, setAviso] = useState({
        veiculo: "",
        descricaoManu: "",
        Valor: "",
        DescricaoManuDetalhada: "",
        dataManu: dataAtual(),
        email:"",
    });

    //Limpar os dados do livro
    const handleClear = () => {
        setAviso({
            veiculo: "",
            descricaoManu: "",
            Valor: "",
            DescricaoManuDetalhada: "",
            dataManu: dataAtual(),
            email:"",
        });
    };

    //Status de carregamento da requição API
    const [isLoading, setIsLoading] = useState(true)

    const handleChange = (event) => {
        setAviso({
            ...aviso,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(ValidarTodosCampos(aviso.veiculo, aviso.descricaoManu, aviso.Valor, aviso.DescricaoManuDetalhada, aviso.dataManu, aviso.email)) {
            return
        }
        setIsLoading(false)

        try {
            const response = await axios.post(`http://localhost:3000/api/avisos`, aviso);
            setIsLoading(true)
            alert("Parabéns! Manuteção inserida com sucesso.");
            handleClear()
        } catch (error) {
            setIsLoading(true)
            alert("Erro ao tentar inserir a manutenção.\n" + error);
        }

    }
    return (
        <div >
            <div className="column">
                {isLoading ? (
                <div>
                    <div className="ProximaPagina">
                        <h3>Nova manuteção</h3>
                        <Link to="/"><img src="https://cdn-icons-png.flaticon.com/512/1946/1946488.png" height="30" alt="Descrição da imagem" /></Link> 
                    </div>
                    <form onSubmit={handleSubmit}>
                        <br />
                        <label>
                            <input type="text" name="veiculo" placeholder="Veículo" value={aviso.veiculo} onChange={handleChange}/>
                        </label>
                        <br />
                        <label>
                            <input type="text" name="descricaoManu" placeholder="Descrição breve" value={aviso.descricaoManu} onChange={handleChange} />
                        </label>
                        <br />
                        <label>
                            <input type="number" step="0.01" min="1" name="Valor" placeholder="Valor da manuteção" value={aviso.Valor} onChange={handleChange} />
                        </label>
                        <br />
                        <label>
                            <textarea name="DescricaoManuDetalhada" rows="6" cols="20" placeholder="Descrição completa da manutenção" value={aviso.DescricaoManuDetalhada} onChange={handleChange} />
                        </label>
                        <br />
                        <label>
                            <input type="text" name="email" placeholder="Email de notificação" value={aviso.email} onChange={handleChange} />
                        </label>
                        <br />
                        <label>
                        <input type="date" name="dataManu" value={aviso.dataManu} onChange={handleChange} />
                        </label>
                        <br />
                        <button type="submit">Cadastrar</button>
                        {/* <button type="submit" onClick={()=> setUsarPutOuPost("put")} >Editar</button> */}
                    </form>
                </div>
                ):(
                    <>
                        <p className="Carregando">Carregando...</p>
                    </>
                )}
            </div>    
        </div>
    );
}

export default FormCriar;