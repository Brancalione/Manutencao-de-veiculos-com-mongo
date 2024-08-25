//Funções para validar dados de entrada por form de cadastro
export function ValidarTodosCampos(veiculo, descricaoManu, valor, descricaoManuDetalhada, dataManu, email){

    if (!veiculo || typeof veiculo !=="string") {
        alert("Veículo em branco ou inválido.");
        return true;
    }
    if (!descricaoManu || typeof descricaoManu !=="string") {
        alert("Descrição breve em branco ou inválida.");
        return true;
    }
    if (!valor || valor <= 0 || isNaN(valor) ) {
        alert("Valor da manuteção em branco ou inválido.");
        return true;
    }
    if (!descricaoManuDetalhada || typeof descricaoManuDetalhada !=="string") {
        alert("Descrição detalhada em branco ou inválido.");
        return true;
    }
    if (!dataManu || dataManu.includes("undefined") ) {
        alert("Data do cadastro em branco ou inválida.");
        return true;
    }
    if (!email || typeof email !=="string") {
        alert("Email em branco ou inválido.");
    return true;
    }
    return false
}
export function dataAtual(){
        const data = new Date();
        const ano = data.getFullYear();
        let mes = data.getMonth() + 1;
        mes = mes < 10 ? `0${mes}` : mes;
        let dia = data.getDate();
        dia = dia < 10 ? `0${dia}` : dia;
        return `${ano}-${mes}-${dia}`;
}
export function FormatDate(data){
    let dia = data.getDate();
    dia = dia < 10 ? `0${dia}` : dia;
    let mes =  data.getMonth() + 1;
    mes = mes < 10 ? `0${mes}` : mes;
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;

}