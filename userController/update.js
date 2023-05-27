const mysql = require('../database/database');
const jwt = require('jsonwebtoken');

// function authenticate(req, res, next) {
//   const token = req.headers.authorization?.split(' ')[1]; // Extract the token from the Authorization header
  
//   if (!token) {
//     return res.status(401).json({ message: 'Missing token' });
//   }
  
//   try {
//     const decoded = jwt.verify(token, 'secretKey');
//     req.userId = decoded.userId; // Store the decoded user ID in the request object
//     next(); // Call the next middleware or route handler
//   } catch (err) {
//     return res.status(401).json({ message: 'Invalid token' });
//   }
// }

function updateStudent(req, res) {
  const studentId = req.params.id;
  const updates = {};

  for (const key in req.body) {
    if (req.body.hasOwnProperty(key)) {
      updates[key] = req.body[key];
    }
  }

  const query = 'UPDATE student SET ? WHERE id = ?';
  mysql.query(query, [updates, studentId], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: 'Server error' });
    } else {
      res.status(200).json({ message: 'Student updated successfully' });
    }
  });
}

module.exports = updateStudent

