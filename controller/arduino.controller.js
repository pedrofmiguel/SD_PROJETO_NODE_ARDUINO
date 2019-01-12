'use strict'
const mongoose = require('mongoose');
const Record = mongoose.model('arduino');
const bodyParser = require('body-parser');
var SerialPort = require("serialport");
var serialPort = null;
const comPort = "COM13";  
global.axios = require('axios')
global.arduinos_fetched = []
// const baudRate = 9600;


exports.order = function (req, res) {
  var action = req.body.action;
  var macAddress = req.body.macAddress
  console.log("Arduino " + macAddress)

  if (serialPort != null) {
    serialPort.close();
  }


  setTimeout(function () {
    serialPort = new SerialPort(comPort, {
      autoOpen: false,
      baudRate: 9600,
      dataBits: 8,
      stopBits: 1
    });

    if (action == "in" || action == "out") {
      serialPort.open(function (error) {
        if (error) {
          console.log('failed to open: ' + error);
        } else {
          if (action == "in") {
            console.log('Serial Port Watching Entries');
          }
          if (action == "out") {
            console.log('Serial Port Watching Exits');
          }
          res.json({ message: "Operation Sent" });
          serialPort.on('data', function (data) {
            try {

              console.log(data)
              //nsole.log(action)
              // console.log("DATA_CHECK:"+)
              var new_record = new Record();
              new_record.action = action
              new_record.macAddress = macAddress
              console.log("Obj Guardado:" + new_record)
              new_record.save();
            } catch (error) {
              console.log("WHOOPS:" + error)
            }
          });
          if (action == "out") {
            serialPort.write(action + "!" + + "Parque:" +macAddress);
          }
          if (action == "in") {
            serialPort.write(action + "!" + "Parque:" + macAddress);
          }

        }
      });
    }
    else {
      res.json({ message: 'Ivalid Values' });
    }
  }, 200);
};


// // Função que retorna todos os utilizadores existentes na plataforma
// function listUsers(req, res) {
//   var input = "";
  
//   // São procurados todos os utilizadores existentes na base de dados
//   User.find({}, function(err, users) {
//       if (err) {
//           console.log(err);
//       }
//       else {
//           // Se não exitir utilizadores é enviado um alerta a dizer que não existem utilizadores
//           if (users == 0) {
//               return res.status(500).send('Não existem utilizadores');
//           }
//           else { // Caso existam, é criada uma tabela com o nome e e-mail de cada utilizador
//               tabela += "<!DOCTYPE html>"

//               tabela += "<table class='table'><tbody>";

//               for (var i = 0; i < users.length; i++) {

//                   tabela += "<tr><td>" + users[i].name + "</td>" + "<td>" + users[i].email + "</td></tr>";
//               }

//               tabela += "</tbody></table>";


//               console.log("TABLE - " + tabela)

//               res.send(users);
              
//           }
//       }
//   })
// }

