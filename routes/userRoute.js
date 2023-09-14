const express = require("express");
const mongoose = require("mongoose");
const User = require('../models/userModel');
const EmployeeModel = require("../models/employeeModel");
const router = express.Router();
const nodemailer = require('nodemailer');

//Create

router.post("/", async (req, res) => {

    console.log(req.body);
    const { name, email, desc } = req.body;

    const User = require("../models/userModel");

    try {
        const userAdded = await User.create({
            name: name,
            email: email,
            desc: desc,
        });

        res.status(201).json(userAdded)

    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message })
    }
});

//get

router.get("/", async (req, res) => {
    try {
        const showAll = await User.find();
        res.status(200).json(showAll);
    } catch (error) {
        console.log(error);
        res.send(500).json({ error: error.message });
    }

    res.send
});

//get single user by ID

router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const singleUser = await User.findById({ _id: id });
        res.status(200).json(singleUser);
    }

    catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

//delete user by ID

router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const singleUser = await User.findByIdAndDelete({ _id: id });
        res.status(200).json(singleUser);
    }

    catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});


//Update

router.patch("/:id", async (req, res) => {
    const { id } = req.params;
    const { name, email, desc } = req.body;

    try {
        const updateUser = await User.findByIdAndUpdate(id, req.body, { new: true, });
        res.status(200).json(updateUser);
    }

    catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    EmployeeModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json("Success");
                } else {
                    res.json("Incorrect Password!");
                }
            } else {
                res.json("User not found!");
            }
        })
})


router.post('/register', (req, res) => {
    EmployeeModel.create(req.body)
        .then(employees => res.json(employees))
        .catch(err => res.json(err))

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: '18379atrey@gmail.com',
            pass: 'jawuptxcamfavgvu',
        },
    });

    const { email, name } = req.body;

    const mailOptions = {
        from: '18379atrey@gmail.com',
        to: email,
        subject: 'Welcome to Our Website',
        text: `Hello ${name},\nWelcome to our website! Thank you for registering.`, // plain text body
        // HTML body (optional)
        html: `<p>Hello ${name},</p><p>Welcome to our website! Thank you for registering.</p>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('Error in sending email  ' + error);
            return true;
        } else {
            console.log('Email sent: ' + info.response);
            return false;
        }
    });

})

module.exports = router;

