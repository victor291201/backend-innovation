const { Router } = require('express');
const router = Router();
const Inventario = require('../models/Inventario');
const cors = require('cors');
router.use(cors());

//req = por medio del cual se envian los parametros
//res = por medio del cual se recibe la información

//*************CREAR****************

//async = le dice al servidor que espere hasta que se tenga la respuesta
router.post('/',async function(req, res){

try {
  console.log('inventario recibido', req.body);

  
  const existeInventarioSerial = await Inventario.findOne({serial: req.body.serial});
  if(existeInventarioSerial){
    return res.send('ya existe el serial para otro equipo');
  }
  
    
  let inventario = new Inventario();
  inventario.serial = req.body.serial;
  inventario.modelo = req.body.modelo;
  inventario.descripcion = req.body.descripcion;
  inventario.color = req.body.color;
  inventario.foto = req.body.foto;
  inventario.fechaCompra = req.body.fechaCompra;
  inventario.precio = req.body.precio;
  inventario.usuario = req.body.usuario._id;
  inventario.marca = req.body.marca._id;
  inventario.tipoEquipo = req.body.tipoEquipo._id;
  inventario.estadoEquipo = req.body.estadoEquipo._id;
  inventario.fechaCreacion = new Date();
  inventario.fechaActualizacion = new Date();


  //await = esperar la respuesta
  inventario = await inventario.save();
  // lo que hace este res es enviar al front todos los datos que se generan a traves de guardar usuario
  res.send(inventario);

} catch (error) {
  console.log(error);
  res.send('Ocurrio un error guardando en la base de datos el inventario');
}

  
});

//*********RECUPERA DATOS O LISTAR DATOS ***************************
router.get('/',async function(req, res){
  try {

    //populate: permite simular que se trabaja a una base de datos relacional recibe como
    //parametro un arreglo... en este caso un listado de objetos
    //path: es una propiedad que permite decir a la coleccion cuales son las referencias del esquema
    // a realizar el listado
    const inventario = await Inventario.find().populate([
      {
        //select: permite realizar un filtro de los campos que se requieren (los demas no aparecen)
        path: 'usuario', select: 'nombre email estado' 
      },
      {
        path: 'marca', select: 'nombre estado'
      },
      {
        path: 'tipoEquipo', select: 'nombre estado'
      },
      {
        path: 'estadoEquipo', select: 'nombre estado'
      }
    ]);
    res.send(inventario);
  } catch (error) {
    console.log(error);
    res.send('Ocurrio un error listando inventarios');
  }
});


//********************************ACTUALIZA**************************
router.put('/:inventarioId',async function(req, res){

try {
  
  let inventario = await Inventario.findById(req.params.inventarioId);

  if (!inventario){
    return res.send('Inventario no existe');
  }

  
  const existeInventarioSerial = await Inventario.findOne({serial: req.body.serial, _id: {$ne: inventario._id}});
  if(existeInventarioSerial){
    return res.send('ya existe el serial para otro equipo');
  }
  
    
  inventario.serial = req.body.serial;
  inventario.modelo = req.body.modelo;
  inventario.descripcion = req.body.descripcion;
  inventario.color = req.body.color;
  inventario.foto = req.body.foto;
  inventario.fechaCompra = req.body.fechaCompra;
  inventario.precio = req.body.precio;
  inventario.usuario = req.body.usuario._id;
  inventario.marca = req.body.marca._id;
  inventario.tipoEquipo = req.body.tipoEquipo._id;
  inventario.estadoEquipo = req.body.estadoEquipo._id;
  inventario.fechaActualizacion = new Date();


  //await = esperar la respuesta
  inventario = await inventario.save();
  // lo que hace este res es enviar al front todos los datos que se generan a traves de guardar usuario
  res.send(inventario);

} catch (error) {
  console.log(error);
  res.send('Ocurrio un error actualizando en la base de datos el inventario');
}


  
});



module.exports = router;