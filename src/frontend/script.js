const apiBase = "http://localhost:3000"; // ajuste se necessário


document.getElementById("show-cadastro").onclick = function() {
  document.getElementById("login-container").classList.add("hidden");
  document.getElementById("cadastro-container").classList.remove("hidden");
  document.getElementById("login-msg").textContent = "";
};

document.getElementById("show-login").onclick = function() {
  document.getElementById("cadastro-container").classList.add("hidden");
  document.getElementById("login-container").classList.remove("hidden");
  document.getElementById("cadastro-msg").textContent = "";
};

// Cadastro
document.getElementById("cadastro-form").onsubmit = async function(e) {
  e.preventDefault();
  const nome = document.getElementById("cadastro-nome").value;
  const telefone = document.getElementById("cadastro-telefone").value;
  const msg = document.getElementById("cadastro-msg");
  msg.textContent = "Cadastrando...";
  try {
    const res = await fetch(apiBase + "/usuario/cadastrar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, telefone })
    });
    const data = await res.json();
    if (res.ok) {
      msg.textContent = "Cadastro realizado! Faça login.";
      setTimeout(() => {
        document.getElementById("show-login").click();
      }, 1500);
    } else {
      msg.textContent = data.message || "Erro ao cadastrar.";
    }
  } catch {
    msg.textContent = "Erro ao conectar ao servidor.";
  }
};

// Login
document.getElementById("login-form").onsubmit = async function(e) {
  e.preventDefault();
  const telefone = document.getElementById("telefone").value;
  const msg = document.getElementById("login-msg");
  msg.textContent = "Entrando...";
  try {
    const res = await fetch(apiBase + "/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ telefone })
    });
    const data = await res.json();
    if (res.ok && data.token) {
      localStorage.setItem("token", data.token);
      msg.textContent = "";
      showClientes();
    } else {
      msg.textContent = data.message || "Telefone inválido!";
    }
  } catch {
    msg.textContent = "Erro ao conectar ao servidor.";
  }
};


// Logout
function logout() {
  localStorage.removeItem("token");
  document.getElementById("clientes-container").classList.add("hidden");
  document.getElementById("login-container").classList.remove("hidden");
  document.getElementById("login-msg").textContent = "";
  document.getElementById("login-form").reset();
}

// Se já estiver logado, mostra clientes direto
if (localStorage.getItem("token")) {
  showClientes();
}

// Listar pizzas
async function showPizzas() {
    const list = document.getElementById("pizzas-list");
    const msg = document.getElementById("pizzas-msg");
    const form = document.getElementById("pizza-form");
    list.innerHTML = "";
    msg.textContent = "Carregando...";
    form.classList.remove("hidden"); // Sempre mostra o formulário
    try {
        const res = await fetch(apiBase + "/pizzas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                 Authorization: "Bearer " + localStorage.getItem("token") },
            body: JSON.stringify({ nome, preco })    
        });
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
            data.forEach(p => {
                const li = document.createElement("li");
                li.textContent = `${p.nome || p.sabor} - R$ ${p.preco?.toFixed(2) ?? "?"}`;
                list.appendChild(li);
            });
            msg.textContent = "";
        } else {
            msg.textContent = "Nenhuma pizza cadastrada. Cadastre uma nova pizza!";
        }
    } catch (e) {
        msg.textContent = "Erro ao buscar pizzas.";
        console.error(e);
    }
}

async function showClientes() {
  document.getElementById("login-container").classList.add("hidden");
  document.getElementById("clientes-container").classList.remove("hidden");
  const list = document.getElementById("clientes-list");
  const msg = document.getElementById("clientes-msg");
  list.innerHTML = "";
  msg.textContent = "Carregando...";
  try {
    const res = await fetch(apiBase + "/usuario", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    });
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      data.forEach(c => {
        const li = document.createElement("li");
        li.textContent = (c.nome ? c.nome + " - " : "") + c.telefone;
        list.appendChild(li);
      });
      msg.textContent = "";
    } else if (data.error) {
      msg.textContent = data.error;
    } else {
      msg.textContent = "Nenhum cliente encontrado.";
    }
  } catch {
    msg.textContent = "Erro ao buscar clientes.";
  }
  // Chame showPizzas ao final
  showPizzas();
}

// Cadastro de pizza
document.getElementById("pizza-form").onsubmit = async function(e) {
    e.preventDefault();
    const nome = document.getElementById("pizza-nome").value;
    const preco = parseFloat(document.getElementById("pizza-preco").value);
    const msg = document.getElementById("pizzas-msg");
    msg.textContent = "Cadastrando pizza...";
    try {
        const res = await fetch(apiBase + "/pizzas", {
            method: "GET",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify({ nome, preco })
        });
        const data = await res.json();
        if (res.ok) {
            msg.textContent = "Pizza cadastrada com sucesso!";
            document.getElementById("pizza-form").reset();
            showPizzas();
        } else {
            msg.textContent = data.message || "Erro ao cadastrar pizza.";
        }
    } catch {
        msg.textContent = "Erro ao conectar ao servidor.";
    }
};

