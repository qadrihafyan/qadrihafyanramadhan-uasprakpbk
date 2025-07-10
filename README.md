
# 🚗 Aplikasi Rental Mobil - UMKM

Aplikasi manajemen rental mobil sederhana berbasis **Vue 3 + Pinia + JSON Server**, dibuat untuk membantu UMKM mengelola data pelanggan, mobil, dan transaksi penyewaan dengan antarmuka yang simpel dan efisien.

---

## 📦 Fitur Utama

- ✅ Login dan navigasi berdasarkan autentikasi (opsional)
- ✅ Manajemen data mobil
- ✅ Manajemen data pelanggan
- ✅ Pencatatan transaksi sewa mobil
- ✅ Status transaksi: `berjalan` dan `selesai`
- ✅ Mobil otomatis ditandai sebagai `disewa` ketika sedang digunakan
- ✅ Statistik transaksi ditampilkan di halaman dashboard

---

## 🗂 Struktur Halaman

- `/` → **Dashboard**  
  Menampilkan ringkasan data mobil, pelanggan, dan transaksi selesai.

- `/mobil` → **Data Mobil**  
  Tambah, tampilkan, dan hapus data mobil. Mobil yang sedang disewa tidak bisa dihapus.

- `/pelanggan` → **Data Pelanggan**  
  Tambah, tampilkan, dan hapus pelanggan.

- `/transaksi` → **Transaksi Berjalan**  
  Tambah transaksi baru, tampilkan transaksi aktif, dan konfirmasi selesai.

---

## ⚙️ Cara Menjalankan

### 1. Jalankan JSON Server

```bash
npm install -g json-server
json-server --watch db.json --port 3000
```

### 2. Jalankan Vue App

```bash
npm install
npm run dev
```

---

## 🧾 Contoh Struktur `db.json`

```json
{
  "mobil": [
    {
      "id": 1,
      "nama": "Toyota Avanza",
      "nomor_polisi": "B 1234 XYZ",
      "tarif_per_hari": 300000,
      "disewa": false
    }
  ],
  "pelanggan": [
    {
      "id": 1,
      "nama": "Andi",
      "no_hp": "081234567890",
      "alamat": "Jl. Merdeka No.1"
    }
  ],
  "transaksi": [
    {
      "id": 1,
      "pelangganId": 1,
      "mobilId": 1,
      "tanggal_sewa": "2025-07-01",
      "tanggal_kembali": "2025-07-05",
      "total": 1200000,
      "status": "berjalan"
    }
  ]
}
```

---

## 🔌 Endpoint JSON Server

| Method | Endpoint            | Keterangan                        |
|--------|---------------------|-----------------------------------|
| GET    | `/mobil`            | Ambil semua data mobil            |
| POST   | `/mobil`            | Tambah data mobil baru            |
| PUT    | `/mobil/:id`        | Update data mobil (mis. disewa)   |
| DELETE | `/mobil/:id`        | Hapus data mobil                  |
| GET    | `/pelanggan`        | Ambil semua data pelanggan        |
| POST   | `/pelanggan`        | Tambah data pelanggan baru        |
| DELETE | `/pelanggan/:id`    | Hapus data pelanggan              |
| GET    | `/transaksi`        | Ambil semua transaksi             |
| POST   | `/transaksi`        | Tambah transaksi baru             |
| PUT    | `/transaksi/:id`    | Update status transaksi (selesai) |
| DELETE | `/transaksi/:id`    | Hapus transaksi                   |

---

## 👨‍💻 Kontributor

- Dibuat oleh: [Qadri hafyan ramadhan]
- Untuk keperluan pembelajaran dan UMKM sederhana
