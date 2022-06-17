const { Schema, model } = require("mongoose");

const MarcaSchema = Schema({
  nombre: {
    type: String,
    required: true,
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

module.exports = model("Marca", MarcaSchema);
