'use strict'
const mongoose = require('mongoose');
const Record = mongoose.model('Record');
const bodyParser = require('body-parser');
var SerialPort = require("serialport");
var serialPort = null;
const comPort = "COM11";
// const baudRate = 9600;


exports.order = function (req, res) {
  var action = req.body.action;

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

    if (action == "0" || action == "1") {
      serialPort.open(function (error) {
        if (error) {
          console.log('failed to open: ' + error);
        } else {
          console.log('serial port opened');
          res.json({ message: "Operation Sent" });
          serialPort.on('data', function (data) {
            console.log(data.toString());
            try {
              console.log(action)
              var new_record = new Record();
              new_record.value = data.toString();
              new_record.save();
            } catch (error) {
              console.log("WHOOPS")
            }
          });
          serialPort.write(action + "\n");
        }
      });
    }

    else {
      res.json({ message: 'Ivalid Values' });
    }
  }, 200);
};