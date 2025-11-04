<img width="1614" height="918" alt="Screenshot 2025-11-04 170434" src="https://github.com/user-attachments/assets/00b48245-22c6-4bfc-88dd-9f981fd9eb8a" />
<img width="1902" height="981" alt="Screenshot 2025-11-04 170537" src="https://github.com/user-attachments/assets/c425a95c-dc86-4b30-b1d1-0f3e48d71c5c" />
<img width="1344" height="888" alt="Screenshot 2025-11-04 202559" src="https://github.com/user-attachments/assets/94f09fe6-f6de-4971-8dd7-330219986693" />
<img width="928" height="643" alt="Screenshot 2025-11-04 204252" src="https://github.com/user-attachments/assets/a377312f-5c72-413c-9cd5-92e9f6e6ae24" />
<img width="1349" height="863" alt="Screenshot 2025-11-04 204416" src="https://github.com/user-attachments/assets/d0f28b0a-b8e3-41a7-9aa1-263f1068ac3e" />
<img width="1346" height="852" alt="Screenshot 2025-11-04 204558" src="https://github.com/user-attachments/assets/06258912-7ac7-4125-9d44-6bb77f48d956" />
<img width="1382" height="837" alt="Screenshot 2025-11-04 204613" src="https://github.com/user-attachments/assets/0573deb3-5096-4b27-a7e7-bcf1cc0d49da" />


Sistem Absensi Sederhana dengan NestJS dan Prisma
Deskripsi

Proyek ini adalah aplikasi manajemen pengguna dan absensi yang dibuat menggunakan NestJS, Prisma ORM, dan PostgreSQL/MySQL (sesuai konfigurasi kamu). Aplikasi ini mendukung autentikasi dengan JWT (JSON Web Token) dan sistem role-based access control untuk membedakan akses antara admin dan user biasa.

Fitur Utama

Autentikasi JWT

Pengguna dapat login menggunakan username dan password.

Token JWT digunakan untuk mengakses endpoint yang dilindungi.

Manajemen Pengguna

Admin dapat menambah, melihat, mengubah, dan menghapus data user.

Password disimpan dalam bentuk hash menggunakan bcrypt untuk keamanan.

Manajemen Absensi

Pengguna dapat melakukan absensi (hadir/pulang) dengan menyimpan waktu dan tanggal otomatis.

Admin dapat melihat semua data absensi.

Pengguna hanya bisa melihat data absensinya sendiri.

Proteksi Endpoint

Menggunakan guard JWT untuk memastikan hanya pengguna terautentikasi yang dapat mengakses API tertentu.

Arsitektur Folder

Struktur folder utama proyek:

src/auth → berisi semua hal terkait autentikasi (login, JWT, strategi Passport)

src/users → mengatur manajemen user (CRUD)

src/attendance → mengatur data absensi pengguna

src/prisma → konfigurasi database dan Prisma Service

.env → menyimpan variabel lingkungan (JWT_SECRET, database URL, dll)

Cara Kerja Program

Proses Registrasi dan Login

Admin atau sistem dapat menambahkan pengguna baru melalui endpoint /users dengan data username, password, dan role.

Saat login di endpoint /auth/login, sistem memverifikasi password dengan bcrypt dan menghasilkan token JWT.

Token ini digunakan untuk mengakses endpoint lain sebagai bukti autentikasi.

Middleware dan Guards

Setiap endpoint yang dilindungi menggunakan JwtAuthGuard untuk memeriksa validitas token.

Jika token valid, data pengguna akan diteruskan ke controller melalui @Request().

Proses Absensi

Ketika user mengirim request ke endpoint /attendance dengan status seperti “hadir” atau “pulang”, sistem otomatis mencatat:

ID user dari token JWT

Tanggal (date) dan waktu (time) saat absensi dibuat

Status absensi (hadir/pulang)

Data absensi tersimpan di tabel Attendance di database.

Hak Akses

User biasa hanya bisa melihat absensinya sendiri melalui /attendance/me.

Admin dapat melihat seluruh data absensi melalui /attendance/all.

Keamanan

Password pengguna disimpan dalam bentuk hash menggunakan bcrypt.

JWT digunakan agar setiap request ke endpoint sensitif diverifikasi.

Role dan guard diterapkan agar akses API sesuai dengan hak pengguna.

Daftar Endpoint
Auth

POST /auth/login → Login dan mendapatkan token JWT

Users

POST /users → Tambah pengguna baru (admin)

GET /users → Lihat semua pengguna

GET /users/:id → Lihat detail pengguna tertentu

PATCH /users/me → Update profil sendiri

DELETE /users/:id → Hapus pengguna

Attendance

POST /attendance → Tambah absensi (hadir/pulang)

GET /attendance/me → Lihat absensi milik sendiri

GET /attendance/all → Lihat semua absensi (khusus admin)

GET /attendance/today → Lihat absensi hari ini

GET /attendance/rekap → Lihat rekap absensi semua user

Teknologi yang Digunakan

NestJS sebagai framework backend

Prisma ORM untuk akses database

Passport & JWT untuk autentikasi

Bcrypt untuk hashing password

Postman untuk pengujian endpoint

Cara Menjalankan

Clone repository ini.

Install dependencies dengan npm install.

Buat file .env berisi:

DATABASE_URL="mysql://user:password@localhost:3306/db_name"
JWT_SECRET="SECRETJWT"


Jalankan perintah npx prisma migrate dev untuk membuat struktur database.

Jalankan server dengan npm run start:dev.

Tes API menggunakan Postman.

Penutup

Aplikasi ini dibuat untuk latihan pengembangan backend menggunakan NestJS dan Prisma ORM. Sistem dapat dikembangkan lebih lanjut, misalnya dengan menambahkan laporan absensi, notifikasi, atau integrasi frontend.
