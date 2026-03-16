<<<<<<< HEAD
=======
let itemParaRemover = null;

function formatarMoeda(valor){
return valor.toLocaleString("pt-BR",{style:"currency", currency:"BRL"});
}

>>>>>>> feature-depoimentos
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
<<<<<<< HEAD
carregarDepoimentos();  
=======
carregarDepoimentos();

>>>>>>> feature-depoimentos
});

function efetivarCompra(){

const checkboxes = document.querySelectorAll('.item-produto');
const quantidades = document.querySelectorAll('.qtd-produto');
const nomes = document.querySelectorAll('.card-title');

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

let existente = carrinho.find(p => p.nome === nome);

if(existente){
existente.qtd += qtd;
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

let total = 0;

tabela.innerHTML = "";

let total = 0;

>>>>>>> feature-depoimentos
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
<button class="btn btn-danger btn-sm" onclick="removerItem(${index})">
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

carrinho.splice(index,1);

localStorage.setItem("carrinho", JSON.stringify(carrinho));

mostrarCarrinho();

const modal = bootstrap.Modal.getInstance(
document.getElementById("confirmarRemocao")
);

modal.hide();

>>>>>>> feature-depoimentos
}

async function carregarDepoimentos(){

try{

<<<<<<< HEAD
try{

=======
>>>>>>> feature-depoimentos
const resposta = await fetch("https://jsonplaceholder.typicode.com/comments?_limit=3");

const dados = await resposta.json();

const lista = document.getElementById("lista-depoimentos");

if(!container) return;

container.innerHTML = "";

dados.forEach(item => {

container.innerHTML += `
<div class="col-md-4 mb-4">
<div class="card shadow h-100">
<div class="card-body">

<h5 class="card-title">${depoimento.name}</h5>
<p class="card-text">${depoimento.body}</p>

</div>
</div>
</div>
`;

});

}catch(erro){

console.log("Erro ao carregar depoimentos", erro);

}

<<<<<<< HEAD
}catch(erro){

console.log("Erro ao carregar depoimentos", erro);

}

=======
>>>>>>> feature-depoimentos
}