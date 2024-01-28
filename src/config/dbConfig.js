const { Pool } = require('pg')
require('dotenv').config();

const pool = new Pool({
 // connectionString: process.env.POSTGRES_URL + "?sslmode=require",
 host: "localhost",
    user: "postgres",
    port: 5432,
    password: "Mex-skyxer2001",
    database: "telegram_chat_bot" ,

    client: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
})  

pool.connect((err) => {
  if (err) {
    console.error('Error connecting to PostgreSQL:', err.message);
} else {
    console.log("Connected to PostgreSQL successfully!");
}
})



module.exports = pool