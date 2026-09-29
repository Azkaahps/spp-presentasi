import React from 'react'
import { RobotSceneLazy } from '../components/RobotSceneLazy.jsx'

function Code({ lang, src, children, style }) {
  return (
    <div className="code" data-lang={lang} data-src={src} style={style}>
      <pre>{children}</pre>
    </div>
  )
}

/* ============ SLIDE 28 - MODUL SISWA INTRO ============ */
export function S28_SiswaIntro() {
  return (
    <div className="slide">
      <span className="eyebrow">Modul Transaksi Siswa</span>
      <h2 className="section-title">Arsitektur Modul Siswa (CRUD Penuh)</h2>
      <p className="section-sub">
        Pusat aktivitas aplikasi pembayaran SPP. Tiga file bekerja sama mengelola data siswa
        secara terstruktur: mulai dari pendaftaran, penayangan tabel berelasi, hingga pembaruan identitas.
      </p>
      <div className="grid-3">
        <div className="card">
          <span className="tag">Create</span>
          <h4>tambah.php</h4>
          <p>
            Menyediakan formulir pendaftaran siswa baru, memuat data kelas dinamis dari database,
            dan mengeksekusi perintah INSERT berparameter lengkap dengan validasi duplikasi NIS.
          </p>
          <span className="loc">Operasi: INSERT INTO tbl_siswa</span>
        </div>
        <div className="card amber">
          <span className="tag">Read &amp; Delete</span>
          <h4>index.php</h4>
          <p>
            Menampilkan ringkasan seluruh siswa menggunakan query JOIN ke tabel kelas,
            serta memproses aksi hapus data seketika melalui parameter GET yang terproteksi.
          </p>
          <span className="loc">Operasi: SELECT JOIN + DELETE WHERE id=?</span>
        </div>
        <div className="card">
          <span className="tag">Update</span>
          <h4>edit.php</h4>
          <p>
            Membaca data lama siswa berdasarkan parameter ID untuk mengisi formulir edit otomatis,
            lalu menyimpan perubahan ke database melalui perintah UPDATE yang aman.
          </p>
          <span className="loc">Operasi: SELECT by id + UPDATE</span>
        </div>
      </div>
      <Code lang="Siklus Navigasi Pengguna" src="Siklus Lengkap Modul Siswa" style={{ marginTop: 20 }}>
        {`index.php   --(klik Tambah Siswa)-->  tambah.php  --(sukses simpan)-->  index.php (data baru tampil teratas)
index.php   --(klik Edit Siswa)---->  edit.php    --(sukses update)-->  index.php (perubahan tersimpan)
index.php   --(klik Hapus Siswa)--->  konfirmasi  --(eksekusi DELETE)--> index.php (baris terhapus)`}
      </Code>
    </div>
  )
}

/* ============ SLIDE 29 - SISWA CREATE ============ */
export function S29_SiswaCreate() {
  return (
    <div className="slide">
      <span className="eyebrow">Operasi CREATE</span>
      <h2 className="section-title">Proses Tambah Siswa (siswa/tambah.php)</h2>
      <p className="section-sub">
        Menggabungkan penarikan data kelas dinamis untuk pilihan formulir, penangkapan paket POST,
        serta eksekusi query penyimpanan dengan lima parameter data siswa.
      </p>
      <div className="split">
        <div>
          <Code lang="php" data-src="siswa/tambah.php:3-16">
            {`// 1. Ambil daftar kelas untuk dropdown formulir
$list_kelas = $pdo->query(
    "SELECT * FROM tbl_kelas ORDER BY nama_kelas ASC"
)->fetchAll(PDO::FETCH_ASSOC);

// 2. Proses data saat tombol simpan diklik
if (isset($_POST['simpan'])) {
    try {
        $sql = "INSERT INTO tbl_siswa 
                (nis, nama_siswa, id_kelas, alamat, telepon) 
                VALUES (?, ?, ?, ?, ?)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            $_POST['nis'],
            $_POST['nama_siswa'],
            $_POST['id_kelas'],
            $_POST['alamat'],
            $_POST['telepon']
        ]);
        echo "<script>alert('Siswa berhasil disimpan!');
              window.location='index.php';</script>";
    } catch (PDOException $e) {
        // Tangani error duplikasi NIS (1062)
    }
}`}
          </Code>
        </div>
        <div className="list">
          <div className="item">
            <span className="idx">1</span>
            <div className="body">
              <strong>Dropdown Dinamis Kelas</strong>
              <p>
                Sebelum form ditampilkan, file memanggil seluruh record kelas agar elemen <code>&lt;select&gt;</code> selalu
                menyajikan rombel kelas terkini yang terdaftar di database sekolah.
              </p>
            </div>
          </div>
          <div className="item">
            <span className="idx">2</span>
            <div className="body">
              <strong>Pengamanan Lima Parameter</strong>
              <p>
                Lima tanda tanya dipetakan secara teratur ke lima nilai POST. Driver PDO memisahkan data string
                sehingga karakter kutip atau simbol khusus pada alamat siswa tidak merusak struktur query SQL.
              </p>
            </div>
          </div>
          <div className="item">
            <span className="idx">3</span>
            <div className="body">
              <strong>Umpan Balik Instan ke Pengguna</strong>
              <p>
                Jika penyimpanan berhasil, skrip JavaScript memunculkan notifikasi alert sukses dan mengarahkan kembali
                peramban ke index.php agar siswa baru langsung terlihat.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ============ SLIDE 30 - SISWA READ ============ */
export function S30_SiswaRead() {
  return (
    <div className="slide">
      <span className="eyebrow">Operasi READ</span>
      <h2 className="section-title">Penayangan Data Siswa dengan SQL JOIN (siswa/index.php)</h2>
      <p className="section-sub">
        Menggabungkan tabel transaksi siswa dengan tabel referensi kelas agar data rombel dan jurusan
        dapat disajikan secara manusiawi tanpa menampilkan angka ID mentah.
      </p>
      <div className="split">
        <div>
          <Code lang="php" data-src="siswa/index.php:3-9">
            {`$sql = "SELECT tbl_siswa.*, 
               tbl_kelas.nama_kelas, 
               tbl_kelas.jurusan 
        FROM tbl_siswa 
        JOIN tbl_kelas ON tbl_siswa.id_kelas = tbl_kelas.id_kelas 
        ORDER BY tbl_siswa.id_siswa DESC";

$data_siswa = $pdo->query($sql)
                  ->fetchAll(PDO::FETCH_ASSOC);`}
          </Code>
          <div className="card" style={{ marginTop: 18 }}>
            <span className="tag">Klausa Pengurutan</span>
            <h4>ORDER BY tbl_siswa.id_siswa DESC</h4>
            <p>
              Menjamin bahwa siswa yang baru saja didaftarkan oleh petugas administrasi sekolah
              akan seketika bertengger di baris paling atas tabel, memudahkan verifikasi visual.
            </p>
          </div>
        </div>
        <div>
          <div className="card amber">
            <span className="tag">Mekanisme Relasi SQL</span>
            <h4>Klausa JOIN ... ON</h4>
            <p>
              Tabel <code>tbl_siswa</code> hanya menyimpan angka <code>id_kelas</code> (misalnya 2). Klausa JOIN
              mencocokkan angka tersebut dengan <code>tbl_kelas.id_kelas</code> sehingga nama kelas "XI RPL 2" dan jurusan
              "Rekayasa Perangkat Lunak" dapat ditarik sekaligus dalam satu kali perjalanan query yang efisien.
            </p>
          </div>
          <div className="card" style={{ marginTop: 14 }}>
            <span className="tag">Hasil Tabel Web</span>
            <h4>Format Tampilan di Peramban</h4>
            <Code lang="Struktur Baris Tabel" data-src="Antarmuka Pengguna">
              {`No | NIS  | Nama Siswa     | Kelas    | Jurusan | Aksi
1  | 1024 | Azka Hafidzha  | XI RPL 2 | RPL     | Edit | Hapus
2  | 1025 | Rifqi Arya     | XI RPL 2 | RPL     | Edit | Hapus`}
            </Code>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ============ SLIDE 31 - SISWA UPDATE ============ */
export function S31_SiswaUpdate() {
  return (
    <div className="slide">
      <span className="eyebrow">Operasi UPDATE</span>
      <h2 className="section-title">Pembaruan Data Siswa Dua Tahap (siswa/edit.php)</h2>
      <p className="section-sub">
        Alur kerja terpadu: membaca data lama berdasarkan Primary Key untuk mengisi nilai awal formulir,
        kemudian mengeksekusi instruksi UPDATE berparameter saat perubahan dikirimkan.
      </p>
      <div className="split">
        <div>
          <Code lang="php" data-src="siswa/edit.php:9-25">
            {`// TAHAP 1: Ambil data lama satu siswa
$stmt = $pdo->prepare("SELECT * FROM tbl_siswa WHERE id_siswa = ?");
$stmt->execute([$id]);
$siswa = $stmt->fetch(PDO::FETCH_ASSOC);

// TAHAP 2: Simpan perubahan data saat form disubmit
if (isset($_POST['update'])) {
    $sql = "UPDATE tbl_siswa SET 
            nis = ?, nama_siswa = ?, id_kelas = ?, 
            alamat = ?, telepon = ? 
            WHERE id_siswa = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        $_POST['nis'], $_POST['nama_siswa'],
        $_POST['id_kelas'], $_POST['alamat'],
        $_POST['telepon'], $id
    ]);
    echo "<script>alert('Data siswa diperbarui!');
          window.location='index.php';</script>";
}`}
          </Code>
        </div>
        <div className="list">
          <div className="item">
            <span className="idx">1</span>
            <div className="body">
              <strong>Prefill Formulir via $siswa</strong>
              <p>
                Nilai lama dimasukkan ke dalam atribut <code>value="&lt;?= htmlspecialchars(...) ?&gt;"</code> sehingga
                pengguna tidak perlu mengetik ulang seluruh data dari nol saat hanya ingin mengubah nomor telepon.
              </p>
            </div>
          </div>
          <div className="item">
            <span className="idx">2</span>
            <div className="body">
              <strong>Klausa Kritis WHERE id_siswa = ?</strong>
              <p>
                Wajib ada dan berparameter! Tanpa klausa WHERE, instruksi UPDATE akan menimpa seluruh baris siswa di sekolah
                dengan data yang sama, menyebabkan kehancuran database massal.
              </p>
            </div>
          </div>
          <div className="item">
            <span className="idx">3</span>
            <div className="body">
              <strong>Parameter Kunci Terakhir ($id)</strong>
              <p>
                Nilai <code>$id</code> dimasukkan sebagai elemen keenam pada array execute() untuk mengisi placeholder penutup
                pada klausa WHERE secara aman.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ============ SLIDE 32 - SISWA DELETE ============ */
export function S32_SiswaDelete() {
  return (
    <div className="slide">
      <span className="eyebrow">Operasi DELETE</span>
      <h2 className="section-title">Penghapusan Siswa dengan Konfirmasi (siswa/index.php)</h2>
      <p className="section-sub">
        Mekanisme pengamanan ganda: dialog konfirmasi di peramban klien sebelum eksekusi,
        diikuti pemrosesan perintah DELETE berparameter di dalam blok try-catch.
      </p>
      <div className="split">
        <div>
          <Code lang="php" data-src="siswa/index.php:45-55">
            {`// Tangkap parameter hapus dari URL
if (isset($_GET['hapus'])) {
    try {
        $stmt = $pdo->prepare(
            "DELETE FROM tbl_siswa WHERE id_siswa = ?"
        );
        $stmt->execute([$_GET['hapus']]);
        
        echo "<script>alert('Siswa berhasil dihapus!');
              window.location='index.php';</script>";
    } catch (PDOException $e) {
        echo "<script>alert('Gagal menghapus siswa!');</script>";
    }
}`}
          </Code>
        </div>
        <div>
          <Code lang="html" data-src="siswa/index.php:38-41">
            {`<a href="index.php?hapus=<?= $row['id_siswa']; ?>" 
   onclick="return confirm('Yakin ingin menghapus siswa ini?')">
   Hapus
</a>`}
          </Code>
          <div className="card amber" style={{ marginTop: 16 }}>
            <span className="tag">Pengaman Tingkat Klien</span>
            <h4>Event Handler onclick="return confirm(...)"</h4>
            <p>
              Saat tautan Hapus diklik, peramban memunculkan dialog konfirmasi standar berisikan tombol OK dan Batal.
              Jika pengguna memilih Batal, JavaScript mengembalikan nilai <code>false</code> dan peramban membatalkan pengiriman
              permintaan GET, sehingga data tidak terhapus akibat salah klik.
            </p>
          </div>
          <div className="card" style={{ marginTop: 14 }}>
            <span className="tag">Pembersihan URL</span>
            <h4>Redireksi ke index.php Bersih</h4>
            <p>
              Perintah <code>window.location='index.php'</code> membersihkan query string <code>?hapus=...</code> dari address bar,
              mencegah eksekusi hapus terulang kembali secara tidak sengaja jika pengguna me-refresh halaman web.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ============ SLIDE 33 - MODUL KELAS ============ */
export function S33_Kelas() {
  return (
    <div className="slide">
      <span className="eyebrow">Modul Data Master</span>
      <h2 className="section-title">Modul Data Master Kelas (tbl_kelas)</h2>
      <p className="section-sub">
        Menyediakan data referensi tahun ajaran, jurusan, dan rombel kelas yang menjadi induk bagi tabel siswa.
        Memiliki siklus CRUD mandiri tanpa ketergantungan pada tabel lain.
      </p>
      <div className="grid-3">
        <div className="card">
          <span className="tag">Create</span>
          <h4>kelas/tambah.php</h4>
          <p>Form input tiga kolom mandiri: tahun ajaran, jurusan keahlian, dan nama rombel.</p>
          <Code lang="sql" data-src="kelas/tambah.php" style={{ marginTop: 8 }}>
            {`INSERT INTO tbl_kelas 
(tahun_ajaran, jurusan, nama_kelas) 
VALUES (?, ?, ?)`}
          </Code>
        </div>
        <div className="card amber">
          <span className="tag">Read &amp; Delete</span>
          <h4>kelas/index.php</h4>
          <p>Menampilkan tabel kelas terurut DESC dan menangani penghapusan dengan proteksi Foreign Key.</p>
          <Code lang="sql" data-src="kelas/index.php" style={{ marginTop: 8 }}>
            {`SELECT * FROM tbl_kelas 
ORDER BY id_kelas DESC

DELETE FROM tbl_kelas 
WHERE id_kelas = ?`}
          </Code>
        </div>
        <div className="card">
          <span className="tag">Update</span>
          <h4>kelas/edit.php</h4>
          <p>Memperbarui identitas data master rombel kelas berdasarkan Primary Key terpilih.</p>
          <Code lang="sql" data-src="kelas/edit.php" style={{ marginTop: 8 }}>
            {`UPDATE tbl_kelas SET 
tahun_ajaran=?, jurusan=?, nama_kelas=? 
WHERE id_kelas=?`}
          </Code>
        </div>
      </div>
      <div className="grid-2" style={{ marginTop: 18 }}>
        <div className="card">
          <span className="tag">Karakteristik Data Master</span>
          <h4>Entitas Independen</h4>
          <p>
            Berbeda dengan formulir siswa yang memerlukan dropdown kelas, formulir kelas murni menggunakan
            input teks biasa karena tabel kelas tidak merujuk ke tabel lain di database sekolah.
          </p>
        </div>
        <div className="card amber">
          <span className="tag">Perlindungan Integritas</span>
          <h4>Tabel Penyangga Transaksi</h4>
          <p>
            Menjadi jangkar relasi bagi seluruh transaksi pembayaran SPP. Keberadaannya dipagari oleh aturan
            relasional database agar tidak dapat dirombak sembarangan saat kegiatan operasional sekolah berjalan.
          </p>
        </div>
      </div>
    </div>
  )
}

/* ============ SLIDE 34 - KELAS DELETE FK ============ */
export function S34_KelasDelete() {
  return (
    <div className="slide">
      <span className="eyebrow">Kasus Nyata Integritas Data</span>
      <h2 className="section-title">Proteksi Relasi Foreign Key saat Hapus Kelas</h2>
      <p className="section-sub">
        Penerapan aturan ON DELETE RESTRICT: database MySQL menolak penghapusan kelas yang masih memiliki siswa,
        lalu blok catch menyajikan pesan edukatif kepada staf sekolah.
      </p>
      <div className="split">
        <div>
          <Code lang="php" data-src="kelas/index.php:38-48">
            {`if (isset($_GET['hapus'])) {
    try {
        $stmt = $pdo->prepare(
            "DELETE FROM tbl_kelas WHERE id_kelas = ?"
        );
        $stmt->execute([$_GET['hapus']]);
        echo "<script>alert('Kelas berhasil dihapus!');
              window.location='index.php';</script>";
    } catch (PDOException $e) {
        // MySQL Error 1451: Foreign key constraint fails
        echo "<script>alert('Gagal hapus: Kelas ini masih " .
             "digunakan oleh data siswa terdaftar!'); " .
             "window.location='index.php';</script>";
    }
}`}
          </Code>
        </div>
        <div>
          <div className="flow-vertical">
            <div className="node">
              <b>1. Tindakan Pengguna</b>
              <span>Admin mengklik tombol Hapus pada kelas XI RPL 2</span>
            </div>
            <div className="node amber" style={{ marginTop: 10 }}>
              <b>2. Evaluasi MySQL InnoDB</b>
              <span>Memeriksa apakah ada baris di tbl_siswa dengan id_kelas tersebut</span>
            </div>
            <div className="node" style={{ marginTop: 10 }}>
              <b>3. Pelanggaran Constraint (Error 1451)</b>
              <span>Karena ada 36 siswa aktif, MySQL membatalkan penghapusan</span>
            </div>
            <div className="node" style={{ marginTop: 10 }}>
              <b>4. Penyelamatan Catch</b>
              <span>PDOException ditangkap dan alert penjelas dimunculkan ke admin</span>
            </div>
          </div>
          <div className="card" style={{ marginTop: 14 }}>
            <span className="tag">Manfaat Nyata di Sekolah</span>
            <h4>Mencegah Data Yatim (Orphan Records)</h4>
            <p>
              Jika kelas berhasil terhapus begitu saja, 36 siswa tersebut akan kehilangan identitas kelasnya di sistem,
              mengakibatkan laporan pembayaran SPP bulanan menjadi rusak dan tidak valid.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ============ SLIDE 35 - JAVASCRIPT ============ */
export function S35_Javascript() {
  return (
    <div className="slide">
      <span className="eyebrow">Integrasi Sisi Klien</span>
      <h2 className="section-title">Peran Skrip JavaScript pada PHP Native</h2>
      <p className="section-sub">
        Tiga fungsi utama JavaScript yang diintegrasikan langsung dari skrip PHP untuk memberikan
        interaktivitas antarmuka tanpa memerlukan pustaka frontend tambahan.
      </p>
      <div className="grid-3">
        <div className="card">
          <span className="tag">Umpan Balik</span>
          <h4>alert('Pesan')</h4>
          <p>
            Memberikan dialog informasi instan yang memblokir layar sesaat agar pengguna membaca dengan jelas
            apakah data berhasil disimpan, diperbarui, atau gagal diproses karena aturan database.
          </p>
        </div>
        <div className="card amber">
          <span className="tag">Pengalihan Klien</span>
          <h4>window.location = '...'</h4>
          <p>
            Mengarahkan peramban secara otomatis ke halaman daftar (index.php) tepat setelah tombol OK
            pada kotak dialog alert diklik oleh pengguna.
          </p>
        </div>
        <div className="card">
          <span className="tag">Pencegahan Kesalahan</span>
          <h4>return confirm('...')</h4>
          <p>
            Menyajikan kotak dialog konfirmasi berkeputusan ganda (OK / Batal) pada tautan hapus sebelum
            perintah permintaan GET benar-benar terkirim ke server web.
          </p>
        </div>
      </div>
      <div className="split" style={{ marginTop: 18 }}>
        <Code lang="php + js" data-src="Integrasi echo script">
          {`// Notifikasi hasil transaksi di backend:
echo "<script>
    alert('Siswa berhasil disimpan!');
    window.location = 'index.php';
</script>";`}
        </Code>
        <Code lang="html + js" data-src="Atribut tautan HTML">
          {`<!-- Konfirmasi sebelum request hapus dikirim: -->
<a href="index.php?hapus=<?= $row['id_siswa']; ?>" 
   onclick="return confirm('Apakah Anda yakin ingin menghapus data ini?')">
   Hapus
</a>`}
        </Code>
      </div>
    </div>
  )
}

/* ============ SLIDE 36 - HTML FORM ============ */
export function S36_HtmlForm() {
  return (
    <div className="slide">
      <span className="eyebrow">Validasi Formulir</span>
      <h2 className="section-title">Formulir HTML5 dan Atribut Validasi required</h2>
      <p className="section-sub">
        Membangun jembatan pengumpulan data yang aman antara pengguna dan mesin PHP.
        Memanfaatkan validasi bawaan peramban sebelum data dikirimkan melalui protokol POST.
      </p>
      <div className="split">
        <div>
          <Code lang="html" data-src="siswa/tambah.php:26-58">
            {`<form method="POST">
  <table>
    <tr>
      <td>NIS</td>
      <td><input type="text" name="nis" required></td>
    </tr>
    <tr>
      <td>Nama Lengkap</td>
      <td><input type="text" name="nama_siswa" required></td>
    </tr>
    <tr>
      <td>Kelas</td>
      <td>
        <select name="id_kelas" required>
          <option value="">-- Pilih Rombel Kelas --</option>
          <?php foreach ($list_kelas as $k) : ?>
            <option value="<?= $k['id_kelas']; ?>">
              <?= htmlspecialchars($k['nama_kelas']); ?>
            </option>
          <?php endforeach; ?>
        </select>
      </td>
    </tr>
  </table>
  <button type="submit" name="simpan">Simpan Siswa</button>
</form>`}
          </Code>
        </div>
        <div className="list">
          <div className="item">
            <span className="idx">1</span>
            <div className="body">
              <strong>Atribut method="POST"</strong>
              <p>Menjamin seluruh muatan formulir dikemas di dalam badan request HTTP dan tidak bocor di URL peramban.</p>
            </div>
          </div>
          <div className="item">
            <span className="idx">2</span>
            <div className="body">
              <strong>Atribut name sebagai Indeks Array</strong>
              <p>Nilai atribut name pada input menjadi kunci identitas pada array superglobal <code>$_POST['nis']</code> di server PHP.</p>
            </div>
          </div>
          <div className="item">
            <span className="idx">3</span>
            <div className="body">
              <strong>Validasi Klien dengan Atribut required</strong>
              <p>Peramban otomatis memblokir pengiriman formulir jika kotak input masih kosong atau dropdown belum dipilih, menghemat beban server.</p>
            </div>
          </div>
          <div className="item">
            <span className="idx">4</span>
            <div className="body">
              <strong>Opsi Kosong value="" pada Dropdown</strong>
              <p>Memaksa pengguna memilih kelas yang sah. Tanpa opsi kosong, peramban akan otomatis memilih kelas pertama tanpa sengaja.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ============ SLIDE 37 - ALUR SISTEM ============ */
export function S37_Alur() {
  return (
    <div className="slide">
      <span className="eyebrow">Arsitektur Alur Sistem</span>
      <h2 className="section-title">Alur Siklus Hidup Transaksi Data (Browser ke Database)</h2>
      <p className="section-sub">
        Gambaran menyeluruh alur data aplikasi pembayaran SPP: bagaimana komponen antarmuka, protokol web,
        interpreter PHP, dan mesin basis data MySQL berkomunikasi secara sinkron.
      </p>
      <div className="flow">
        <div className="node">
          <b>1. Antarmuka Klien</b>
          <span>Pengguna mengisi formulir dan menekan tombol Simpan</span>
        </div>
        <span className="arrow">&#8594;</span>
        <div className="node">
          <b>2. Protokol HTTP POST</b>
          <span>Paket data formulir dikirim ke server Apache port 80</span>
        </div>
        <span className="arrow">&#8594;</span>
        <div className="node amber">
          <b>3. Logika Backend PHP</b>
          <span>Tangkap $_POST, validasi isset(), inisialisasi query</span>
        </div>
        <span className="arrow">&#8594;</span>
        <div className="node">
          <b>4. Lapisan Keamanan PDO</b>
          <span>Kompilasi prepare() dan binding nilai execute()</span>
        </div>
        <span className="arrow">&#8594;</span>
        <div className="node">
          <b>5. Mesin MySQL</b>
          <span>Simpan record atau tolak pelanggaran constraint</span>
        </div>
        <span className="arrow">&#8594;</span>
        <div className="node">
          <b>6. Respon Peramban</b>
          <span>Alert JavaScript dan pengalihan ke index.php</span>
        </div>
      </div>
      <div className="grid-2" style={{ marginTop: 24 }}>
        <div className="card">
          <span className="tag">Siklus Pembacaan Data</span>
          <h4>Jalur Pengambilan (SELECT)</h4>
          <p>
            Modul memanggil objek $pdo, mengeksekusi query() atau prepare(), menarik sekumpulan baris
            memakai fetchAll() atau fetch(), lalu mempresentasikannya ke dokumen HTML melalui perulangan foreach.
          </p>
        </div>
        <div className="card amber">
          <span className="tag">Siklus Penulisan Data</span>
          <h4>Jalur Manipulasi (INSERT / UPDATE / DELETE)</h4>
          <p>
            Data dari form pengguna dikawal oleh prepare() berparameter, dieksekusi oleh execute() di dalam
            lingkup try-catch, dan hasilnya dikonfirmasikan kepada pengguna melalui dialog alert dan redirect.
          </p>
        </div>
      </div>
    </div>
  )
}

/* ============ SLIDE 38 - PENUTUP ============ */
export function S38_Kesimpulan() {
  return (
    <div className="slide closing-slide">
      <div className="closing-frame">
        <span className="eyebrow">Penutup</span>
        <h1 className="closing-title">
          Terima <em>Kasih</em>
        </h1>
        <p className="closing-sub">
          Sekian pemaparan teknis mengenai analisis fungsi, method, dan struktur kode
          aplikasi pembayaran SPP berbasis PHP native dan PDO. Terima kasih atas perhatian
          dan kesempatan yang telah diberikan oleh Bapak/Ibu guru serta rekan-rekan sekalian.
        </p>

        <div className="closing-3d">
          <RobotSceneLazy targetHeight={2.7} dpr={[1.5, 2]} />
        </div>

        <div className="closing-team">
          <span className="team-label">Tim Presenter Pengembang</span>
          <div className="team-grid">
            <div className="credit">
              <span className="no">Absen 07</span>
              <strong>Azka Hafidzha Putra Septo</strong>
              <span>Siswa XI RPL 2</span>
            </div>
            <div className="credit">
              <span className="no">Absen 25</span>
              <strong>Rifqi Arya Dira Fairuz</strong>
              <span>Siswa XI RPL 2</span>
            </div>
          </div>
          <p className="team-note">SMK Taruna Bangsa - Kompetensi Keahlian Rekayasa Perangkat Lunak</p>
        </div>
      </div>
    </div>
  )
}
