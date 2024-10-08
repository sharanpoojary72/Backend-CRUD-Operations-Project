const express = require('express');
const db = require('./config/db')
const ejs = require('ejs');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');


const port = "3124";

const appRouter = require('./router/auth');

const router = require('./router/routes')

const carSchema = require('./models/carSchema');

const app = express();

app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    next();
});

app.use(session({
    secret: 'your_secret_key',  // Replace with a strong secret key
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }  // Set secure to true if using HTTPS
}));



app.set('view engine','ejs');

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));



//EJS-----------------------------
app.use('/',appRouter);

app.use('/', router)



app.listen(port, () => {
    console.log('Server Running');
    console.log(`http://localhost:${port}/login`);
})
