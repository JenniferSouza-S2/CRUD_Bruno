function obterUsuarios() {
  return JSON.parse(localStorage.getItem("usuarios") || "[]");
}

function salvarUsuarios(usuarios) {
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function mostrar(usuarios = obterUsuarios()) {
  const tabela = document.getElementById("tabela");
  tabela.innerHTML = "";

  // Ordena por ID
  usuarios.sort((a, b) => a.id - b.id);

  usuarios.forEach(u => {
    const linha = document.createElement('tr');
    linha.innerHTML = `
      <td>${u.id}</td>
      <td>${u.login}</td>
      <td>${u.senha}</td>
    `;

    // Preenche os campos ao clicar na linha
    linha.addEventListener('click', () => preencherCampos(u));

    tabela.appendChild(linha);
  });
}

function cadastrar() {
  const { id, login, senha } = lerCampos();

  if (!validarCampos(id, login, senha)) return;

  const usuarios = obterUsuarios();
  if (usuarios.some(u => u.id === id)) {
    alert("ID já existe!");
    return;
  }

  usuarios.push({ id, login, senha });
  salvarUsuarios(usuarios);
  mostrar();
  alert("Usuário cadastrado com sucesso!");
  limparCampos();
}

function atualizar() {
  const { id, login, senha } = lerCampos();

  if (!validarCampos(id, login, senha)) return;

  const usuarios = obterUsuarios();
  const index = usuarios.findIndex(u => u.id === id);
  if (index === -1) {
    alert("ID não encontrado!");
    return;
  }

  usuarios[index] = { id, login, senha };
  salvarUsuarios(usuarios);
  mostrar();
  alert("Usuário atualizado com sucesso!");
  limparCampos();
}

function apagar() {
  const id = parseInt(document.getElementById("id").value);
  if (!id) {
    alert("Informe um ID para apagar!");
    return;
  }

  if (!confirm("Tem certeza que deseja apagar este usuário?")) return;

  const usuarios = obterUsuarios();
  const novosUsuarios = usuarios.filter(u => u.id !== id);
  if (novosUsuarios.length === usuarios.length) {
    alert("ID não encontrado!");
    return;
  }

  salvarUsuarios(novosUsuarios);
  mostrar();
  alert("Usuário apagado com sucesso!");
  limparCampos();
}

function buscar() {
  const termo = document.getElementById("buscarInput").value.toLowerCase();
  const usuarios = obterUsuarios();
  const filtrados = usuarios.filter(u => u.login.toLowerCase().includes(termo));
  mostrar(filtrados);
}

function limparCampos() {
  document.getElementById("id").value = "";
  document.getElementById("login").value = "";
  document.getElementById("senha").value = "";
}

function preencherCampos(usuario) {
  document.getElementById("id").value = usuario.id;
  document.getElementById("login").value = usuario.login;
  document.getElementById("senha").value = usuario.senha;
}

function validarCampos(id, login, senha) {
  if (!id || !login || !senha) {
    alert("Preencha todos os campos!");
    return false;
  }
  return true;
}

function lerCampos() {
  return {
    id: parseInt(document.getElementById("id").value),
    login: document.getElementById("login").value.trim(),
    senha: document.getElementById("senha").value.trim()
  };
}
