/* 
criar schema da base de dados 
*/
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*time stamp: grava a data do registo */
/* value grava entrada */
const Arduino = new Schema({
    action: {type: String, required: true},
    created_at: {type: Date, default: Date.now},
    ident:{type:String, required:true}
});

module.exports = mongoose.model('Record', Arduino);