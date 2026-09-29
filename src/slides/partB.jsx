import React from 'react'

function Code({ lang, src, children, style }) {
  return (
    <div className="code" data-lang={lang} data-src={src} style={style}>
      <pre>{children}</pre>
    </div>
  )
}

/* ============ SLIDE 7 - ISI FILE KONEKSI ============ */
export function S07_KoneksiFile() {
  return (
    <div className="slide">
      <span className="eyebrow">Koneksi Database</span>
      <h2 className="section-title">Struktur config/koneksi.php</h2>
      <p className="section-sub">
        Pusat konfigurasi sentral yang bertanggung jawab menginisialisasi komunikasi
        ke database MySQL dan menghasilkan satu objek koneksi $pdo terpadu untuk seluruh modul.
      </p>
      <div className="code" data-src="config/koneksi.php" data-lang="php">
        <pre>{`<?php
$host     = `}<span className="s">"localhost"</span>{`;   `}<span className="c">// Alamat server database MySQL</span>{`
$username = `}<span className="s">"root"</span>{`;        `}<span className="c">// User akses database</span>{`
$password = `}<span className="s">""</span>{`;            `}<span className="c">// Password akun (default Laragon kosong)</span>{`
$database = `}<span className="s">"db_spp_smk"</span>{`;  `}<span className="c">// Nama skema database sekolah</span>{`

`}<span className="k">try</span>{` {
    $pdo = `}<span className="k">new</span>{` `}<span className="f">PDO</span>{`(`}<span className="s">"mysql:host=$host;dbname=$database"</span>{`, $username, $password);
    $pdo->`}<span className="f">setAttribute</span>{`(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} `}<span className="k">catch</span>{` (PDOException $e) {
    `}<span className="f">die</span>{`(`}<span className="s">"Koneksi Database Gagal: "</span>{` . $e->`}<span className="f">getMessage</span>{`());
}
?>`}</pre>
      </div>
      <div className="grid-3" style={{ marginTop: 18 }}>
        <div className="card">
          <span className="tag">Arsitektur</span>
          <h4>Isolasi Parameter Server</h4>
          <p>
            Empat variabel konfigurasi dipusatkan di baris awal agar pemeliharaan server
            (misalnya migrasi dari Laragon lokal ke server sekolah) cukup diedit pada file ini
            tanpa perlu mengubah query di modul siswa atau kelas.
          </p>
        </div>
        <div className="card">
          <span className="tag">Protokol</span>
          <h4>Format Baku DSN</h4>
          <p>
            Sintaks DSN memberitahu driver PDO engine apa yang digunakan dan database target.
            Jika nama database salah ketik, PDO seketika membatalkan koneksi sejak baris ini sebelum
            menimbulkan error berantai.
          </p>
        </div>
        <div className="card">
          <span className="tag">Integritas</span>
          <h4>Instansiasi Objek $pdo Bersama</h4>
          <p>
            Objek $pdo yang terbentuk menjadi single source of truth untuk seluruh query aplikasi.
            Diimpor lewat require_once agar seluruh modul memakai sesi koneksi yang sama secara hemat memori.
          </p>
        </div>
      </div>
    </div>
  )
}

/* ============ SLIDE 8 - new PDO ============ */
export function S08_NewPdo() {
  return (
    <div className="slide">
      <span className="eyebrow">Koneksi Database</span>
      <h2 className="section-title">Konstruktor new PDO()</h2>
      <p className="section-sub">
        Membuka soket koneksi berorientasi objek antara runtime PHP dan engine MySQL
        dengan dukungan lintas database dan prepared statement native.
      </p>
      <div className="split">
        <div>
          <div className="code" data-src="config/koneksi.php:12" data-lang="php">
            <pre>{`$pdo = `}<span className="k">new</span>{` `}<span className="f">PDO</span>{`(
    `}<span className="s">"mysql:host=$host;dbname=$database"</span>{`,
    $username,
    $password
);`}</pre>
          </div>
          <div className="list" style={{ marginTop: 20 }}>
            <div className="item">
              <span className="idx">1</span>
              <div className="body">
                <strong>Parameter 1 - DSN (Data Source Name)</strong>
                <p>Menentukan jenis driver (mysql), alamat host (localhost), dan database target (db_spp_smk).</p>
              </div>
            </div>
            <div className="item">
              <span className="idx">2</span>
              <div className="body">
                <strong>Parameter 2 - Username Otentikasi</strong>
                <p>Akun pengguna MySQL yang memiliki hak akses membaca dan menulis data ke tabel sekolah.</p>
              </div>
            </div>
            <div className="item">
              <span className="idx">3</span>
              <div className="body">
                <strong>Parameter 3 - Password Kredensial</strong>
                <p>Kunci pengaman akun database. Pada Laragon lokal diisi string kosong secara default.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="card amber">
          <span className="tag">Standar Industri</span>
          <h4>Mengapa Memilih PDO?</h4>
          <div className="list tight" style={{ marginTop: 14 }}>
            <div className="item">
              <span className="idx">a</span>
              <div className="body">
                <strong>Portabilitas Lintas Database</strong>
                <p>
                  Sintaks query PDO konsisten untuk MySQL, PostgreSQL, maupun SQLite. Jika server sekolah
                  berganti database, cukup ubah DSN tanpa merombak logika program.
                </p>
              </div>
            </div>
            <div className="item">
              <span className="idx">b</span>
              <div className="body">
                <strong>Keamanan Prepared Statement Asli</strong>
                <p>
                  Memisahkan kompilasi perintah SQL dari data masukan pengguna, menjamin sistem kebal dari
                  serangan manipulasi kutip SQL Injection.
                </p>
              </div>
            </div>
            <div className="item">
              <span className="idx">c</span>
              <div className="body">
                <strong>Berorientasi Objek Modern</strong>
                <p>
                  Menggantikan fungsi prosedural lama mysql_connect() yang sudah usang dan resmi dihapus
                  sejak PHP 7 demi stabilitas aplikasi jangka panjang.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ============ SLIDE 9 - setAttribute & ERRMODE ============ */
export function S09_ErrMode() {
  return (
    <div className="slide">
      <span className="eyebrow">Koneksi Database</span>
      <h2 className="section-title">setAttribute(ATTR_ERRMODE, ERRMODE_EXCEPTION)</h2>
      <p className="section-sub">
        Mengaktifkan mode pelaporan kesalahan berbasis Exception agar kegagalan query SQL
        langsung terdeteksi dan tidak berjalan diam-diam di latar belakang.
      </p>
      <div className="grid-2">
        <div className="code" data-src="config/koneksi.php:14" data-lang="php">
          <pre>{`$pdo->`}<span className="f">setAttribute</span>{`(
    PDO::ATTR_ERRMODE,
    PDO::ERRMODE_EXCEPTION
);`}</pre>
        </div>
        <div className="card">
          <span className="tag">Prinsip Kerja</span>
          <h4>Mengapa Wajib ERRMODE_EXCEPTION?</h4>
          <p>
            Secara default, PDO berada pada mode ERRMODE_SILENT, di mana kesalahan query tidak memunculkan
            peringatan apapun dan program tetap berjalan seolah sukses. ERRMODE_EXCEPTION memaksa PDO untuk
            seketika melempar objek PDOException begitu ada kesalahan, sehingga alur eksekusi langsung melompat
            ke blok catch untuk diselamatkan.
          </p>
          <span className="loc">Lokasi: config/koneksi.php baris 14</span>
        </div>
      </div>
      <div className="grid-3" style={{ marginTop: 20 }}>
        <div className="card">
          <span className="tag">Mode Bawaan</span>
          <h4>PDO::ERRMODE_SILENT</h4>
          <p>
            Kesalahan SQL diabaikan diam-diam. Sangat berbahaya di aplikasi SPP karena query INSERT yang gagal
            akan menyebabkan data pembayaran hilang tanpa disadari admin.
          </p>
        </div>
        <div className="card">
          <span className="tag">Mode Peringatan</span>
          <h4>PDO::ERRMODE_WARNING</h4>
          <p>
            Memunculkan teks peringatan PHP di halaman web tetapi program tetap lanjut mengeksekusi baris berikutnya,
            berisiko memproses data setengah jadi.
          </p>
        </div>
        <div className="card">
          <span className="tag">Standar Profesional</span>
          <h4>PDO::ERRMODE_EXCEPTION</h4>
          <p>
            Melempar objek Exception yang menghentikan alur normal dan dialihkan ke penanganan terencana di blok catch,
            menjamin data sekolah tidak korup.
          </p>
        </div>
      </div>
    </div>
  )
}

/* ============ SLIDE 10 - try catch ============ */
export function S10_TryCatch() {
  return (
    <div className="slide">
      <span className="eyebrow">Koneksi Database</span>
      <h2 className="section-title">Penerapan Blok try - catch dan PDOException</h2>
      <p className="section-sub">
        Struktur pertahanan yang memisahkan antara instruksi normal yang rawan gagal dengan instruksi
        penyelamatan sistem saat terjadi kesalahan teknis.
      </p>
      <div className="code" data-src="config/koneksi.php:11-17, siswa/index.php:46-52" data-lang="php">
        <pre>{`}`}<span className="k">try</span>{` {
    $pdo = `}<span className="k">new</span>{` `}<span className="f">PDO</span>{`(`}<span className="s">"mysql:host=$host;dbname=$database"</span>{`, $username, $password);
    $pdo->`}<span className="f">setAttribute</span>{`(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} `}<span className="k">catch</span>{` (PDOException $e) {
    `}<span className="f">die</span>{`(`}<span className="s">"Koneksi Database Gagal: "</span>{` . $e->`}<span className="f">getMessage</span>{`());
}

`}<span className="c">// Pola try-catch juga diterapkan pada operasi CRUD data siswa dan kelas</span>{`
`}<span className="k">try</span>{` {
    $stmt = $pdo->`}<span className="f">prepare</span>{`(`}<span className="s">"DELETE FROM tbl_siswa WHERE id_siswa = ?"</span>{`);
    $stmt->`}<span className="f">execute</span>{`([$_GET[`}<span className="s">'hapus'</span>{`]]);
} `}<span className="k">catch</span>{` (PDOException $e) {
    `}<span className="f">echo</span>{` `}<span className="s">"&lt;script&gt;alert('Gagal Hapus Data Siswa');&lt;/script&gt;"</span>{`;
}`}</pre>
      </div>
      <div className="grid-3" style={{ marginTop: 18 }}>
        <div className="card">
          <span className="tag">Wilayah Eksekusi</span>
          <h4>Zona Pengawasan try</h4>
          <p>
            Semua instruksi yang bergantung pada ketersediaan eksternal (soket jaringan MySQL, penulisan siswa,
            penghapusan kelas) diletakkan di dalam try. Jika sukses, blok catch dilewati seluruhnya.
          </p>
        </div>
        <div className="card">
          <span className="tag">Spesifikasi Filter</span>
          <h4>Penangkap PDOException $e</h4>
          <p>
            Blok catch secara presisi hanya menangkap error bertipe PDOException. Variabel $e menyimpan informasi
            lengkap: status SQLSTATE, kode numerik driver MySQL, dan deskripsi pesan error.
          </p>
        </div>
        <div className="card">
          <span className="tag">Penyelamatan UX</span>
          <h4>Pencegahan Layar Putih (Crash)</h4>
          <p>
            Menghindarkan pengguna dari tampilan layar putih kosong atau tumpukan pesan fatal error internal yang
            membingungkan, dialihkan menjadi notifikasi JavaScript yang ramah pengguna.
          </p>
        </div>
      </div>
    </div>
  )
}

/* ============ SLIDE 11 - die & getMessage ============ */
export function S11_Die() {
  return (
    <div className="slide">
      <span className="eyebrow">Koneksi Database</span>
      <h2 className="section-title">Fungsi die() dan Pengambilan Pesan Error</h2>
      <p className="section-sub">
        Menghentikan alur program secara terencana saat koneksi gagal dan membedakan antara pesan teks pengembang
        dengan kode error numerik untuk logika program.
      </p>
      <div className="split">
        <div>
          <div className="code" data-src="config/koneksi.php:15-17" data-lang="php">
            <pre>{`} `}<span className="k">catch</span>{` (PDOException $e) {
    `}<span className="f">die</span>{`(`}<span className="s">"Koneksi Database Gagal: "</span>{`
        . $e->`}<span className="f">getMessage</span>{`());
}`}</pre>
          </div>
          <div className="card" style={{ marginTop: 18 }}>
            <span className="tag">Circuit Breaker</span>
            <h4>Fungsi die() sebagai Pemutus Darurat</h4>
            <p>
              Fungsi die() langsung menghentikan proses eksekusi PHP saat itu juga. Jika koneksi database gagal,
              tidak ada gunanya sistem mengeksekusi form HTML di bawahnya karena seluruh operasi aplikasi membutuhkan
              koneksi database aktif.
            </p>
            <span className="loc">Lokasi: config/koneksi.php baris 16</span>
          </div>
        </div>
        <div>
          <div className="card">
            <span className="tag">Diagnosa Debugging</span>
            <h4>{"$e->getMessage() untuk Pengembang"}</h4>
            <p>
              Mengambil kalimat deskripsi teknis dari driver MySQL (contoh: Access denied for user 'root'@'localhost').
              Sangat membantu programmer saat mencari akar masalah di lingkungan pengembangan Laragon.
            </p>
            <span className="loc">Dipanggil di dalam blok catch koneksi</span>
          </div>
          <div className="card" style={{ marginTop: 14 }}>
            <span className="tag">Logika Program</span>
            <h4>{"$e->errorInfo[1] untuk Percabangan"}</h4>
            <p>
              Mengambil angka integer kode error resmi MySQL (misal 1062 = duplikasi NIS, 1451 = constraint Foreign Key).
              Angka ini dipakai dalam percabangan if untuk memunculkan pesan bahasa Indonesia yang tepat ke pengguna sekolah.
            </p>
            <span className="loc">Lokasi: siswa/tambah.php baris 12</span>
          </div>
        </div>
      </div>
      <div className="code" data-lang="Output Teknis" style={{ marginTop: 20 }}>
        <pre>{`Contoh pesan getMessage() saat MySQL belum aktif di Laragon:
SQLSTATE[HY000] [2002] No connection could be made because the target machine actively refused it`}</pre>
      </div>
    </div>
  )
}

/* ============ SLIDE 12 - RINGKASAN KONEKSI ============ */
export function S12_RingkasKoneksi() {
  return (
    <div className="slide">
      <span className="eyebrow">Koneksi Database</span>
      <h2 className="section-title">Alur Lengkap Siklus Koneksi Database</h2>
      <p className="section-sub">
        Tahapan berurutan dari pemanggilan file konfigurasi hingga kesiapan objek koneksi melayani transaksi data.
      </p>
      <div className="flow">
        <div className="node">
          <b>1. require_once</b>
          <span>Halaman modul mengimpor file koneksi.php</span>
        </div>
        <span className="arrow">&#8594;</span>
        <div className="node">
          <b>2. Parameter</b>
          <span>Host, user, password, dan skema disiapkan</span>
        </div>
        <span className="arrow">&#8594;</span>
        <div className="node amber">
          <b>3. new PDO</b>
          <span>Soket koneksi dibuka ke MySQL daemon</span>
        </div>
        <span className="arrow">&#8594;</span>
        <div className="node">
          <b>4. setAttribute</b>
          <span>ERRMODE_EXCEPTION dikunci aktif</span>
        </div>
        <span className="arrow">&#8594;</span>
        <div className="node">
          <b>5. Objek $pdo</b>
          <span>Instance siap melayani query CRUD</span>
        </div>
      </div>
      <div className="grid-2" style={{ marginTop: 26 }}>
        <div className="card">
          <span className="tag">Skenario Normal</span>
          <h4>Koneksi Berhasil Terjalin</h4>
          <p>
            Instance objek $pdo aktif tersedia di memori server. Script PHP pada modul siswa atau kelas
            langsung melanjutkan eksekusi ke pemrosesan query data tanpa hambatan.
          </p>
        </div>
        <div className="card">
          <span className="tag">Skenario Gangguan</span>
          <h4>Kegagalan Layanan Database</h4>
          <p>
            Jika daemon MySQL mati atau kredensial salah, exception seketika dilempar ke catch,
            die() menghentikan proses secara terencana, dan pesan diagnostik dicetak untuk teknisi.
          </p>
        </div>
      </div>
    </div>
  )
}

/* ============ SLIDE 13 - require_once ============ */
export function S13_RequireOnce() {
  return (
    <div className="slide">
      <span className="eyebrow">Koneksi Database</span>
      <h2 className="section-title">Pernyataan require_once '../config/koneksi.php'</h2>
      <p className="section-sub">
        Mekanisme impor file konfigurasi yang menjamin ketersediaan objek koneksi secara efisien tanpa duplikasi.
      </p>
      <div className="split">
        <div>
          <div className="code" data-src="siswa/*.php, kelas/*.php" data-lang="php">
            <pre>{`<?php
`}<span className="c">// Diimpor pada baris paling atas di semua file modul</span>{`
`}<span className="k">require_once</span>{` `}<span className="s">'../config/koneksi.php'</span>{`;

`}<span className="c">// Setelah baris ini, objek $pdo langsung dapat digunakan</span>{`
$data_kelas = $pdo->`}<span className="f">query</span>{`(`}<span className="s">"SELECT * FROM tbl_kelas"</span>{`)
                   ->`}<span className="f">fetchAll</span>{`(PDO::FETCH_ASSOC);
?>`}</pre>
          </div>
          <div className="card" style={{ marginTop: 18 }}>
            <span className="tag">Keamanan Eksekusi</span>
            <h4>Mengapa Bukan include?</h4>
            <p>
              Perintah require memicu Fatal Error dan seketika menghentikan eksekusi jika file koneksi tidak ditemukan di server.
              Berbeda dengan include yang hanya memunculkan Warning dan tetap melanjutkan script, require menjamin bahwa aplikasi
              tidak akan pernah berjalan tanpa database.
            </p>
          </div>
        </div>
        <div>
          <div className="card">
            <span className="tag">Efisiensi Memori</span>
            <h4>Peran Krusial Akhiran _once</h4>
            <p>
              Akhiran _once memastikan file hanya dimuat tepat satu kali saja dalam satu siklus request HTTP.
              Ini mencegah pemborosan memori dan mencegah error fatal akibat inisialisasi ulang variabel konfigurasi
              jika file terpanggil di beberapa sub-komponen.
            </p>
          </div>
          <div className="card" style={{ marginTop: 14 }}>
            <span className="tag">Navigasi File</span>
            <h4>Arti Simbol Direktori Relatif (../)</h4>
            <p>
              Awalan tanda titik dua slash (../) menandakan bahwa script yang berada di dalam subfolder modul (seperti siswa/ atau kelas/)
              melangkah naik satu tingkat ke root directory sebelum masuk ke folder config/koneksi.php.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
