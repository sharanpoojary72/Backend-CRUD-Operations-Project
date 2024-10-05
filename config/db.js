const mongoose = require('mongoose');

// const db = mongoose.connect('mongodb+srv://root:root@cluster0.dhlaqru.mongodb.net/cars?retryWrites=true&w=majority&appName=Cluster0')
const db = mongoose.connect('mongodb+srv://root:root@cluster0.dhlaqru.mongodb.net/cars?retryWrites=true&w=majority&appName=Cluster0',{useNewUrlParser:true, useUnifiedTopology:true})
    .then(() => console.log('Connected!'));

module.exports = db;