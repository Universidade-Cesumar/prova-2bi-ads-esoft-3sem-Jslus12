const API = 'https://6a1f56a9b79eec0d6cf0a932.mockapi.io/api/v1/users';
const tbody = document.getElementById('tbody');

async function carregarMateriais() {
  const res = await fetch(API);
  const data = await res.json();
  tbody.innerHTML = data.map(i => `
    <tr><td>${i.name}</td><td>${i.quantidade}</td></tr>
  `).join('');
}
