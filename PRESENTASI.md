# Aplikasi Pembayaran SPP - Presentasi Teknis PHP Native

Analisis fungsi, method, dan struktur kode pada website CRUD PHP native berbasis PDO.

**Disusun oleh (presentasi berpasangan):**
- Azka Hafidzha Putra Septo - XI RPL 2 - Absen 07
- Rifqi Arya Dira Fairuz - XI RPL 2 - Absen 25

**Sekolah:** SMK Taruna Bangsa
**Stack:** PHP Native + MySQL (PDO) + HTML/CSS/JavaScript, dijalankan di Laragon.

---

## Daftar Isi

1. [Pendahuluan](#bagian-1-pendahuluan)
2. [Koneksi Database](#bagian-2-koneksi-database)
3. [Query dan Keamanan](#bagian-3-query-dan-keamanan)
4. [Superglobal dan Logika PHP](#bagian-4-superglobal-dan-logika-php)
5. [Modul Siswa](#bagian-5-modul-siswa)
6. [Modul Kelas](#bagian-6-modul-kelas)
7. [Alur Sistem dan Kesimpulan](#bagian-7-alur-sistem-dan-kesimpulan)

---

## BAGIAN 1: PENDAHULUAN

> Slide bagian ini tidak menampilkan kode program, hanya gambaran umum.

### Slide 1 - Judul

Aplikasi Pembayaran SPP. Analisis fungsi, method, dan struktur kode pada website CRUD PHP native berbasis PDO.

Ringkasan angka: 9 file, 2 modul (siswa dan kelas), 2 tabel, teknik utama PDO Prepared Statement.

### Slide 2 - Agenda

| No | Topik | Isi |
|----|-------|-----|
| 01 | Pendahuluan | Latar belakang, tujuan, gambaran aplikasi |
| 02 | Koneksi Database | PDO, try-catch, error handling |
| 03 | Query dan Keamanan | query, prepare, execute, fetchAll, fetch |
| 04 | Superglobal dan Logika | POST, GET, isset, header, exit, ternary |
| 05 | Modul Siswa | Create, Read, Update, Delete siswa |
| 06 | Modul Kelas | Create, Read, Update, Delete kelas |
| 07 | Alur dan Kesimpulan | Diagram alur, relasi tabel, penutup |

### Slide 3 - Gambaran Umum

Aplikasi web pengelolaan data akademik untuk pembayaran SPP. Dibuat dengan PHP native dan MySQL tanpa framework.

- **Modul 01 Data Siswa** - tambah, tampilkan, edit, hapus data siswa.
- **Modul 02 Data Kelas** - kelola tahun ajaran, jurusan, nama kelas.
- **Database MySQL Relasional** - dua tabel dihubungkan Foreign Key.
- **Backend PHP + PDO** - akses database memakai prepared statement.

```
Frontend  : HTML5 + CSS + JavaScript (alert / confirm)
Backend   : PHP Native (tanpa framework)
Database  : MySQL / MariaDB via PDO
Server    : Laragon (Apache + MySQL)
```

### Slide 4 - Tujuan dan Manfaat

- **Koneksi terpusat.** Semua file memakai satu konfigurasi di `config/koneksi.php` lewat `require_once`, jadi perubahan cukup di satu tempat.
- **Keamanan dasar.** PDO prepared statement mencegah SQL Injection, `htmlspecialchars` mencegah XSS pada output.
- **Pemisahan logika dan tampilan.** Proses PHP di atas, HTML form di bawah.

```php
<?php
// Semua modul mengimpor konfigurasi yang sama
require_once '../config/koneksi.php';

// Lalu tinggal pakai objek $pdo di bawahnya
$data = $pdo->query('SELECT * FROM tbl_kelas');
?>
```

### Slide 5 - Struktur Folder

```
AZKA_HSP_SPP/
 ├─ index.php              # menu utama
 ├─ config/
 │   └─ koneksi.php        # koneksi PDO
 ├─ DB/
 │   └─ database.sql       # skema tabel
 ├─ siswa/
 │   ├─ index.php          # read + delete
 │   ├─ tambah.php         # create
 │   └─ edit.php           # update
 └─ kelas/
     ├─ index.php
     ├─ tambah.php
     └─ edit.php
```

### Slide 6 - Skema Database

```sql
CREATE TABLE tbl_kelas (
  id_kelas       INT AUTO_INCREMENT PRIMARY KEY,
  tahun_ajaran   VARCHAR(20)  NOT NULL,
  jurusan        VARCHAR(50)  NOT NULL,
  nama_kelas     VARCHAR(20)  NOT NULL
);

CREATE TABLE tbl_siswa (
  id_siswa    INT AUTO_INCREMENT PRIMARY KEY,
  nis         VARCHAR(20) NOT NULL UNIQUE,
  nama_siswa  VARCHAR(100) NOT NULL,
  id_kelas    INT NOT NULL,
  alamat      TEXT NOT NULL,
  telepon     VARCHAR(20) NOT NULL
);

-- Relasi
ALTER TABLE tbl_siswa
ADD CONSTRAINT fk_siswa_kelas
FOREIGN KEY (id_kelas) REFERENCES tbl_kelas(id_kelas)
ON UPDATE CASCADE ON DELETE RESTRICT;
```

- **AUTO_INCREMENT** - primary key terisi otomatis.
- **UNIQUE** - kolom `nis` tidak boleh sama.
- **FOREIGN KEY** - `ON DELETE RESTRICT` menolak hapus kelas yang masih dipakai siswa.

---

## BAGIAN 2: KONEKSI DATABASE

> Semua kode di bagian ini bersumber dari `config/koneksi.php`, kecuali yang disebutkan lain.

### Slide 7 - config/koneksi.php

```php
<?php
$host     = "localhost";   // alamat server database
$username = "root";        // user akses MySQL
$password = "";            // password (kosong di Laragon)
$database = "db_spp_smk";  // nama database

try {
    $pdo = new PDO("mysql:host=$host;dbname=$database", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Koneksi Database Gagal: " . $e->getMessage());
}
?>
```

### Slide 8 - new PDO

Constructor PDO yang membuka jalur koneksi ke MySQL.

- Parameter 1 (DSN): `mysql:host=...;dbname=...`
- Parameter 2: username MySQL
- Parameter 3: password

**Kenapa PDO?** Mendukung banyak jenis database, punya prepared statement asli, dan berbasis objek.

### Slide 9 - setAttribute + ERRMODE_EXCEPTION

```php
$pdo->setAttribute(
    PDO::ATTR_ERRMODE,
    PDO::ERRMODE_EXCEPTION
);
```

Dengan `ERRMODE_EXCEPTION`, setiap error SQL langsung melempar `PDOException` sehingga bisa ditangkap `catch` dan tidak membuat halaman berhenti mendadak.

Lokasi: `config/koneksi.php` baris 14.

### Slide 10 - try, catch, dan PDOException

```php
try {
    $pdo = new PDO("mysql:host=$host;dbname=$database", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Koneksi Database Gagal: " . $e->getMessage());
}
```

Blok `try` juga dipakai saat simpan dan hapus data di modul siswa dan kelas.

### Slide 11 - die() dan getMessage()

```php
} catch (PDOException $e) {
    die("Koneksi Database Gagal: "
        . $e->getMessage());
}
```

- **die()** - menghentikan seluruh proses PHP dan mencetak pesan.
- **getMessage()** - mengambil pesan error teknis dari driver MySQL.
- **errorInfo[1]** - mengambil kode error spesifik MySQL (contoh 1062 untuk duplikasi).

Contoh output: `SQLSTATE[HY000] [1045] Access denied for user 'root'@'localhost'`

### Slide 12 - Rangkuman Alur Koneksi

```
require_once -> Variabel -> new PDO -> setAttribute -> Siap dipakai
```

- Jika berhasil: objek `$pdo` tersedia dan halaman lanjut memproses data.
- Jika gagal: `catch` menangkap `PDOException` lalu `die()` menghentikan halaman.

### Slide 13 - require_once

```php
<?php
require_once '../config/koneksi.php';
?>
```

- **require** - menyisipkan file, fatal error jika tidak ada.
- **include** - mirip require tapi hanya peringatan.
- **_once** - memastikan file hanya dimuat satu kali.

Dipakai di 8 file modul lainnya.

---

## BAGIAN 3: QUERY DAN KEAMANAN

> Sumber kode tercantum di judul tiap slide (contoh `siswa/tambah.php:9` artinya baris 9).

### Slide 14 - Empat Method Inti PDO

| Method | Fungsi |
|--------|--------|
| `query()` | Menjalankan SQL statis tanpa input user |
| `prepare()` + `execute()` | Query dengan placeholder, aman |
| `fetchAll()` | Mengambil seluruh baris hasil |
| `fetch()` | Mengambil satu baris hasil |

```php
$stmt = $pdo->prepare("... WHERE kolom = ?");   // siapkan
$stmt->execute([$nilai]);                        // isi + jalankan
$hasil = $stmt->fetch(PDO::FETCH_ASSOC);         // ambil hasil
```

### Slide 15 - $pdo->query()

```php
$data_kelas = $pdo
    ->query("SELECT * FROM tbl_kelas ORDER BY id_kelas DESC")
    ->fetchAll(PDO::FETCH_ASSOC);
```

Dipakai untuk query statis tanpa input user. `ORDER BY id_kelas DESC` membuat data terbaru muncul di atas. Catatan: `query()` tidak aman jika diberi input user langsung.

Lokasi: `kelas/index.php` baris 3.

### Slide 16 - $pdo->prepare()

```php
$sql = "INSERT INTO tbl_siswa
    (nis, nama_siswa, id_kelas, alamat, telepon)
    VALUES (?,?,?,?,?)";

$stmt = $pdo->prepare($sql);
```

Jantung keamanan aplikasi. Tanda tanya `?` adalah placeholder, query dan data dipisah sehingga mencegah SQL Injection.

### Slide 17 - $stmt->execute()

```php
$stmt = $pdo->prepare("INSERT INTO tbl_siswa (nis, nama_siswa, id_kelas, alamat, telepon) VALUES (?,?,?,?,?)");

$stmt->execute([
    $_POST['nis'],
    $_POST['nama_siswa'],
    $_POST['id_kelas'],
    $_POST['alamat'],
    $_POST['telepon']
]);
```

Urutan array harus sama persis dengan urutan tanda tanya. Jumlah nilai tidak cocok dengan jumlah `?` akan memicu error.

### Slide 18 - fetchAll(PDO::FETCH_ASSOC)

```php
$data_siswa = $pdo
    ->query($sql)
    ->fetchAll(PDO::FETCH_ASSOC);
```

Menghasilkan array asosiatif:

```php
[
  ["nis" => "1001", "nama_siswa" => "Azka", "nama_kelas" => "XI RPL 2"],
  ["nis" => "1002", "nama_siswa" => "Budi", ...]
]
```

Alternatif: `FETCH_NUM` (array angka), `FETCH_OBJ` (objek).

### Slide 19 - fetch(PDO::FETCH_ASSOC)

```php
$stmt = $pdo->prepare(
    "SELECT * FROM tbl_siswa WHERE id_siswa = ?"
);
$stmt->execute([$id]);

$siswa = $stmt->fetch(PDO::FETCH_ASSOC);
```

Mengambil satu baris saja. Dipakai di halaman edit untuk mengisi form:

```php
<input type="text" name="nama_siswa" value="<?= $siswa['nama_siswa']; ?>" required>
```

### Slide 20 - Prepared Statement vs Query Biasa

**Rentan (query langsung):**

```php
$sql = "SELECT * FROM tbl_siswa WHERE nis = '" . $_GET['nis'] . "'";
```

**Aman (prepared statement):**

```php
$stmt = $pdo->prepare("SELECT * FROM tbl_siswa WHERE nis = ?");
$stmt->execute([$_GET['nis']]);
```

Prepared statement mengompilasi query lebih dulu, nilai dikirim terpisah dan diperlakukan murni sebagai data.

### Slide 21 - htmlspecialchars()

```php
<td><?= htmlspecialchars($row['nama_kelas']); ?></td>

// Tanpa htmlspecialchars (berisiko XSS)
<td><?= $row['nama_kelas']; ?></td>
```

Konversi karakter: `<` menjadi `&lt;`, `>` menjadi `&gt;`, `&` menjadi `&amp;`, `"` menjadi `&quot;`. Dipakai di `kelas/index.php`.

---

## BAGIAN 4: SUPERGLOBAL DAN LOGIKA PHP

> Sumber kode tercantum di judul tiap slide.

### Slide 22 - $_POST dan $_GET

| | $_POST | $_GET |
|---|--------|-------|
| Pengiriman | body request | query string URL |
| Terlihat di URL | Tidak | Ya |
| Dipakai untuk | simpan, update | edit, hapus |

```php
// POST - simpan data
$stmt->execute([$_POST['nis'], $_POST['nama_siswa']]);

// GET - identitas aksi
$id = $_GET['id'];
$stmt->execute([$_GET['hapus']]);
```

Contoh URL: `edit.php?id=5` dan `index.php?hapus=5`.

### Slide 23 - isset()

```php
if (isset($_POST['simpan'])) {
    $stmt->execute([...]);
}

if (isset($_GET['hapus'])) {
    $stmt->execute([$_GET['hapus']]);
}
```

Gerbang sebelum proses database. Tanpa `isset`, blok insert akan berjalan setiap halaman dibuka padahal form belum disubmit.

### Slide 24 - Null Coalescing ??

```php
$id = $_GET['id'] ?? null;

// Setara dengan:
$id = isset($_GET['id']) ? $_GET['id'] : null;
```

Memberi nilai cadangan `null` saat data belum ada. Dipakai di `siswa/edit.php` dan `kelas/edit.php` baris 3.

### Slide 25 - header() dan exit

```php
$id = $_GET['id'] ?? null;
if (! $id) {
    header("Location: index.php");
    exit;
}
```

- **header("Location: ...")** - mengirim header HTTP untuk redirect.
- **exit** - menghentikan skrip agar HTML form di bawah tidak dirender.

Tanpa `exit`, kode berikutnya tetap dijalankan server.

### Slide 26 - foreach dan Short Echo

```php
<?php $no = 1;
foreach ($data_siswa as $row) : ?>
    <tr>
        <td><?= $no++; ?></td>
        <td><?= $row['nis']; ?></td>
        <td><?= $row['nama_siswa']; ?></td>
        <td><?= $row['nama_kelas']; ?></td>
    </tr>
<?php endforeach; ?>
```

- **foreach** - mengulang blok untuk setiap elemen array.
- **sintaks alternatif** - `foreach : ... endforeach` agar HTML tetap rapi.
- **`<?= ?>`** - short echo.

### Slide 27 - Ternary Operator

```php
($k['id_kelas'] == $siswa['id_kelas']) ? 'selected' : ''
```

Struktur: `kondisi ? nilai jika benar : nilai jika salah`.

Hasil di browser:

```html
<option value="2" selected>XI RPL 2 (RPL)</option>
```

---

## BAGIAN 5: MODUL SISWA

> Sumber: folder `siswa/` (index.php, tambah.php, edit.php).

### Slide 28 - Pengelolaan Data Siswa

| Aksi | File | Query |
|------|------|-------|
| Create | `siswa/tambah.php` | INSERT INTO tbl_siswa |
| Read + Delete | `siswa/index.php` | SELECT JOIN + DELETE |
| Update | `siswa/edit.php` | SELECT by id + UPDATE |

```
index.php  --(klik Tambah)-->  tambah.php  --(simpan)-->  index.php
index.php  --(klik Edit)---->  edit.php    --(update)-->  index.php
index.php  --(klik Hapus)--->  proses DELETE            -->  index.php
```

### Slide 29 - CREATE: Tambah Data Siswa

```php
$list_kelas = $pdo->query(
    "SELECT * FROM tbl_kelas ORDER BY nama_kelas ASC"
)->fetchAll(PDO::FETCH_ASSOC);

if (isset($_POST['simpan'])) {
    try {
        $sql = "INSERT INTO tbl_siswa
            (nis, nama_siswa, id_kelas, alamat, telepon)
            VALUES (?,?,?,?,?)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$_POST['nis'], ...]);
    } catch (PDOException $e) {
        // penanganan error
    }
}
```

Alur: ambil data kelas untuk dropdown, gerbang `isset`, prepared statement, notifikasi alert dan redirect.

### Slide 30 - READ: Tampilkan Data Siswa (JOIN)

```php
$sql = "SELECT tbl_siswa.*, tbl_kelas.nama_kelas, tbl_kelas.jurusan
        FROM tbl_siswa
        JOIN tbl_kelas ON tbl_siswa.id_kelas = tbl_kelas.id_kelas
        ORDER BY tbl_siswa.id_siswa DESC";

$data_siswa = $pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC);
```

JOIN menggabungkan dua tabel berdasarkan kolom `id_kelas` supaya nama kelas dan jurusan ikut tampil.

```
NIS   | Nama Siswa | Kelas    | Jurusan | Telepon  | Aksi
1001  | Azka       | XI RPL 2 | RPL     | 0812...  | Edit | Hapus
```

### Slide 31 - UPDATE: Edit Data Siswa

```php
$stmt = $pdo->prepare(
    "SELECT * FROM tbl_siswa WHERE id_siswa = ?"
);
$stmt->execute([$id]);
$siswa = $stmt->fetch(PDO::FETCH_ASSOC);

if (isset($_POST['update'])) {
    $sql = "UPDATE tbl_siswa SET nis=?, nama_siswa=?,
            id_kelas=?, alamat=?, telepon=?
            WHERE id_siswa=?";
    $stmt->execute([$_POST['nis'], ..., $id]);
}
```

`WHERE id_siswa = ?` menentukan baris mana yang diperbarui, bukan semua baris.

### Slide 32 - DELETE: Hapus Data Siswa

```php
if (isset($_GET['hapus'])) {
    try {
        $stmt = $pdo->prepare(
            "DELETE FROM tbl_siswa WHERE id_siswa = ?"
        );
        $stmt->execute([$_GET['hapus']]);
        echo "<script>alert('Siswa Berhasil dihapus!');
              window.location='index.php';</script>";
    } catch (PDOException $e) {
        echo "<script>alert('Gagal Hapus');</script>";
    }
}
```

```html
<a href="index.php?hapus=<?= $row['id_siswa']; ?>"
   onclick="return confirm('Hapus Data Siswa?')">Hapus</a>
```

---

## BAGIAN 6: MODUL KELAS

> Sumber: folder `kelas/` (index.php, tambah.php, edit.php).

### Slide 33 - Pengelolaan Data Kelas

| Aksi | File | Query |
|------|------|-------|
| Create | `kelas/tambah.php` | INSERT INTO tbl_kelas (tahun_ajaran, jurusan, nama_kelas) VALUES (?, ?, ?) |
| Read + Delete | `kelas/index.php` | SELECT * FROM tbl_kelas ORDER BY id_kelas DESC |
| Update | `kelas/edit.php` | UPDATE tbl_kelas SET tahun_ajaran=?, jurusan=?, nama_kelas=? WHERE id_kelas=? |

Struktur sama seperti modul siswa, tapi tanpa dropdown karena kelas adalah data induk.

### Slide 34 - Proteksi Foreign Key

```php
if (isset($_GET['hapus'])) {
    try {
        $stmt = $pdo->prepare("DELETE FROM tbl_kelas WHERE id_kelas = ?");
        $stmt->execute([$_GET['hapus']]);
        echo "<script>alert('Kelas berhasil dihapus!');</script>";
    } catch (PDOException $e) {
        echo "<script>alert('Gagal hapus: Kelas masih digunakan oleh data siswa!');</script>";
    }
}
```

Alur: User klik Hapus -> MySQL cek FK (ON DELETE RESTRICT) -> Ditolak, PDOException -> catch menampilkan alert penjelas.

---

## BAGIAN 7: ALUR SISTEM DAN KESIMPULAN

> Sumber: gabungan seluruh modul aplikasi.

### Slide 35 - JavaScript di Aplikasi

- **alert()** - popup pesan berhasil atau gagal.
- **window.location** - mengalihkan browser kembali ke halaman daftar.
- **confirm()** - meminta persetujuan sebelum data dihapus.

```php
// Sukses simpan
echo "<script>alert('Siswa berhasil disimpan!');
      window.location='index.php';</script>";

// Konfirmasi hapus pada link
onclick="return confirm('Hapus Data Siswa?')"
```

### Slide 36 - Form HTML dan Validasi required

```html
<form method="POST">
  <table>
    <tr>
      <td>NIS</td>
      <td>: <input type="text" name="nis" required></td>
    </tr>
    <tr>
      <td>Kelas</td>
      <td>:
        <select name="id_kelas" required>
          <option value="">-- Pilih Kelas --</option>
          <?php foreach ($list_kelas as $k) : ?>
            <option value="<?= $k['id_kelas']; ?>"><?= $k['nama_kelas']; ?></option>
          <?php endforeach; ?>
        </select>
      </td>
    </tr>
  </table>
  <button type="submit" name="simpan">Simpan Siswa</button>
</form>
```

- **method="POST"** - cara data dikirim.
- **name** - kunci yang jadi indeks `$_POST`.
- **required** - browser menolak submit jika field kosong.

### Slide 37 - Alur Sistem

```
1. Browser   -> user isi form dan klik simpan
2. HTTP POST -> data dikirim ke server Apache
3. PHP       -> tangkap $_POST, cek isset
4. PDO       -> prepare + execute ke MySQL
5. MySQL     -> simpan / tolak data
6. Respon    -> alert + redirect ke index
```

- **Baca data:** `query()` lalu `fetchAll()` / `fetch()`, hasil dirender lewat `foreach`.
- **Tulis data:** `prepare()` lalu `execute()`, hasil notifikasi alert dan redirect.

### Slide 38 - Penutup / Ucapan Terima Kasih

> Sumber: tidak menampilkan kode, slide penutup presentasi.

**Judul:** Terima Kasih

**Kalimat penutup:**

Sekian pemaparan teknis mengenai analisis fungsi, method, dan struktur kode aplikasi pembayaran SPP berbasis PHP native dan PDO. Terima kasih atas perhatian dan kesempatan yang telah diberikan oleh Bapak/Ibu guru serta rekan-rekan sekalian.

**Anggota Kelompok:**

| Absen | Nama | Kelas |
|-------|------|-------|
| 07 | Azka Hafidzha Putra Septo | XI RPL 2 |
| 25 | Rifqi Arya Dira Fairuz | XI RPL 2 |

SMK Taruna Bangsa - Tahun Ajaran 2025/2026

---

## Lampiran: Daftar Lengkap Fungsi dan Method

| No | Nama | Kategori | Lokasi | Penjelasan |
|----|------|----------|--------|------------|
| 1 | new PDO() | Koneksi | koneksi.php:12 | Membuat koneksi database |
| 2 | setAttribute() | Koneksi | koneksi.php:14 | Mengaktifkan mode error exception |
| 3 | try { } catch (PDOException $e) | Error Handling | Semua modul | Menangkap error SQL |
| 4 | die() | Error Handling | koneksi.php:16 | Menghentikan script dan cetak pesan |
| 5 | $e->getMessage() | Error Handling | koneksi.php:16 | Ambil pesan error teknis |
| 6 | $e->errorInfo[1] | Error Handling | siswa/tambah.php:12 | Ambil kode error MySQL |
| 7 | require_once | Include | Semua modul | Impor koneksi sekali saja |
| 8 | $pdo->query() | Query | kelas/index.php:3, siswa/index.php:7 | Query statis |
| 9 | $pdo->prepare() | Query | Semua proses tulis | Siapkan query berparameter |
| 10 | $stmt->execute() | Query | INSERT, UPDATE, DELETE | Jalankan dengan nilai |
| 11 | fetchAll(PDO::FETCH_ASSOC) | Query | index.php semua modul | Ambil semua baris |
| 12 | fetch(PDO::FETCH_ASSOC) | Query | edit.php semua modul | Ambil satu baris |
| 13 | $_POST | Superglobal | Form simpan/update | Tangkap data form |
| 14 | $_GET | Superglobal | Edit dan hapus | Tangkap parameter URL |
| 15 | isset() | Logika | Semua pemrosesan form | Cek variabel terisi |
| 16 | ?? (Null Coalescing) | Operator | edit.php:3 | Nilai default null |
| 17 | header("Location: ...") | Logika | edit.php:5 | Redirect halaman |
| 18 | exit | Logika | Setelah header | Stop eksekusi |
| 19 | htmlspecialchars() | Keamanan | kelas/index.php | Cegah XSS |
| 20 | foreach : endforeach | Tampilan | index.php semua modul | Loop data ke tabel |
| 21 | <?= ?> | Tampilan | Semua view | Short echo |
| 22 | ternary ? : | Operator | edit.php dropdown | Seleksi opsi terpilih |
| 23 | alert() | JavaScript | Setelah query sukses/gagal | Notifikasi popup |
| 24 | window.location | JavaScript | Setelah query sukses | Redirect client-side |
| 25 | confirm() | JavaScript | Link hapus | Konfirmasi hapus |
| 26 | required | HTML | Semua input wajib | Validasi browser |
