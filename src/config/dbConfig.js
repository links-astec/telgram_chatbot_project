const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",

    client: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
});

client.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
    process.exit(1);
  } else {

    console.log('Connected to the database');
  }
});



module.exports = client;   