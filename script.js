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
});

function efetivarCompra(){

const checkboxes = document.querySelectorAll('.item-produto');
const quantidades = document.querySelectorAll('.qtd-produto');
const nomes = document.querySelectorAll('.card-title');

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

localStorage.setItem("carrinho", JSON.stringify(carrinho));

mostrarCarrinho();

}

function mostrarCarrinho(){

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

let tabela = document.getElementById("lista-carrinhos");

if(!tabela) return;

let total = 0;

tabela.innerHTML = "";

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

function removerItem(index){

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

carrinho.splice(index,1);

localStorage.setItem("carrinho", JSON.stringify(carrinho));

mostrarCarrinho();

}

async function carregarDepoimentos(){

const resposta = await fetch("https://jsonplaceholder.typicode.com/comments?_limit=3");

const dados = await resposta.json();

const lista = document.getElementById("lista-depoimentos");

if(!lista) return;

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