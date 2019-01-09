'use strict';
module.exports = function (app) {
  var arduino_controller = require('../controller/arduino.controller');

  //   app.route('/records')
  //     .get(esmad_controller.list_all_records)
  //     .post(esmad_controller.create_record);

  //   app.route('/records/:recordId')
  //     .get(esmad_controller.list_record)
  //     .put(esmad_controller.update_record)
  //     .delete(esmad_controller.delete_record);
  app.route('')
    .get(arduino_controller.populate)


  app.route('/configs/')
    .post(arduino_controller.order);
};

