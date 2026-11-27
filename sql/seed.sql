
-- Memasukkan data kategori
INSERT INTO kategori (nama_kategori, deskripsi)
VALUES
('Elektronik', 'Peralatan elektronik'),
('Makanan', 'Produk makanan'),
('Minuman', 'Produk minuman');

-- Memasukkan data produk
INSERT INTO produk
(kategori_id, kode_produk, nama_produk, harga, stok)
VALUES
(
    (SELECT id FROM kategori WHERE nama_kategori = 'Elektronik'),
    'BRG001',
    'Laptop ASUS',
    7500000,
    10
),
(
    (SELECT id FROM kategori WHERE nama_kategori = 'Elektronik'),
    'BRG002',
    'Mouse Logitech',
    150000,
    20
),
(
    (SELECT id FROM kategori WHERE nama_kategori = 'Makanan'),
    'BRG003',
    'Beras 5 Kg',
    75000,
    30
),
(
    (SELECT id FROM kategori WHERE nama_kategori = 'Makanan'),
    'BRG004',
    'Gula Pasir 1 Kg',
    18000,
    40
),
(
    (SELECT id FROM kategori WHERE nama_kategori = 'Minuman'),
    'BRG005',
    'Air Mineral',
    5000,
    50
);
