const { Router } = require('express');
const router = Router();
const EstadoEquipo = require('../models/EstadoEquipo');
const cors = require('cors');
router.use(cors());

//req = por medio del cual se envian los parametros
//res = por medio del cual se recibe la información


//*************CREAR****************

//async = le dice al servidor que espere hasta que se tenga la respuesta
router.post('/',async function(req, res){

try {
  console.log('EstadoEquipo recibida', req.body);
  
  let estadoEquipo = new EstadoEquipo();
  estadoEquipo.nombre = req.body.nombre;
  estadoEquipo.estado = req.body.estado;
  estadoEquipo.fecha_creacion = new Date();
  estadoEquipo.fecha_actualizacion = new Date();

  //await = esperar la respuesta
  estadoEquipo = await estadoEquipo.save();
  // lo que hace este res es enviar al front todos los datos que se generan a traves de guardar usuario
  res.send(estadoEquipo);
} catch (error) {
  console.log(error);
  res.send('Ocurrio un error guardando en la base de datos el estado equipo');
}

  
});

//*********RECUPERA DATOS O LISTAR DATOS ***************************
router.get('/',async function(req, res){
  try {
    const estadoEquipo = await EstadoEquipo.find();
    res.send(estadoEquipo);
  } catch (error) {
    console.log(error);
    res.send('Ocurrio un error listando Estado Equipo');
  }
});


//********************************ACTUALIZA**************************
router.put('/:estadoEquipoId',async function(req, res){

try {

  //req.params = toma el valor de usuario que estan enviando del front
  console.log('Estado Equipo recibida', req.body, req.params);


  let estadoEquipo = await EstadoEquipo.findById(req.params.estadoEquipoId);

  if (!estadoEquipo){
    return res.send('Estado Equipo no existe');
  }
//findOne =permite buscar un dato en especifico en una lista

  estadoEquipo.nombre = req.body.nombre;
  estadoEquipo.estado = req.body.estado;
  estadoEquipo.fechaActualizacion = new Date();

  //await = esperar la respuesta
  estadoEquipo = await estadoEquipo.save();
  // lo que hace este res es enviar al front todos los datos que se generan a traves de guardar usuario
  res.send(estadoEquipo);
} catch (error) {
  console.log(error);
  res.send('Ocurrio un error guardando la base de datos al actualizar Marca');
}

  
});

//********************************Eliminar**************************
router.delete('/:estadoEquipoId',async function(req, res){

  try {
  
    //req.params = toma el valor de usuario que estan enviando del front
    console.log('Estado Equipo  recibido', req.params);
  
  
    let estadoEquipo = await EstadoEquipo.findById(req.params.estadoEquipoId);
  
    if (!estadoEquipo){
      return res.send('Marca no existe');
    }else{
      EstadoEquipo.findByIdAndDelete({ _id: req.params.estadoEquipoId }, req.body, function (err) {
        res.status(200).json("Deleted")
    });
    }
  } catch (error) {
    console.log(error);
    res.send('error eliminando Estado Equipo');
  }
  
    
  });



module.exports = router;