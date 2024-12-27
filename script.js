const listaOrdenavel = document.getElementById("lista-ordenavel");
const botaoChecar = document.getElementById("botao-checar");

const bilionarios = [
  "Elon Musk",
  "Mark Zuckerberg",
  "Jeff Bezos",
  "Bernard Arnault",
  "Larry Ellison",
  "Bill Gates",
  "Larry Page",
  "Steve Ballmer",
  "Warren Buffett",
  "Sergey Brin"
];

// Armazena items da lista
const itemsDaLista = [];

let indiceInicioArraste;

// Insere itens da lista no DOM
function criarLista() {

    [...bilionarios].map((item) => ({valor: item, ordem: Math.random()})).sort((a, b) => a.ordem - b.ordem).map((a) => a.valor).forEach((bilionario, indice) => {
    const item = document.createElement("li");

    item.setAttribute("data-indice", indice);

    item.innerHTML = `
        <span class="numero">${indice + 1}</span>
        <div class="arrastavel" draggable="true">
        <p class="nome-ricos">${bilionario}</p>
        <i class="fas fa-grip-lines"></i>
        </div>
    `;

    itemsDaLista.push(item);

    listaOrdenavel.appendChild(item);
    });

    adicionarDetectoresDeEventos()
}

criarLista();

function iniciarArraste() {
    indiceInicioArraste = +this.closest("li").getAttribute("data-indice");
    console.log(indiceInicioArraste); 
}

function enconstar() {
    this.classList.add("em-cima");
    
}

function desencostar() {
    this.classList.remove("em-cima");
}

function emCima(evento) {
    evento.preventDefault();
}

function soltar() {
    const indiceFimArraste = +this.getAttribute("data-indice");

    trocarItens(indiceInicioArraste, indiceFimArraste);

    this.classList.remove("em-cima");
}

function trocarItens(indiceOrigem, indiceDestino) { 
   const itemUm = itemsDaLista[indiceOrigem].querySelector(".arrastavel");
   const itemDois = itemsDaLista[indiceDestino].querySelector(".arrastavel");

   itemsDaLista[indiceOrigem].appendChild(itemDois);
   itemsDaLista[indiceDestino].appendChild(itemUm);
}

function adicionarDetectoresDeEventos() {
    const arrastaveis = document.querySelectorAll(".arrastavel");
    const itensListaOrdenavel = document.querySelectorAll(".lista-ordenavel li");

    arrastaveis.forEach((arrastavel) => {
        arrastavel.addEventListener("dragstart", iniciarArraste)
    });

    itensListaOrdenavel.forEach((item) => {
        item.addEventListener("dragenter", enconstar);
        item.addEventListener("dragleave", desencostar);
        item.addEventListener("dragover", emCima);
        item.addEventListener("drop", soltar);
    });
}

function checarOrdem() {
    itemsDaLista.forEach((item, indice) => {
     const nomeRicos =  item.querySelector(".arrastavel").innerText.trim();

     if (nomeRicos !== bilionarios[indice]) {
        item.classList.add("incorreto");
     } else {
        item.classList.remove("incorreto");
        item.classList.add("correto");
     }
    });
}

botaoChecar.addEventListener("click", checarOrdem);