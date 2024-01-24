const { Client } = require('pg');

const client = new Client({
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