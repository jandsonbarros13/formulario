function validarEmail(email) {
  const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return regexEmail.test(email);
}

let btn = document.getElementById("click");

btn.addEventListener("click", () => {
  try {
    let nome = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let mensagem = document.getElementById("message").value;
    let resposta = document.getElementById("resp");

    if (!nome || !email || !mensagem) {
      throw new Error("Erro: Preencha todos os campos");
    }

    if (localStorage.getItem("nome") === nome || localStorage.getItem("email") === email) {
      alert("Você já digitou alguém com esse nome ou email");
      return;
    }

    const dados = {
      nome,
      email,
      mensagem
    };

    localStorage.setItem("dados", JSON.stringify(dados));

    let item = document.createElement("li");
    let nomeVal = document.createElement("h5");
    let emailVal = document.createElement("h6");
    let mensagemVal = document.createElement("p");
    let editar = document.createElement("button");
    let remover = document.createElement("button");

    nomeVal.innerText = "Nome: " + dados.nome;
    emailVal.innerText = "Email: " + dados.email;
    mensagemVal.innerText = "Mensagem: " + dados.mensagem;

    editar.innerText = "Editar";
    remover.innerText = "Remover";

    item.appendChild(nomeVal);
    item.appendChild(emailVal);
    item.appendChild(mensagemVal);
    item.appendChild(editar);
    item.appendChild(remover);

    resposta.appendChild(item);

    editar.addEventListener("click", () => {
      const novoNome = prompt("Digite um novo nome", dados.nome);
      const novoEmail = prompt("Digite um novo email", dados.email);
      const novoMensagem = prompt("Digite uma nova mensagem", dados.mensagem);

      dados.nome = novoNome;
      dados.email = novoEmail;
      dados.mensagem = novoMensagem;

      localStorage.setItem("dados", JSON.stringify(dados));

      nomeVal.innerText = "Nome: " + dados.nome;
      emailVal.innerText = "Email: " + dados.email;
      mensagemVal.innerText = "Mensagem: " + dados.mensagem;
    });

    remover.addEventListener("click", () => {
      const confirma = window.confirm("Realmente deseja excluir?");
      if (confirma) {
        resposta.removeChild(item);
        localStorage.clear();
      }
    });

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("message").value = "";
  } catch (e) {
    alert(e.message);
  }
});
