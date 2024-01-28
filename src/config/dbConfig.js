const { Pool } = require('pg')
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL_URL + "?sslmode=require",
}) 

pool.connect((err) => {
  if (err) {
    console.error('Error connecting to PostgreSQL:', err.message);
} else {
    console.log("Connected to PostgreSQL successfully!");
}
})



module.exports = pool