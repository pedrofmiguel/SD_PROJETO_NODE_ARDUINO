const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
var port = process.env.PORT || 3000
require('./controller/main.js')
Record = require('./model/arduino.model.js'),
/* 
Nota do código :  
O cors serve para dar um middleware para connect/express
*/

/*Ligação à BD*/
mongoose.Promise = global.Promise
mongoose.connect('mongodb://parque.estacionamento:parque1819estacionamento@ds157799.mlab.com:57799/parque_estacionamento')
/* * * * * * * */

/*Body-parser*/ 
app.use(bodyParser.json(), bodyParser.urlencoded({extended:true}));
app.use(cors()); 

/*rotas*/
var  routes = require('./routes/api.routes.js')
routes(app)
app.listen(port)
console.log('Arduino API server started on : ' + port + '!')

