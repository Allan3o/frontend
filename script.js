document.addEventListener("DOMContentLoaded", () => {

if(document.querySelector(".item-produto")){
calcularTotal();

document.querySelectorAll(".item-produto, .qtd-produto")
.forEach(el => el.addEventListener("change", calcularTotal));
}

mostrarCarrinho();
carregarDepoimentos();
iniciarFormulario();

});

function formatarMoeda(valor){
return valor.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
}

function calcularTotal(){

const checkboxes = document.querySelectorAll(".item-produto");
const quantidades = document.querySelectorAll(".qtd-produto");

let total = 0;

checkboxes.forEach((checkbox,index)=>{

if(checkbox.checked){

let preco = parseFloat(checkbox.value);
let qtd = parseInt(quantidades[index].value) || 1;

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
let qtd = parseInt(quantidades[index].value) || 1;

let existente = carrinho.find(p => p.nome === nome);

if(existente){
existente.qtd += qtd;
}else{
carrinho.push({nome,preco,qtd});
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
<button class="btn btn-danger btn-sm" onclick="removerItem(${index})">
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

carrinho.splice(index,1);

localStorage.setItem("carrinho", JSON.stringify(carrinho));

mostrarCarrinho();

}

async function carregarDepoimentos(){

const container = document.getElementById("lista-depoimentos");

if(!container) return;

try{

const resposta = await fetch("https://jsonplaceholder.typicode.com/comments?_limit=3");

const dados = await resposta.json();

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

function iniciarFormulario(){

const form = document.getElementById("form-contato");

if(!form) return;

form.addEventListener("submit", async function(e){

e.preventDefault();

const nome = document.getElementById("nome").value;
const email = document.getElementById("email").value;
const mensagem = document.getElementById("mensagem").value;

const dados = {nome,email,mensagem};

try{

const resposta = await fetch("https://jsonplaceholder.typicode.com/posts",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify(dados)
});

if(resposta.status === 201){

mostrarAlerta("Mensagem enviada com sucesso!", "success");
form.reset();

}else{

mostrarAlerta("Erro ao enviar mensagem", "danger");

}

}catch{

mostrarAlerta("Falha na comunicação com servidor", "danger");

}

});

}

function mostrarAlerta(texto,tipo){

const form = document.getElementById("form-contato");

if(!form) return;

const alerta = document.createElement("div");

alerta.className = `alert alert-${tipo} mt-3`;
alerta.innerText = texto;

form.appendChild(alerta);

setTimeout(()=>{
alerta.remove();
},4000);

}