const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Missing fields' });

  if (username.length < 3) {
    return res.status(400).json({ error: 'Username must be at least 3 characters long' });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters long' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username',
      [username, hashedPassword]
    );
    res.status(201).json({ message: 'User registered', user: result.rows[0] });
  } catch (err) {
    if (err.code === '23505') {
      res.status(409).json({ error: 'Username already exists' });
    } else {
      res.status(500).json({ error: 'Registration failed', details: err.message });
    }
  }
}