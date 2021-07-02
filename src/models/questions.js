const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionSchema = new Schema({

    pregunta: { type: String, required: true },
    time: { type: String, required: true },
    nombre: { type: String, required: true },
    active: { type: Boolean, default: true}
    
});

module.exports = mongoose.model('Question', questionSchema);