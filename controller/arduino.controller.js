'use strict'
const mongoose = require('mongoose');
const Record = mongoose.model('Record');
const bodyParser = require('body-parser');
var SerialPort = require("serialport");
var serialPort = null;
const comPort = "COM13";
// const baudRate = 9600;


exports.order = function (req, res) {
  var action = req.body.action;
  var ident = req.body.ident;
  console.log("IDENT " + ident)

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
              new_record.ident = ident
              console.log("Obj Guardado:" + new_record)
              new_record.save();
            } catch (error) {
              console.log("WHOOPS:" + error)
            }
          });
          if (action == "out") {
            serialPort.write(action + "!" + + "Parque:" + ident);
          }
          if (action == "in") {
            serialPort.write(action + "!" + "Parque:" + ident);
          }

        }
      });
    }
    else {
      res.json({ message: 'Ivalid Values' });
    }
  }, 200);
};


exports.populate = function (req, res) {

}