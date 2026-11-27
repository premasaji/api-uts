const express = require('express');
const router = express.Router();

const produkController = require('../controllers/produkController');

const validatePatch = require('../middlewares/validatePatch');
const parseId = require('../middlewares/parseId');
const parseKategoriId = require('../middlewares/parseKategoriId');
const validateProduk = require('../middlewares/validateProduk');

// Menampilkan semua produk
router.get('/', produkController.getAll);

// Menampilkan produk berdasarkan kategori
router.get(
    '/kategori/:kategoriId',
    parseKategoriId,
    produkController.getByKategori
);

// Menampilkan detail produk berdasarkan ID
router.get(
    '/:id',
    parseId,
    produkController.getById
);

// Menambahkan produk
router.post(
    '/',
    validateProduk,
    produkController.create
);

// Mengubah seluruh data produk
router.put(
    '/:id',
    parseId,
    validateProduk,
    produkController.update
);

// Menghapus produk
router.delete(
    '/:id',
    parseId,
    produkController.delete
);

router.delete(
    '/:id/permanent',
    parseId, 
    produkController.permanentDelete
);

// Mengembalikan produk yang sudah dihapus
router.patch(
    '/:id/restore',
    parseId,
    produkController.restore
);

// Mengubah sebagian data produk
router.patch(
    '/:id',
    parseId,
    validatePatch,
    produkController.patch
);

module.exports = router;