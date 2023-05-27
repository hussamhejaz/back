const express = require('express');
const mysql = require('../database/database');
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: '../public/uploads',
    filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // 1MB limit
    fileFilter: function(req, file, cb) {
      checkFileType(file, cb);
    }
  }).single('photo');

  function checkFileType(file, cb) {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
  
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Images only (JPEG/JPG/PNG)');
    }
  }
  


  const add_student = async (req, res) => {
    upload(req, res, (err) => {
      if (err) {
        res.status(400).json({ message: err });
      } else {
        const student_info = {
          id: req.body.id,
          name: req.body.name,
          Last_name: req.body.Last_name,
          Father_name: req.body.Father_name,
          mother_name: req.body.momname,
          father_job: req.body.fatherjob,
          mother_job: req.body.momjob,
          DOB: req.body.dob,
          gender: req.body.gander,
          father_num: req.body.fathernum,
          mother_num: req.body.momnum,
          photo: req.body.file // save filename in database if file exists
        };
  
        const query = 'INSERT INTO student SET ?';
        mysql.query(query, student_info, (err, result) => {
          if (err) {
            console.log(err);
            res.status(500).json({ message: 'Server error' });
          } else {
            res.status(200).json({ message: 'Student added successfully' });
          }
        });
      }
    });
  };
    


module.exports = add_student 