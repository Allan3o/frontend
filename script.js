document.addEventListener('DOMContentLoaded', function () {

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

document.querySelectorAll('.item-produto, .qtd-produto')
.forEach(el => el.addEventListener("change", calcularTotal));

calcularTotal();
mostrarCarrinho();
carregarDepoimentos();  
});

function efetivarCompra(){

const checkboxes = document.querySelectorAll(".item-produto");
const quantidades = document.querySelectorAll(".qtd-produto");
const nomes = document.querySelectorAll(".card-title");

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

checkboxes.forEach((checkbox,index)=>{

if(checkbox.checked){

let produto = {
nome: nomes[index].innerText,
preco: parseFloat(checkbox.value),
qtd: parseInt(quantidades[index].value)
};

carrinho.push(produto);

}

});

localStorage.setItem("carrinhos", JSON.stringify(carrinho));

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
<td>R$ ${produto.preco}</td>
<td>${produto.qtd}</td>
<td>R$ ${subtotal}</td>
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

function removerItem(index){

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

if(itemParaRemover !== null){

carrinho.splice(itemParaRemover,1);

}

localStorage.setItem("carrinho", JSON.stringify(carrinho));

mostrarCarrinho();

}

async function carregarDepoimentos(){

try{

const resposta = await fetch("https://jsonplaceholder.typicode.com/comments?_limit=3");

const dados = await resposta.json();

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
</div>
</div>
</div>
`;

});

}catch(erro){

console.log("Erro ao carregar depoimentos", erro);

}

}