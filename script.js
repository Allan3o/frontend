<<<<<<< HEAD
=======
let itemParaRemover = null;

>>>>>>> feature-depoimentos
document.addEventListener('DOMContentLoaded', function () {

function calcularTotal(){

<<<<<<< HEAD
const checkboxes = document.querySelectorAll(".item-produto");
const quantidades = document.querySelectorAll(".qtd-produto");
=======
const checkboxes = document.querySelectorAll('.item-produto');
const quantidades = document.querySelectorAll('.qtd-produto');
>>>>>>> feature-depoimentos

let total = 0;

checkboxes.forEach((checkbox,index)=>{

if(checkbox.checked){

<<<<<<< HEAD
let preco = parseFloat(checkbox.value);
let qtd = parseInt(quantidades[index].value) || 0;
=======
const preco = parseFloat(checkbox.value);
const qtd = parseInt(quantidades[index].value) || 0;
>>>>>>> feature-depoimentos

total += preco * qtd;

}

});

const campoTotal = document.getElementById("valor-total");

if(campoTotal){
<<<<<<< HEAD
campoTotal.innerText = formatarMoeda(total);
=======
campoTotal.textContent =
total.toLocaleString('pt-BR',{minimumFractionDigits:2});
>>>>>>> feature-depoimentos
}

}

document.querySelectorAll('.item-produto, .qtd-produto')
.forEach(el => el.addEventListener("change", calcularTotal));

calcularTotal();
mostrarCarrinho();
<<<<<<< HEAD
carregarDepoimentos();  
=======
carregarDepoimentos();

const btnConfirmar = document.getElementById("confirmarRemover");

if(btnConfirmar){
btnConfirmar.addEventListener("click", confirmarRemocao);
}

>>>>>>> feature-depoimentos
});

function efetivarCompra(){

<<<<<<< HEAD
const checkboxes = document.querySelectorAll(".item-produto");
const quantidades = document.querySelectorAll(".qtd-produto");
const nomes = document.querySelectorAll(".card-title");
=======
const checkboxes = document.querySelectorAll('.item-produto');
const quantidades = document.querySelectorAll('.qtd-produto');
const nomes = document.querySelectorAll('.card-title');
>>>>>>> feature-depoimentos

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

checkboxes.forEach((checkbox,index)=>{

if(checkbox.checked){

<<<<<<< HEAD
let produto = {
nome: nomes[index].innerText,
preco: parseFloat(checkbox.value),
qtd: parseInt(quantidades[index].value)
};

carrinho.push(produto);
=======
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
>>>>>>> feature-depoimentos

}

});

localStorage.setItem("carrinho", JSON.stringify(carrinho));

mostrarCarrinho();

}

function mostrarCarrinho(){

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

let tabela = document.getElementById("lista-carrinho");

if(!tabela) return;

<<<<<<< HEAD
tabela.innerHTML = "";

let total = 0;

=======
let total = 0;

tabela.innerHTML = "";

>>>>>>> feature-depoimentos
carrinho.forEach((produto,index)=>{

let subtotal = produto.preco * produto.qtd;

total += subtotal;

tabela.innerHTML += `
<tr>
<td>${produto.nome}</td>
<<<<<<< HEAD
<td>R$ ${produto.preco}</td>
<td>${produto.qtd}</td>
<td>R$ ${subtotal}</td>
=======
<td>R$ ${produto.preco.toLocaleString('pt-BR',{minimumFractionDigits:2})}</td>
<td>${produto.qtd}</td>
<td>R$ ${subtotal.toLocaleString('pt-BR',{minimumFractionDigits:2})}</td>
>>>>>>> feature-depoimentos
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
<<<<<<< HEAD
totalCarrinho.innerText = formatarMoeda(total);
=======
totalCarrinho.innerText =
total.toLocaleString('pt-BR',{minimumFractionDigits:2});
>>>>>>> feature-depoimentos
}

}

<<<<<<< HEAD
function removerItem(index){
=======
function abrirConfirmacao(index){

itemParaRemover = index;

const modal = new bootstrap.Modal(
document.getElementById("confirmarRemocao")
);

modal.show();

}

function confirmarRemocao(){
>>>>>>> feature-depoimentos

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

if(itemParaRemover !== null){

carrinho.splice(itemParaRemover,1);

}

localStorage.setItem("carrinho", JSON.stringify(carrinho));

mostrarCarrinho();

<<<<<<< HEAD
=======
const modal = bootstrap.Modal.getInstance(
document.getElementById("confirmarRemocao")
);

modal.hide();

>>>>>>> feature-depoimentos
}

async function carregarDepoimentos(){

<<<<<<< HEAD
try{

=======
>>>>>>> feature-depoimentos
const resposta = await fetch("https://jsonplaceholder.typicode.com/comments?_limit=3");

const dados = await resposta.json();

<<<<<<< HEAD
const container = document.getElementById("lista-depoimentos");

if(!lista) return;

dados.forEach(item => {

container.innerHTML += `
<div class="col-md-4 mb-4">
<div class="card shadow h-100">
<div class="card-body">
<h5 class="card-title">${item.name}</h5>
<h6 class="text-muted">${item.email}</h6>
<p class="card-text">${item.body}</p>
=======
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

>>>>>>> feature-depoimentos
</div>
</div>
</div>
`;

});

<<<<<<< HEAD
}catch(erro){

console.log("Erro ao carregar depoimentos", erro);

}

=======
>>>>>>> feature-depoimentos
}