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
            console.log(err);
        } else {
            res.send(`${fullName} is added`);
            console.log("1 Student is added");
        }
    });


});

// send data to frontend
server.get("/showStudent", (req, res) => {
    const sql = `SELECT id, full_name, email, phone, department FROM students`;

    db.query(sql, (err, result) => {
        if(err){
            console.log(err);
        } else {
            console.log("Student list is display");
            res.json(result);
        }
    })
});

// send one student data by id
server.get("/students/:id", (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM students WHERE id = ?`;

    db.query(sql, [id], (err, result) => {
        if(err) {
            console.log(err);
        } else {
            console.log("send one student");
            res.json(result[0]);
        }
    });
});

// Update Student data
server.put("/updateStudent/:id", (req, res) => {
    const id = req.params.id;
    const {fullName, email, phoneNumber, department, address, gender} = req.body;

    const sql = `UPDATE students SET full_name = ?, email = ?, phone = ?, department = ?, address = ?, gender = ? WHERE id = ?`;

    db.query(sql,  [fullName, email, phoneNumber, department, address, gender, id], (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send("Student Updated Successfully");
        }
    });
}) ;

// delete single student
server.delete("/deleteStudent/:id", (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM students WHERE id = ?`;

    db.query(sql, [id], (err, result) =>{
        if(err) {
            console.log(err);
        } else {
            console.log("Student deleted successfully");
            res.send("Student deleted successfully")
        }
    })
});




// listen server
server.listen(2020, (err) => {
    if(err) {
        console.log(err);
    } else {
        console.log("Port 2020 is Listen!");
    }
});
