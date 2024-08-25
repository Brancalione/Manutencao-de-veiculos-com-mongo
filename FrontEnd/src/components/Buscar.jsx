import React, { useState, useEffect } from "react";
import axios from "axios";
import { FormatDate } from "../Funções/FuncoesAuxi";
import { Link } from "react-router-dom";


const Buscar = () => {
    const [avisos, setAvisos] = useState([]);
    const [filtro, setFiltro] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/avisos");
                setAvisos(response.data);
                setIsLoading(false);
            } catch (error) {
                alert("Erro ao tentar listar os veículos.\n" + error);
                setAvisos([]);
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(filtro){
            try {
                const response = await axios.get(`http://localhost:3000/api/avisos/filtra?veiculo=${filtro}`);
                setAvisos(response.data);
                setIsLoading(false);
                if(response.data.veiculo == "Veiculo não encontrado!" ){
                    alert(response.data.veiculo) 
                    window.location.reload();
                }
            } catch (error) {
                alert("Erro ao tentar listar os veículos.\n" + error);
                setAvisos([]);
                setIsLoading(false);
            }
        }else{
            alert("Filtro vazio")
        }
    };

    return (
        <div>
            <div className="column">
                {isLoading ? (
                    <p className="Carregando">Carregando...</p>
                ) : (
                    <>
                        <div className="ProximaPagina">
                            <h3>Todos os registros</h3>
                            <Link to="/formcriar"> <img src="https://cdn-icons-png.flaticon.com/512/7538/7538677.png" height="30" alt="Descrição da imagem" /></Link> 
                           
                        </div>
                        <h2>Buscar por nome de veículo:</h2>
                            <div className="filtro">
                            <form onSubmit={handleSubmit}>
                                <label>
                                    <input type="text" name="veiculo"  placeholder="Veículo"  value={filtro} onChange={(event) => setFiltro(event.target.value)}/>
                                </label>
                                <button type="submit">Buscar</button>
                            </form>
                            <button onClick={()=> location.reload()} >Limpar filtro  </button>
                        </div>
                        <div className="ListaTamanho">
                            {avisos.map((aviso) => (
                                <div className="divs" >
                                    <p>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; MANUTEÇÃO
                                    </p>
                                    <p>
                                        Veículo: {aviso.veiculo}
                                    </p>
                                    <p>
                                        Valor: {aviso.Valor}
                                    </p>
                                    <p>
                                        Descrição: {aviso.descricaoManu}
                                    </p>
                                    <p>
                                      Data: {FormatDate(new Date(aviso.dataManu))}
                                    </p>
                                </div>
                            ))}
                        </div>
                        
                    </>
                )}
            </div>
        </div>
    );
};

export default Buscar;
