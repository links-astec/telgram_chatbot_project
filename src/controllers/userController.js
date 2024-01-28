const client = require('../config/dbConfig');
const jwt = require('jsonwebtoken');

// User Login
async function loginUser(req, res) {
  const { username, password } = req.body;

  try {
    const result = await queryDatabase(username, password);

    if (result.rows.length > 0) {
      const user = result.rows[0];
      const userId = user.userid; 
      const userData = {
        userId,
        username: user.username,
       
      };

      console.log("Login successful");
      res.status(200).json(userData);

      console.log(username, 'has logged in');
    } else {
      console.log('Login failed');
      res.status(401).send('Invalid username or password');
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Internal Server Error');
  }
}

// Function to query the database
async function queryDatabase(username, password) {
  const query = {
    text: 'SELECT * FROM users WHERE Username = $1 AND Password = $2',
    values: [username, password],
  };

  try {
    const result = await client.query(query);
    return result;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  loginUser,
};
