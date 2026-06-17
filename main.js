const API = 'https://6a1f56a9b79eec0d6cf0a932.mockapi.io/api/v1/users';
const tbody = document.getElementById('tbody');

function validarRetirada(estoqueAtual, quantidadeRetirada) {
  if (quantidadeRetirada <= 0) return false;
  if (quantidadeRetirada > estoqueAtual) return false;
  return true;
}

async function carregarMateriais() {
