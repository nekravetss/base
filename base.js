import { Client } from 'pg';
import fs from 'fs';

// Завантаження сертифіката
const sslRootCert = fs.readFileSync('ca.crt').toString();

const client = new Client({
  connectionString: 'postgresql://postgres:QeqC8GD8CwjSojrE@fully-stunning-koala.data-1.use1.tembo.io:5432/postgres',
  ssl: {
    rejectUnauthorized: true,
    ca: sslRootCert,
  },
});

async function queryStudentByFirstName(firstName) {
  try {
    await client.connect();
    const queryText = 'SELECT * FROM students WHERE first_name = $1';
    const { rows } = await client.query(queryText, [firstName]);
    console.log('Query result:', rows);
  } catch (error) {
    console.error('Query failed:', error);
  } finally {
    await client.end();
    console.log('Connection closed.');
  }
}

queryStudentByFirstName('Andrio');
