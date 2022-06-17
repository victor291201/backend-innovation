const { Schema, model } = require("mongoose");

const TipoEquipoSchema = Schema({
  nombre: {
    type: String,
    require: true,
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

module.exports = model("TipoEquipo", TipoEquipoSchema);
