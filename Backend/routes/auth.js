const express = require('express');
const User = require('../models/User')
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser')
const JWT_SECRET = 'vanshisagood$bo@y';

let success = false;
// Route 1 :Create a user using :POST "/api/auth/createuser. No login required 
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    // body('username', 'Enter a valid username').isLength({ min: 3 }),
    body('email',  'Enter a valid email').isEmail(),
    body('password', 'enter a valid password').isLength({ min: 5 }),
], async (req, res) => {
    //If there are errors this returns bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() })
    }
    //check whether user with same email exists already
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({success, error: "sorry a user with this email already exists " })
        }
        //salting the password with the use of bcrypt.js
        const salt = await bcrypt.genSaltSync(10);//return promises
        const secPass = await bcrypt.hash(req.body.password, salt);

        //creation of user
        user = await User.create({
            name: req.body.name,
            // username: req.body.username,
            email: req.body.email,
            password: secPass
        });

        //sending a authtoken 
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success=true
        res.json({ success,authtoken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occured");
    }

})

// Route 2:authenticate a user using :POST "/api/auth/login. No login required 
router.post('/login', [
    // body('username', 'Enter a valid username').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'password cannot be blank').exists().isLength({ min: 5 }),
], async (req, res) => {
    //If there are errors this returns bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;//destructuring
    try {
        let user = await User.findOne({ email });//to pull email from db
        if (!user) {
            return res.status(400).json({ error: "please enter correct credentials" })
        }
        //password comparison from bcrypt
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false
            return res.status(400).json({ success,error: "please enter correct credentials" })
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success =true;
        res.json({ success,authtoken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occured");
    }

})

//Route 3: GEt user details of user using :POST "/api/auth/getuser. login required 
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password ")
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occured");
    }
})
module.exports = router
