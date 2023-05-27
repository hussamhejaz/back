const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mysql = require('../database/database');

const login = async (req, res) => {
  const admin_info={
    Name: req.body.name,
    Password: req.body.password
  }

  mysql.query('SELECT * FROM admin WHERE Name = ?', [admin_info.Name], async (err, results, fields) => {
    if (err) return res.status(500).send('Server error');

    if (results.length === 0) {
      return res.status(401).send({ message: 'Invalid username' });
    }

    const user = results[0];

    const isValid = await bcrypt.compare(admin_info.Password, user.Password);

    if (!isValid) {
      return res.status(401).send({ message: 'Invalid password' });
    }

    const token = jwt.sign({ id: user.Id }, 'secretKey', { expiresIn: '1h' }); // generate token with user id
    const refreshToken = jwt.sign({ id: user.Id }, 'refreshSecretKey', { expiresIn: '1d' }); 

    return res.send({ message: 'Login successful!', token, refreshToken });  
  });
};


module.exports =  login ;


