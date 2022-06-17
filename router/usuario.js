const { Router } = require('express');
const router = Router();
const Usuario = require('../models/Usuario');
const cors = require('cors');
router.use(cors());

//crear nuevo usuario
//req = por medio del cual se envian los parametros
//res = por medio del cual se recibe la información


//CREAR

//async = le dice al servidor que espere hasta que se tenga la respuesta
router.post('/',async function(req, res){

try {
  console.log('================ creando usuario');
  console.log('Objeto recibido', req.body);

//findOne =permite buscar un dato en especifico en una lista

const existeUsuario = await Usuario.findOne({documento: req.body.documento});
if (existeUsuario){
  return res.send(' ya existe un  usuario con este documento:'+req.body.documento);
};
  
  let usuario = new Usuario();
  usuario.documento = req.body.documento;
  usuario.nombre = req.body.nombre;
  usuario.email = "no tengo";
  usuario.estado = req.body.estado;
  usuario.fecha_creacion = new Date();
  usuario.fecha_actualizacion = new Date();
  console.log('================ creando usuario');
  console.log('datos a guardar', usuario);

  //await = esperar la respuesta
  usuario = await usuario.save();
  // lo que hace este res es enviar al front todos los datos que se generan a traves de guardar usuario
  res.send(usuario);
} catch (error) {
  console.log(error);
  res.send('Ocurrio un error guardando la base de datos el usuario');
}

  
});

//*********RECUPERA DATOS O LISTAR DATOS ***************************
router.get('/',async function(req, res){

  try {
    const usuarios = await Usuario.find();
    res.send(usuarios);
  } catch (error) {
    console.log(error);
    res.send('Ocurrio un error listando usuarios');
  }
});


//********************************ACTUALIZA**************************
router.put('/:usuarioId',async function(req, res){

      try {
          console.log("===== Actualizar usuario:");
          //req.params = toma el valor de usuario que estan enviando del front
          console.log('Objeto recibido', req.body, req.params);

          let usuario = await Usuario.findById(req.params.usuarioId);
          console.log("===== usuario consultado:");
          console.log(usuario);

          if (!usuario){
            return res.send('Usuario no existe');
          }

        usuario.documento = req.body.documento;
        usuario.nombre = req.body.nombre;
        usuario.apellido = req.body.apellido;
        usuario.estado = req.body.estado;
        usuario.fecha_actualizacion = new Date();

        console.log("===== usuario actualizado:");
        console.log(usuario);
          
          //await = esperar la respuesta
          usuario = await usuario.save();
          // lo que hace este res es enviar al front todos los datos que se generan a traves de guardar usuario
          res.send(usuario);
      } catch (error) {
        console.log(error);
        res.send('Ocurrio un error guardando la base de datos al actualizar Usuario');
      }

  
});

router.delete('/:usuarioId',async function(req, res){

  try {
      console.log("===== eliminar usuario:");
      //req.params = toma el valor de usuario que estan enviando del front
      console.log('id',req.params.usuarioId);

      let usuario = await Usuario.findById(req.params.usuarioId);
      console.log("===== usuario consultado:");
      console.log(usuario);

      if (!usuario){
        return res.send("===== usuario consultado:");
      }else{
        console.log(usuario);
        Usuario.findByIdAndDelete({ _id: req.params.usuarioId }, req.body, function (err) {
          res.status(200).json("Deleted")
      });
      }
    
  } catch (error) {
    console.log(error);
    res.send('Error eliminando Usuario');
  }


});



module.exports = router;
