const API = 'https://6a1f56a9b79eec0d6cf0a932.mockapi.io/api/v1/users';
const tbody = document.getElementById('tbody');

function validarRetirada(estoqueAtual, quantidadeRetirada) {
  if (quantidadeRetirada <= 0) return false;
  if (quantidadeRetirada > estoqueAtual) return false;
  return true;
}

async function carregarMateriais() {
   const res = await fetch(API);
  const data = await res.json();
  renderizarTabela(data);
}

function renderizarTabela(data) {
tbody.innerHTML = data.map(i => `
    <tr>
      <td>${i.name}</td>
      <td>${i.quantidade}</td>
      <td>
        <div class="retirada-group">
          <input type="number" id="input-retirada" min="1" placeholder="0"
            data-id="${i.id}" data-estoque="${i.quantidade}" />
          <button class="btn-baixar" data-id="${i.id}">Baixar</button>
        </div>
      </td>
      <td><button class="btn-excluir" data-id="${i.id}">Excluir</button></td>
    </tr>
`).join('');
   document.querySelectorAll('.btn-baixar').forEach(btn => {
    btn.addEventListener('click', () => baixarEstoque(btn.dataset.id));
  });

  document.querySelectorAll('.btn-excluir').forEach(btn => {
    btn.addEventListener('click', () => excluirMaterial(btn.dataset.id));
  });
}

