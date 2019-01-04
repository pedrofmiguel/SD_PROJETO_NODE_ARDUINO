/* 
criar schema da base de dados 
*/
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*time stamp: grava a data do registo */
/* value grava entrada */
const Arduino = new Schema({
    value: {type: Number, required: true},
    created_at: {type: Date, default: Date.now},
    parque:{type:String, required:true}
});

module.exports = mongoose.model('Record', Arduino);