const mongoose = require('mongoose');


const carSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name: { type: String },
    type: { type: String },
    range: { type: Number },
    price: { type: Number }
})

module.exports=mongoose.model('cars',carSchema);