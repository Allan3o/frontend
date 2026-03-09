function formatarMoeda(valor){
return valor.toLocaleString("pt-BR",{
style:"currency",
currency:"BRL"
});
}

let itemParaRemover = null;

document.addEventListener("DOMContentLoaded", function(){

const itens = document.querySelectorAll(".item-produto, .qtd-produto");

itens.forEach(el=>{
el.addEventListener("change", calcularTotal);
});

mostrarCarrinho();
calcularTotal();

const botaoConfirmar = document.getElementById("confirmarRemover");

if(botaoConfirmar){
botaoConfirmar.addEventListener("click", confirmarRemocao);
}

carregarDepoimentos();

});

function calcularTotal(){

const checkboxes = document.querySelectorAll(".item-produto");
const quantidades = document.querySelectorAll(".qtd-produto");

let total = 0;

checkboxes.forEach((checkbox,index)=>{

if(checkbox.checked){

let preco = parseFloat(checkbox.value);
let qtd = parseInt(quantidades[index].value) || 0;

total += preco * qtd;

}

});

const campoTotal = document.getElementById("valor-total");

if(campoTotal){
campoTotal.innerText = formatarMoeda(total);
}

}

function efetivarCompra(){

const checkboxes = document.querySelectorAll(".item-produto");
const quantidades = document.querySelectorAll(".qtd-produto");
const nomes = document.querySelectorAll(".card-title");

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

checkboxes.forEach((checkbox,index)=>{

if(checkbox.checked){

let nome = nomes[index].innerText;
let preco = parseFloat(checkbox.value);
let qtd = parseInt(quantidades[index].value);

let produtoExistente = carrinho.find(p => p.nome === nome);

if(produtoExistente){
produtoExistente.qtd = qtd;
}else{
carrinho.push({
nome:nome,
preco:preco,
qtd:qtd
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

tabela.innerHTML = "";

let total = 0;

carrinho.forEach((produto,index)=>{

let subtotal = produto.preco * produto.qtd;

total += subtotal;

tabela.innerHTML += `
<tr>
<td>${produto.nome}</td>
<td>${formatarMoeda(produto.preco)}</td>
<td>${produto.qtd}</td>
<td>${formatarMoeda(subtotal)}</td>
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
totalCarrinho.innerText = formatarMoeda(total);
}

}

function abrirConfirmacao(index){

itemParaRemover = index;

const modalElemento = document.getElementById("confirmarRemocao");

if(modalElemento){

let modal = new bootstrap.Modal(modalElemento);

modal.show();

}

}

function confirmarRemocao(){

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

if(itemParaRemover !== null){

carrinho.splice(itemParaRemover,1);

}

localStorage.setItem("carrinho", JSON.stringify(carrinho));

mostrarCarrinho();

const modalElemento = document.getElementById("confirmarRemocao");

if(modalElemento){

let modal = bootstrap.Modal.getInstance(modalElemento);

if(modal){
modal.hide();
}

}

}

async function carregarDepoimentos(){

try{

const resposta = await fetch("https://jsonplaceholder.typicode.com/comments?_limit=3");

const dados = await resposta.json();

const container = document.getElementById("lista-depoimentos");

if(!container) return;

container.innerHTML = "";

dados.forEach(item => {

container.innerHTML += `
<div class="col-md-4 mb-4">
<div class="card shadow h-100">
<div class="card-body">
<h5 class="card-title">${item.name}</h5>
<h6 class="text-muted">${item.email}</h6>
<p class="card-text">${item.body}</p>
</div>
</div>
</div>
`;

});

}catch(erro){

console.log("Erro ao carregar depoimentos", erro);

}

}