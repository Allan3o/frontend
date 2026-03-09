let itemParaRemover = null;

document.addEventListener('DOMContentLoaded', function () {

function calcularTotal(){

const checkboxes = document.querySelectorAll('.item-produto');
const quantidades = document.querySelectorAll('.qtd-produto');

let total = 0;

checkboxes.forEach((checkbox,index)=>{

if(checkbox.checked){

const preco = parseFloat(checkbox.value);
const qtd = parseInt(quantidades[index].value) || 0;

total += preco * qtd;

}

});

const campoTotal = document.getElementById("valor-total");

if(campoTotal){
campoTotal.textContent =
total.toLocaleString('pt-BR',{minimumFractionDigits:2});
}

}

document.querySelectorAll('.item-produto, .qtd-produto')
.forEach(el => el.addEventListener("change", calcularTotal));

calcularTotal();
mostrarCarrinho();
carregarDepoimentos();

const btnConfirmar = document.getElementById("confirmarRemover");

if(btnConfirmar){
btnConfirmar.addEventListener("click", confirmarRemocao);
}

});

function efetivarCompra(){

const checkboxes = document.querySelectorAll('.item-produto');
const quantidades = document.querySelectorAll('.qtd-produto');
const nomes = document.querySelectorAll('.card-title');

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

checkboxes.forEach((checkbox,index)=>{

if(checkbox.checked){

let nome = nomes[index].innerText;
let preco = parseFloat(checkbox.value);
let qtd = parseInt(quantidades[index].value);

let produtoExistente = carrinho.find(p => p.nome === nome);

if(produtoExistente){

produtoExistente.qtd += qtd;

}else{

carrinho.push({
nome: nome,
preco: preco,
qtd: qtd
});

}

}

});

localStorage.setItem("carrinho", JSON.stringify(carrinho));

mostrarCarrinho();

}

function mostrarCarrinho(){

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

let tabela = document.getElementById("lista-carrinho");

if(!tabela) return;

let total = 0;

tabela.innerHTML = "";

carrinho.forEach((produto,index)=>{

let subtotal = produto.preco * produto.qtd;

total += subtotal;

tabela.innerHTML += `
<tr>
<td>${produto.nome}</td>
<td>R$ ${produto.preco.toLocaleString('pt-BR',{minimumFractionDigits:2})}</td>
<td>${produto.qtd}</td>
<td>R$ ${subtotal.toLocaleString('pt-BR',{minimumFractionDigits:2})}</td>
<td>
<button class="btn btn-danger btn-sm" onclick="abrirConfirmacao(${index})">
Remover
</button>
</td>
</tr>
`;

});

const totalCarrinho = document.getElementById("total-carrinho");

if(totalCarrinho){
totalCarrinho.innerText =
total.toLocaleString('pt-BR',{minimumFractionDigits:2});
}

}

function abrirConfirmacao(index){

itemParaRemover = index;

const modal = new bootstrap.Modal(
document.getElementById("confirmarRemocao")
);

modal.show();

}

function confirmarRemocao(){

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

if(itemParaRemover !== null){

carrinho.splice(itemParaRemover,1);

}

localStorage.setItem("carrinho", JSON.stringify(carrinho));

mostrarCarrinho();

const modal = bootstrap.Modal.getInstance(
document.getElementById("confirmarRemocao")
);

modal.hide();

}

async function carregarDepoimentos(){

const resposta = await fetch("https://jsonplaceholder.typicode.com/comments?_limit=3");

const dados = await resposta.json();

const lista = document.getElementById("lista-depoimentos");

if(!lista) return;

lista.innerHTML = "";

dados.forEach(depoimento => {

lista.innerHTML += `
<div class="col-md-4">
<div class="card mb-3">
<div class="card-body">

<h5 class="card-title">${depoimento.name}</h5>
<p class="card-text">${depoimento.body}</p>

</div>
</div>
</div>
`;

});

}