const express = require('express');

const kategoriRoutes = require('./routes/kategoriRoutes');
const produkRoutes = require('./routes/produkRoutes');

// Membuat aplikasi Express
const app = express();

// Middleware untuk membaca JSON
app.use(express.json());

// Menggunakan router kategori
app.use('/api/kategori', kategoriRoutes);

// Menggunakan router produk
app.use('/api/produk', produkRoutes);

// Handler jika alamat API tidak ditemukan
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint tidak ditemukan'
    });
});

// Error handler terpusat
app.use((err, req, res, next) => {
    console.error('Terjadi error:', err.message);

    // Menangani JSON yang formatnya rusak
    if (err instanceof SyntaxError && err.status === 400) {
        return res.status(400).json({
            success: false,
            message: 'Format JSON tidak valid'
        });
    }

    // Menangani error yang tidak terduga
    res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan pada server'
    });
});

module.exports = app;