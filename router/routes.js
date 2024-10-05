const express = require('express');
const db = require('../config/db')
const ejs = require('ejs');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')



const data = require('../controllers/dataController');


const router = express();
router.use(bodyParser.json());



router.get('/', data.showData)

router.get('/:id', data.searchData)
// router.get('/search', data.searchData)

router.post('/delete/:id', data.deleteData)

router.post('/update/:id', data.updateData)

router.post('/post', data.addData)



module.exports = router;