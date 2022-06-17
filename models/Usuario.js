//se importa esquema
const { Schema, model } = require("mongoose");

//model
const UsuarioSchema = Schema({
  documento: {
    type: String,
    required: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
    unique: true,
  },
  estado: {
    type: String,
    required: true,
    enum: ["Activo", "Inactivo"],
  },
  fecha_creacion: {
    type: Date,
    required: true,
  },
  fecha_actualizacion: {
    type: Date,
    required: true,
  },
});

module.exports = model("Usuario", UsuarioSchema);
