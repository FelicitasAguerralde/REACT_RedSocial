const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");

// Crear servidor
const app = express();

// Configurar cors
app.use(cors());

// Convertir body a objetos js
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cargar rutas
app.use("/api", userRoutes);

// Conexión a mongodb
mongoose.connect("mongodb://127.0.0.1:27017/redsocial")
  .then(() => {
    console.log("Conexión a la base de datos establecida");
    
    // Crear servidor y escuchar peticiones http
    const port = 3000;
    app.listen(port, () => {
      console.log(`Servidor corriendo en http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Error al conectar a la base de datos:", error);
  }); 