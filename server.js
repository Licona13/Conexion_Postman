const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

//cadena de conexión de MongoDB Atlas
mongoose.connect("mongodb+srv://kevinlicona:Licona13b@cluster0.jn54i.mongodb.net/Postman_MongoAtlas", {

  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Conectado a MongoDB Atlas"))
.catch(err => console.error(" Error al conectar", err));

// Modelo de usuario
const Usuario = mongoose.model("Usuario", new mongoose.Schema({
  nombre: String,
  edad: Number
}));

// Ruta principal
app.get("/", (req, res) => {
    res.send("API conectada a Mongo Atlas. se usa /usuarios para obtener datos.");
});

// Obtener usuarios
app.get("/usuarios", async (req, res) => {
  const usuarios = await Usuario.find();
  res.json(usuarios);
});

// Agregar usuario
app.post("/usuarios", async (req, res) => {
  const usuario = new Usuario(req.body);
  await usuario.save();
  res.json(usuario);
});

// Inicio del servidor
app.listen(5000, () => {
  console.log("Servidor corriendo en http://localhost:5000");
});
