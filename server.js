const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/estatisticas", (req, res) => {
  res.sendFile(path.join(__dirname, "public/estatisticas.html"));
});

io.on("connection", (socket) => {
  console.log("Usuário conectado");

  socket.on("novaTentativa", (palavra) => {
    console.log("Nova tentativa recebida:", palavra);

    // Emite para TODOS os clientes (index.html, estatisticas.html, etc)
    io.emit("novaTentativa", palavra);

    // Confirma para o cliente que enviou
    socket.emit("tentativaRecebida", "Palavra recebida com sucesso.");
  });

  socket.on("disconnect", () => {
    console.log("Usuário desconectado");
  });
});

const PORT = 3000;
http.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
