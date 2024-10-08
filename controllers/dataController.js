const express = require('express')
const mongoose = require('mongoose')

const carSchema = require('../models/carSchema');

// Show all Data 
const showData = async (req, res) => {
    
    try {
        const userName = req.session.user ? req.session.user.username : 'Guest';
        console.log(userName);
        const cars = await carSchema.find();
        res.render('index', { cars:cars,username: userName });
    } catch (err) {
        res.json(err);
    }
};

// const searchData = (req, res) => {
//     carSchema.findById(req.query._id)
//         .then((data) => {
//             if (data) {
//                 res.render('index', { cars: [data] });
//             } else {
//                 res.render('index', { cars: [] }); // Render empty data array
//             }
//         }).catch((err) => {
//             console.log(err);
//             res.status(500).send('Failed to retrieve data');
//         });
// };



const searchData = (req, res) => {
    const searchInput = req.query.search; // Single input field for searching

    if (!searchInput) {
        res.render('index', { cars: [] }); // Render empty data array if no input
        return;
    }

    // Build the query dynamically
    const query = {
        $or: [
            { name: { $regex: searchInput, $options: 'i' } },   // Search by name (case-insensitive)
            { type: { $regex: searchInput, $options: 'i' } }    // Search by type (case-insensitive)
        ]
    };

    // Add search by ID if it's a valid ObjectId
    if (mongoose.Types.ObjectId.isValid(searchInput)) {
        query.$or.push({ _id: searchInput });
    }

    // Attempt to convert searchInput to a number for range and price
    const searchNumber = Number(searchInput);
    if (!isNaN(searchNumber)) {
        query.$or.push(
            { range: searchNumber },   // Search by range (if input is a valid number)
            { price: searchNumber }    // Search by price (if input is a valid number)
        );
    }

    // Perform the search
    carSchema.find(query)
        .then((data) => {
            if (data.length > 0) {
                res.render('index', { cars: data });
            } else {
                res.render('index', { cars: [] }); // Render empty data array if nothing found
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Failed to retrieve data');
        });
};


const deleteData = (req,res)=>{
    carSchema.findByIdAndDelete(req.params.id)
    .then(()=>{
        res.redirect('/dashboard')
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Failed to delete the car');
    });
}

const updateData = (req, res) => {
    console.log("Update id:", req.params.id); 
    console.log("Update Data:", req.body); 
    const { name, type, range, price } = req.body;
    carSchema.findByIdAndUpdate(
        req.params.id,
        { name, type, range, price },
        { new: true }
    )
    .then(() => {
        res.redirect('/dashboard');
    })
    .catch(err => {
        console.log(err);
        res.status(500).send('Failed to update data');
    });
};


const addData = async (req, res) => {
    console.log(req.body);
    const data = new carSchema({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        type: req.body.type,
        range: req.body.range,
        price: req.body.price
    })

    try {
        const dataToSave = await data.save()
        res.status(200).redirect('/dashboard')
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
}

module.exports = {showData,deleteData,updateData,addData,searchData};