import { pool } from '../db.mjs'; // Import your database connection pool
import bcrypt from 'bcrypt';

async function createUser(username, password) {
  try {
    // Check if the user already exists
    const userQuery = 'SELECT * FROM users WHERE username = $1';
    const { rows } = await pool.query(userQuery, [username]);

    if (rows.length === 0) {
      // User doesn't exist, so create a new user
      const hashedPassword = await bcrypt.hash(password, 10);
      const createUserQuery = 'INSERT INTO users (username, password) VALUES ($1, $2)';
      await pool.query(createUserQuery, [username, hashedPassword]);
      console.log('User created successfully.');
    } else {
      console.log('User already exists.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

export { createUser };