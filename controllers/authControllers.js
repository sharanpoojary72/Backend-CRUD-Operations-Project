const userSchema = require('../models/userSchema');
const jwt = require('jsonwebtoken');

const signUpGet = (req, res) => {
    res.render('signUp');
}



const signUpPost = async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);
    try {
        const user = new userSchema({ username, password });
        await user.save();

        // Generate token only after successful user creation
        const token = jwt.sign({ userId: user._id }, 'your_jwt_secret'); // Replace 'your_jwt_secret' with your actual secret

        // Render the token and set up a delayed redirect in the view
        res.render('token', { token: token, error: null }); // Pass null for error
    } catch (error) {
        console.error(error); // Log the error for debugging
        // If there is an error, render the token view with an error message
        if(error.code){
            res.render('token', { token: null, error: "Username Already Exists." }); // Pass the error message

        } else {

            res.render('token', { token: null, error: error.message }); // Pass the error message
        }
    }
};

const loginGet = (req, res) => {
    res.render('login');
}

var userData = {};
const loginPost = async (req, res) => {
    const { username, password } = req.body;

    const user = await userSchema.findOne({ username });

    if (!user) {
        res.render('token', { token: null, error: "Username does not Exists" });
    }
    
    // const isMatch = await user.comparePassword(password);
    // if (!isMatch) {
    //     return res.status(400).send('Invalid credentials');
    // }
    else if (password !== user.password) {
        res.render('token', { token: null, error: "Invalid Credentials" });
    }
    else {
        res.redirect('/');
    }
}

module.exports = { signUpGet, signUpPost, loginGet, loginPost };