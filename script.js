// --- Variables and constants ---
const genres = ["Terror", "Romance", "Aventura", "Fantasia", "Ficção Científica", "Biografia", "Poesia"];
let selectedGenre = null;

// --- General ---
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("genres-dynamic-container")) {
    setupGenres("genres-dynamic-container");
  }

  if (document.getElementById("nome") && document.getElementById("username")) {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      document.getElementById("nome").value = userData.nome || "";
      document.getElementById("username").value = userData.username || "";
      if (document.getElementById("generoFavorito")) {
        document.getElementById("generoFavorito").value = userData.generoFavorito || "";
      }
    }
  }
});

// --- Login Page ---
function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorMessage = document.getElementById("error-message");

  errorMessage.textContent = "";

  if (!email || !password) {
    errorMessage.textContent = "Por favor, insira email e senha.";
    return;
  }

  const userData = JSON.parse(localStorage.getItem("userData"));
  if (!userData || userData.email !== email || userData.senha !== password) {
    errorMessage.textContent = "Email ou senha incorretos.";
    return;
  }

  // --- NEW BEHAVIOR ---
  if (!userData.generoFavorito) {
    // User didn't complete cadastro2 (gênero favorito not filled)
    alert("Por favor, complete seu cadastro!");
    window.location.href = "cadastro2.html";
  } else {
    // Normal login
    alert("Login efetuado com sucesso!");
    window.location.href = "main.html";
  }
}

function goToCadastro() {
  window.location.href = "cadastro1.html";
}

function togglePasswordVisibility(id, icon) {
  const input = document.getElementById(id);
  if (input.type === "password") {
    input.type = "text";
    icon.textContent = "🙈";
  } else {
    input.type = "password";
    icon.textContent = "👁️";
  }
}

// --- Cadastro1 Page ---
function validateUsername() {
  const username = document.getElementById("username").value.trim();
  const usernameError = document.getElementById("username-error");

  if (username.length > 50) {
    usernameError.textContent = "Username deve ter no máximo 50 caracteres.";
    usernameError.className = "input-error";
  } else {
    usernameError.textContent = "✓ Username válido.";
    usernameError.className = "input-ok";
  }
}

function validatePassword() {
  const senha = document.getElementById("senha").value.trim();
  const senhaError = document.getElementById("senha-error");

  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{1,50}$/;
  if (!passwordRegex.test(senha)) {
    senhaError.textContent = "Senha deve conter letras, números e símbolos.";
    senhaError.className = "input-error";
  } else {
    senhaError.textContent = "✓ Senha válida.";
    senhaError.className = "input-ok";
  }
}

function continuarCadastro() {
  const nome = document.getElementById("nome").value.trim();
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();
  const usernameError = document.getElementById("username-error");
  const senhaError = document.getElementById("senha-error");
  const errorMessage = document.getElementById("error-message");

  validateUsername();
  validatePassword();

  errorMessage.textContent = "";

  if (!nome || !username || !email || !senha) {
    errorMessage.textContent = "Preencha todos os campos.";
    return;
  }

  if (usernameError.className === "input-error" || senhaError.className === "input-error") {
    errorMessage.textContent = "Corrija os erros antes de continuar.";
    return;
  }

  const userData = { nome, username, email, senha };
  localStorage.setItem("userData", JSON.stringify(userData));
  window.location.href = "cadastro2.html";
}

// --- Cadastro2 Page ---
function setupGenres(containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  let index = 0;
  let rows = [3, 2, 1];

  while (index < genres.length) {
    for (let row of rows) {
      const rowDiv = document.createElement("div");
      rowDiv.style.display = "flex";
      rowDiv.style.justifyContent = "center";
      rowDiv.style.gap = "10px";

      for (let i = 0; i < row && index < genres.length; i++, index++) {
        const button = document.createElement("button");
        button.className = "genre-button";
        button.textContent = genres[index];
        button.onclick = () => selectGenre(button);
        rowDiv.appendChild(button);
      }

      container.appendChild(rowDiv);
    }
  }
}

function selectGenre(button) {
  document.querySelectorAll(".genre-button").forEach(btn => btn.classList.remove("selected"));
  button.classList.add("selected");
  selectedGenre = button.innerText;
}

function continuarCadastroGenero() {
  if (!selectedGenre) {
    document.getElementById("genre-error").textContent = "Escolha seu gênero favorito.";
    return;
  }

  const userData = JSON.parse(localStorage.getItem("userData"));
  userData.generoFavorito = selectedGenre;
  localStorage.setItem("userData", JSON.stringify(userData));

  window.location.href = "cadastro3.html";
}

// --- Cadastro3 Page ---
function enableEdit(id) {
  const input = document.getElementById(id);
  input.readOnly = false;
  input.focus();
}

function openBioPopup() {
  document.getElementById("bioPopup").classList.remove("hidden");
  document.getElementById("bioText").value = document.getElementById("bio").value;
}

function liveUpdateBio() {
  const bioText = document.getElementById("bioText").value;
  document.getElementById("bio").value = bioText;
}

function confirmarBio() {
  const bioText = document.getElementById("bioText").value.trim();
  document.getElementById("bio").value = bioText;
  document.getElementById("bioPopup").classList.add("hidden");
}

function openGenrePopup() {
  document.getElementById("genrePopup").classList.remove("hidden");
  setupGenres("genre-buttons-container");
}

function confirmarGenero() {
  if (selectedGenre) {
    document.getElementById("generoFavorito").value = selectedGenre;
  }
  document.getElementById("genrePopup").classList.add("hidden");
}

function finalizarCadastro() {
  const nome = document.getElementById("nome").value.trim();
  const username = document.getElementById("username").value.trim();
  const bio = document.getElementById("bio").value.trim();
  const generoFavorito = document.getElementById("generoFavorito").value.trim();
  const autorFavorito = document.getElementById("autorFavorito").value.trim();

  const userData = JSON.parse(localStorage.getItem("userData"));
  userData.nome = nome;
  userData.username = username;
  userData.bio = bio;
  userData.generoFavorito = generoFavorito;
  userData.autorFavorito = autorFavorito;

  localStorage.setItem("userData", JSON.stringify(userData));

  alert("Cadastro finalizado com sucesso!");
  window.location.href = "main.html";
}

// --- Close popups by clicking outside ---
window.addEventListener("click", function(event) {
  const bioPopup = document.getElementById("bioPopup");
  const genrePopup = document.getElementById("genrePopup");

  if (!bioPopup.classList.contains("hidden") && !bioPopup.contains(event.target) && event.target.id !== "bio") {
    bioPopup.classList.add("hidden");
  }

  if (!genrePopup.classList.contains("hidden") && !genrePopup.contains(event.target) && event.target.id !== "generoFavorito") {
    genrePopup.classList.add("hidden");
  }
});


  


  
