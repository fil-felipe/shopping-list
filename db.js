require('dotenv').config(); 
const { Pool } = require('pg'); 

// Config pool
const pool = new Pool({
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  ssl: process.env.PG_SSL === 'true', 
});

// connection test
pool.connect((err, client, release) => {
  if (err) {
    console.error('Błąd podczas łączenia z bazą danych:', err.stack);
  } else {
    console.log('Połączono z bazą danych PostgreSQL!');
    release();
  }
});

module.exports = pool;
