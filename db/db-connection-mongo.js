const mongoose = require("mongoose");

const getConnection = async () => {
  try {
    const url =
    "mongodb+srv://valencialaura:1041150033@proyectoinnovation.1qslw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    await mongoose.connect(url);

    console.log("Conexion exitosa");
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  getConnection,
};
