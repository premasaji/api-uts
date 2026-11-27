
-- Membuat tabel kategori (induk)
CREATE TABLE kategori (
    id SERIAL PRIMARY KEY,
    nama_kategori VARCHAR(50) NOT NULL UNIQUE,
    deskripsi VARCHAR(200),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Membuat tabel produk (anak)
CREATE TABLE produk (
    id SERIAL PRIMARY KEY,
    kategori_id INTEGER NOT NULL,
    kode_produk VARCHAR(20) NOT NULL UNIQUE,
    nama_produk VARCHAR(100) NOT NULL,
    harga INTEGER NOT NULL CHECK (harga > 0),
    stok INTEGER NOT NULL DEFAULT 0 CHECK (stok >= 0),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP NULL,

    CONSTRAINT fk_produk_kategori
        FOREIGN KEY (kategori_id)
        REFERENCES kategori(id)
);
