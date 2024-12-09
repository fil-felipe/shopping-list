import * as dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();
 
// Config pool
const pool = new Pool({
  host: process.env.PG_HOST,
  port: process.env.PG_PORT ? parseInt(process.env.PG_PORT) : 5432,
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

export default pool;
