const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract the token from the Authorization header
  
  if (!token) {
    return res.status(401).json({ message: 'Missing token' });
  }
  
  try {
    const decoded = jwt.verify(token, 'secretKey');
    req.userId = decoded.userId; // Store the decoded user ID in the request object
    next(); // Call the next middleware or route handler
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }

};

module.exports = authenticateToken;
