const express = require('express');
const mysql = require('../database/database');
const bcrypt = require('bcrypt');

const registerUser = async (req, res, next) => {
  
  
  const admin_info={
     username :req.body.name,
     password :req.body.password,
  }

  // Check if the password is at least 8 characters long and the username is not empty
  if (admin_info.password.length >= 8 && admin_info.username !== "") {
    mysql.query('SELECT * FROM admin WHERE Name = ?', [admin_info.username], async (err, results, fields) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Server error');
      }

      console.log(results);
      if (results.length > 0) {
        res.send("Name already exists");
      } else {
        // Hash the password using bcrypt
        bcrypt.hash(admin_info.password, 10, (err, hash) => {
          if (err) {
            console.error(err);
            return res.status(500).send('Server error');
          }

          console.log(hash);
          const sql = `INSERT INTO admin (Name, Password) VALUES (?, ?)`;
          const values = [admin_info.username, hash];
          mysql.query(sql, values, (err, result) => {
            if (err) {
              console.error(err);
              return res.status(500).send('Server error');
            }

            console.log(`Inserted user with ID ${result.insertId}`);
            res.send("Registered successfully");
          });
        });
      }
    });
  } else {
    res.send("Invalid username or password");
  }
};

module.exports = registerUser;
