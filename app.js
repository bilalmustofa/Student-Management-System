const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const db = require('./dbConnection');

// create server
const server = express();

// allows frontend ↔ backend communication
server.use(cors());

// reads JSON data from frontend 
server.use(express.json());

// Receive Data from Frontend
server.post("/insertStudent", (req, res) => {
    // // Receive the input data

    // const fullName = req.body.fullName;
    // const email = req.body.email;
    // const phoneNumber = req.body.phoneNumber;
    // const department = req.body.department;
    // const address = req.body.address;
    // const gender = req.body.gender;
    const {fullName, email, phoneNumber, department, address, gender} = req.body;

    const sql = `INSERT INTO students(full_name, email, phone, department, address, gender) VALUES (?, ?, ?, ?, ?, ?)`;

    db.query(sql, [fullName, email, phoneNumber, department, address, gender],(err, result) => {
        if(err) {
            res.send("Student is NOT added!");
            console.log(err);
        } else {
            res.send(`${fullName} is added`);
            console.log("1 Student is added");
        }
    });


});




// listen server
server.listen(2020, (err) => {
    if(err) {
        console.log(err);
    } else {
        console.log("Port 2020 is Listen!");
    }
});
