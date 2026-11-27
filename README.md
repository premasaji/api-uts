
# UTS Pemrograman API
## REST API Manajemen Kategori dan Produk

REST API ini dibuat menggunakan Node.js, Express.js, dan PostgreSQL untuk mengelola data kategori dan produk.

### 1. Teknologi
- Node.js
- Express.js
- PostgreSQL
- Postman

### 2. Instalasi

Jalankan perintah berikut:

```bash
npm install
```

### 3. Konfigurasi Database

Buat file `.env` di folder utama proyek.

Sesuaikan konfigurasi dengan PostgreSQL yang digunakan:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password_database
DB_NAME=db_uts
PORT=3000
```

Ganti `password_database` dengan password PostgreSQL milik sendiri.

### 4. Menjalankan Server

Jalankan perintah:

```bash
node src/server.js
```

Server berjalan pada:

```text
http://localhost:3000
```

### 5. Daftar Endpoint

#### Kategori
| Method | Endpoint | Fungsi |
|---|---|---|
| GET | /api/kategori | Menampilkan semua kategori |
| GET | /api/kategori/:id | Menampilkan kategori berdasarkan ID |
| POST | /api/kategori | Menambahkan kategori |
| DELETE | /api/kategori/:id | Menghapus kategori |

#### Produk
| Method | Endpoint | Fungsi |
|---|---|---|
| GET | /api/produk | Menampilkan semua produk aktif |
| GET | /api/produk/:id | Menampilkan produk berdasarkan ID |
| GET | /api/kategori/:id/produk | Menampilkan produk berdasarkan kategori |
| POST | /api/produk | Menambahkan produk |
| PUT | /api/produk/:id | Mengganti seluruh data produk |
| PATCH | /api/produk/:id | Mengubah sebagian data produk |
| DELETE | /api/produk/:id | Menghapus produk sementara |
| PATCH | /api/produk/:id/restore | Mengembalikan produk |
| DELETE | /api/produk/:id/permanent | Menghapus produk permanen |

### 6. Fitur Tambahan
- Filter produk berdasarkan kategori menggunakan parameter `kategori_id`.
- Soft delete pada produk.
- Restore produk yang sudah dihapus sementara.
- Penghapusan permanen produk yang sudah di-soft-delete.
- Validasi input dan penanganan error.
