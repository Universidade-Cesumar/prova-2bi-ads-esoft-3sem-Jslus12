const API = 'https://6a1f56a9b79eec0d6cf0a932.mockapi.io/api/v1/users';
const tbody = document.getElementById('tbody');

async function carregarMateriais() {
  const res = await fetch(API);
  const data = await res.json();
  tbody.innerHTML = data.map(i => `
    <tr><td>${i.name}</td><td>${i.quantidade}</td></tr>
  `).join('');
}


document.getElementById('btn-cadastrar').addEventListener('click', async () => {
  const nome = document.getElementById('input-nome').value.trim();
  const quantidade = document.getElementById('input-quantidade').value.trim();
  if (!nome || !quantidade) return alert('Preencha os campos');

  await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: nome, quantidade: Number(quantidade) })
  });

  document.getElementById('input-nome').value = '';
  document.getElementById('input-quantidade').value = '';
  carregarMateriais();
});

carregarMateriais();
