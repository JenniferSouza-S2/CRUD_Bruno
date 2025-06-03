function GetUsers() {
  if (!localStorage.getItem("usuarios")) {
    const dadosIniciais = [
      { id: 1, login: "Mario", senha: "123" },
      { id: 2, login: "Luigi", senha: "456" },
      { id: 3, login: "Peach", senha: "789" }
    ];
    localStorage.setItem("usuarios", JSON.stringify(dadosIniciais));
  }
  mostrar();
}