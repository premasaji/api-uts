const { Pool } = require('pg');
require('dotenv').config();

// Membuat koneksi database menggunakan Pool
const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Menangani error koneksi
pool.on('error', (err) => {
    console.error('Database error:', err.message);
});

// Mengekspor pool agar bisa digunakan file lain
module.exports = pool;