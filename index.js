const express = require('express');
const { getConnection } = require('./db/db-connection-mongo');



require('dotenv').config();

const app = express();
const port = process.env.PORT || 3030
console.log({port})

getConnection();

//***parseo json a fin de que al enviar desde el front los datos por json estos sean procesados* */
// esto permite que toda informacion que llegue se trabaje como json
app.use(express.json());

//***** en esta parte esta todos los enrutadores de las rutas que tiene el CRUD */
// el /usuario es la ruta, y el requiere llama el router donde esta la ruta para utilizar el modulo
app.use('/usuario', require('./router/usuario'));
app.use('/estado-equipo', require('./router/estadoEquipo'));
app.use('/marca',require('./router/marca'));
app.use('/tipo-equipo',require('./router/tipoEquipo'));
app.use('/inventario',require('./router/inventario'));



app.listen(port, () => {
  console.log('conexion exitosa en puerto',port);
});


