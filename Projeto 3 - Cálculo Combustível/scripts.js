let kmDiario;
let kmPorLitro;
let precoGasolina;
let gastoGasolinaDiario;
let gastoGasolinaSemanal;
let gastoGasolinaMensal;
let gastoGasolinaAnual;
var arrayObj = [];
let itensPesquisados = 0;

const formulario = dados
formulario.addEventListener("submit", (e) => {
    e.preventDefault()
    document.getElementById("calcular")
})
function gastosTotais() {
    document.getElementById("textoMoto").style.visibility = "visible";
    kmPorLitro = document.getElementById("media").value;
    precoGasolina = document.getElementById("preco").value;
    kmDiario = document.getElementById("quilometros_dia").value;
    usoCarroSemanal = document.getElementById("dias_semana").value;
    gastoGasolinaDiario = gastoDiario(kmPorLitro, precoGasolina, kmDiario);
    gastoGasolinaSemanal = gastoSemanal(gastoGasolinaDiario, usoCarroSemanal);
    gastoGasolinaMensal = gastoMensal(gastoGasolinaSemanal);
    gastoGasolinaAnual = gastoAnual(gastoGasolinaMensal);

    mostrarResultados(gastoGasolinaDiario, gastoGasolinaSemanal, gastoGasolinaMensal, gastoGasolinaAnual);
}

function gastoDiario(kmPorLitro, precoGasolina, kmDiario) {
    gastoGasolinaDiario = (precoGasolina / kmPorLitro) * kmDiario;
    return gastoGasolinaDiario;
}

function gastoSemanal(gastoGasolinaDiario, usoCarroSemanal) {
    gastoGasolinaSemanal = gastoGasolinaDiario * usoCarroSemanal;
    return gastoGasolinaSemanal;
}

function gastoMensal(gastoGasolinaSemanal) {

    gastoGasolinaMensal = gastoGasolinaSemanal * 4;
    return gastoGasolinaMensal;
}

function gastoAnual(gastoGasolinaMensal) {
    gastoGasolinaAnual = gastoGasolinaMensal * 12;
    return gastoGasolinaAnual;
}

function mostrarResultados(gastoGasolinaDiario, gastoGasolinaSemanal, gastoGasolinaMensal, gastoGasolinaAnual) {
    let resultados = document.getElementById("resultado");
    document.getElementById("textoMoto").style.visibility = "visible";
    itensPesquisados++;

    resultados.style.visibility = "visible";
    let zeroRegistros = document.getElementById("zero-registros")
    zeroRegistros.style.visibility = "hidden";

    var linhaResultado = document.querySelector("tbody");
    linhaResultado.innerHTML = `<td>${gastoGasolinaDiario.toFixed(2)}</td><td>${gastoGasolinaSemanal.toFixed(2)}</td><td>${gastoGasolinaMensal.toFixed(2)}</td><td>${gastoGasolinaAnual.toFixed(2)}</td>`;
}

function salvar() {
    kmPorLitro = document.getElementById("media").value;
    precoGasolina = document.getElementById("preco").value;
    var today = new Date();

    let historicoTBody = document.getElementById("historicoTBody");
    var objetos = { id: itensPesquisados, data: `${today.getDate()}/${today.getMonth()}/${today.getFullYear()}`, preco: precoGasolina, kmPorLitro: kmPorLitro, gastoDiario: gastoGasolinaDiario, gastoSemanal: gastoGasolinaSemanal, gastoMensal: gastoGasolinaMensal, gastoAnual: gastoGasolinaAnual }
    arrayObj.push(objetos);

    historicoTBody.innerHTML = "";
    for (itens of arrayObj) {
        historicoTBody.innerHTML += `
        <tr><td>${itens.data}</td><td>${itens.preco}</td><td>${itens.kmPorLitro}</td><td>${itens.gastoDiario.toFixed(2)}</td><td>${itens.gastoSemanal.toFixed(2)}</td><td>${itens.gastoMensal.toFixed(2)}</td><td>${itens.gastoAnual.toFixed(2)}</td><td onclick="excluirItem(${itens.id})" class="excluir-item">🗑</td></tr>
        `
    }
    let resultados = document.getElementById("resultado")
    resultados.style.visibility = "hidden";

    document.getElementById("media").value = "";
    document.getElementById("preco").value = "";
    document.getElementById("quilometros_dia").value = "";
    document.getElementById("dias_semana").value = "";
    document.getElementById("media").focus();
}
function excluirItem(id) {
    for (i = 0; i < arrayObj.length; i++) {
        if (arrayObj[i].id == id) {
            arrayObj.splice(arrayObj.indexOf(arrayObj[i]), 1)
        }
    }
    historicoTBody.innerHTML = ""
    for (itens of arrayObj) {
        historicoTBody.innerHTML += `
        <tr><td>${itens.data}</td><td>${itens.preco}</td><td>${itens.kmPorLitro}</td><td>${itens.gastoDiario.toFixed(2)}</td><td>${itens.gastoSemanal.toFixed(2)}</td><td>${itens.gastoMensal.toFixed(2)}</td><td>${itens.gastoAnual.toFixed(2)}</td><td onclick="excluirItem(${itens.id})" class="excluir-item">🗑</td></tr>
        `
    }
}
function descartar() {
    var linhaResultado = document.querySelector("tbody");
    let resultados = document.getElementById("resultado")
    resultados.style.visibility = "hidden";
    linhaResultado.innerHTML += "";
}
function mostrarHistorico() {
    let historicoTBody = document.getElementById("historicoTBody");
    let modal = document.getElementById("fundo-modal");
    let zeroRegistros = document.getElementById("zero-registros")
    let textoMoto = document.getElementById("textoMoto");
    if (historicoTBody.innerHTML == '') {
        zeroRegistros.style.visibility = "visible";
        textoMoto.style.visibility = "hidden";
    } else {
        zeroRegistros.style.visibility = "hidden";
        historico.style.visibility = "visible";
        modal.style.visibility = "visible";
        textoMoto.style.visibility = "visible";
    }
}
function fecharHistorico() {
    let historico = document.getElementById("historico")
    let modal = document.getElementById("fundo-modal");
    document.getElementById("textoMoto").style.visibility = "visible";
    historico.style.visibility = "hidden";
    modal.style.visibility = "hidden";
    
}
function excluirRegistros() {
    let historicoTBody = document.getElementById("historicoTBody");
    historicoTBody.innerHTML = "";
}