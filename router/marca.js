const { Router } = require('express');
const router = Router();
const Marca = require('../models/Marca');
const cors = require('cors');
router.use(cors());

//crear nueva marca
//req = por medio del cual se envian los parametros
//res = por medio del cual se recibe la información


//*************CREAR****************

//async = le dice al servidor que espere hasta que se tenga la respuesta
router.post('/',async function(req, res){

try {
  console.log('Marca recibida', req.body);


  
  let marca = new Marca();
  marca.nombre = req.body.nombre;
  marca.estado = req.body.estado;
  marca.fecha_creacion = new Date();
  marca.fecha_actualizacion = new Date();


  //await = esperar la respuesta
  marca = await marca.save();
  // lo que hace este res es enviar al front todos los datos que se generan a traves de guardar usuario
  res.send(marca);
} catch (error) {
  console.log(error);
  res.send('Ocurrio un error guardando en la base de datos la marca');
}

  
});

//*********RECUPERA DATOS O LISTAR DATOS ***************************
router.get('/',async function(req, res){
  try {
    const marcas = await Marca.find();
    res.send(marcas);
  } catch (error) {
    console.log(error);
    res.send('Ocurrio un error listando marcas');
  }
});


//********************************ACTUALIZA**************************
router.put('/:marcaId',async function(req, res){

try {

  //req.params = toma el valor de usuario que estan enviando del front
  console.log('Marca recibida', req.body, req.params);


  let marca = await Marca.findById(req.params.marcaId);

  if (!marca){
    return res.send('Marca no existe');
  }
//findOne =permite buscar un dato en especifico en una lista

  marca.nombre = req.body.nombre;
  marca.estado = req.body.estado;
  marca.fecha_actualizacion = new Date();

  //await = esperar la respuesta
  marca = await marca.save();
  // lo que hace este res es enviar al front todos los datos que se generan a traves de guardar usuario
  res.send(marca);
} catch (error) {
  console.log(error);
  res.send('Ocurrio un error guardando la base de datos al actualizar Marca');
}

  
});

//********************************Eliminar**************************
router.delete('/:marcaId',async function(req, res){

  try {
  
    //req.params = toma el valor de usuario que estan enviando del front
    console.log('Marca recibida', req.params);
  
  
    let marca = await Marca.findById(req.params.marcaId);
  
    if (!marca){
      return res.send('Marca no existe');
    }else{
      Marca.findByIdAndDelete({ _id: req.params.marcaId }, req.body, function (err) {
        res.status(200).json("Deleted")
    });
    }
  } catch (error) {
    console.log(error);
    res.send('error eliminando Marca');
  }
  
    
  });



module.exports = router;