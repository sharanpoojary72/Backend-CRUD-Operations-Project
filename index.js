const express = require('express');
const db = require('./config/db')
const ejs = require('ejs');
const bodyParser = require('body-parser');
const path = require('path');

const port = "3124";

const appRouter = require('./router/auth');

const router = require('./router/routes')

const carSchema = require('./models/carSchema');

const app = express();
app.set('view engine','ejs');

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.use(appRouter);

//EJS-----------------------------

app.use('/', router)


app.listen(port, () => {
    console.log('Server Running');
    console.log(`http://localhost:${port}/login`);
})
