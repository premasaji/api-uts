const express = require('express');

const router = express.Router();

// Mengambil Controller dan Middleware
const kategoriController = require('../controllers/kategoriController');
const parseId = require('../middlewares/parseId');
const validateKategori = require('../middlewares/validateKategori');
const produkController = require('../controllers/produkController');

// GET: Menampilkan semua kategori
router.get('/', kategoriController.getAll);

// GET: Menampilkan kategori berdasarkan ID
router.get('/:id', parseId, kategoriController.getById);

// POST: Menambahkan kategori baru
router.post('/', validateKategori, kategoriController.create);

// DELETE: Menghapus kategori berdasarkan ID
router.delete('/:id', parseId, kategoriController.delete);

// GET: Menampilkan semua produk berdasarkan kategori
router.get('/:id/produk', parseId, (req, res, next) => {
    req.params.kategoriId = req.params.id;
    produkController.getByKategori(req, res, next);
});

module.exports = router;