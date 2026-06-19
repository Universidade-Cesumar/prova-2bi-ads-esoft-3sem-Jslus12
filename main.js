// === FUNÇÃO PURA — sem dependências externas ===
function validarRetirada(estoqueAtual, quantidadeRetirada) {
  if (quantidadeRetirada <= 0) return false;
  if (quantidadeRetirada > estoqueAtual) return false;
  return true;
}

const API = 'https://6a1f56a9b79eec0d6cf0a932.mockapi.io/api/v1/users';

function getTbody() {
  return document.getElementById('tbody');
}

async function carregarMateriais() {
  try {
    const res = await fetch(API);
    const data = await res.json();
    renderizarTabela(data);
  } catch (erro) {
    console.error('Erro ao carregar materiais:', erro);
  }
}

function renderizarTabela(data) {
  const tbody = getTbody();
  if (!tbody) return;

  tbody.innerHTML = data.map(i => `
    <tr>
      <td>${i.produto}</td>
      <td>${i.quantidadeEstoque}</td>
      <td>
        <div class="retirada-group">
          <input type="number" id="input-retirada" min="1" placeholder="0"
            data-id="${i.id}" data-estoque="${i.quantidadeEstoque}" />
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

async function baixarEstoque(id) {
  const input = document.querySelector(`input[data-id="${id}"]`);
  const quantidadeRetirada = Number(input.value);
  const estoqueAtual = Number(input.dataset.estoque);

  if (!validarRetirada(estoqueAtual, quantidadeRetirada)) {
    alert('Quantidade inválida: não pode ser zero, negativa ou maior que o estoque.');
    return;
  }

  const novaQuantidade = estoqueAtual - quantidadeRetirada;

  try {
    const res = await fetch(`${API}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantidadeEstoque: novaQuantidade })
    });
    if (!res.ok) throw new Error(`Status ${res.status}`);
    input.value = '';
    carregarMateriais();
  } catch (erro) {
    console.error('Erro ao atualizar estoque:', erro);
    alert('Erro ao conectar com o servidor.');
  }
}

async function excluirMaterial(id) {
  if (!confirm('Confirmar exclusão?')) return;

  try {
    const res = await fetch(`${API}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(`Status ${res.status}`);
    carregarMateriais();
  } catch (erro) {
    console.error('Erro ao excluir material:', erro);
    alert('Erro ao conectar com o servidor.');
  }
}

function initFormulario() {
  const btnCadastrar = document.getElementById('btn-cadastrar');
  if (!btnCadastrar) return;

  btnCadastrar.addEventListener('click', async () => {
    const nome = document.getElementById('input-nome').value.trim();
    const quantidade = Number(document.getElementById('input-quantidade').value);

    if (!nome || quantidade <= 0) {
      alert('Preencha os campos corretamente.');
      return;
    }

    try {
      const res = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          produto: nome,
          quantidadeEstoque: quantidade,
          dataEntrada: new Date().toISOString().slice(0, 10),
          quantidadeSaida: 0
        })
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      document.getElementById('input-nome').value = '';
      document.getElementById('input-quantidade').value = '';
      carregarMateriais();
    } catch (erro) {
      console.error('Erro ao cadastrar material:', erro);
      alert('Erro ao conectar com o servidor.');
    }
  });
}

if (typeof document !== 'undefined' && document.getElementById('tbody')) {
  initFormulario();
  carregarMateriais();
}const API = 'https://6a1f56a9b79eec0d6cf0a932.mockapi.io/api/v1/users';
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
async function baixarEstoque(id) {
  const input = document.querySelector(`input[data-id="${id}"]`);
  const quantidadeRetirada = Number(input.value);
  const estoqueAtual = Number(input.dataset.estoque);

  if (!validarRetirada(estoqueAtual, quantidadeRetirada)) {
    alert('Quantidade inválida: não pode ser zero, negativa ou maior que o estoque.');
    return;
  }

  const novaQuantidade = estoqueAtual - quantidadeRetirada;

  await fetch(`${API}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quantidade: novaQuantidade })
  });

  input.value = '';
  carregarMateriais();
}

async function excluirMaterial(id) {
  if (!confirm('Confirmar exclusão?')) return;
  await fetch(`${API}/${id}`, { method: 'DELETE' });
  carregarMateriais();
}

document.getElementById('btn-cadastrar').addEventListener('click', async () => {
  const nome = document.getElementById('input-nome').value.trim();
  const quantidade = Number(document.getElementById('input-quantidade').value);

  if (!nome || quantidade <= 0) {
    alert('Preencha os campos corretamente.');
    return;
  }

  await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: nome, quantidade: quantidade })
  });

  document.getElementById('input-nome').value = '';
  document.getElementById('input-quantidade').value = '';
  carregarMateriais();
});

carregarMateriais();
