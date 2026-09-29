import React from 'react'

function Code({ lang, src, children, style }) {
  return (
    <div className="code" data-lang={lang} data-src={src} style={style}>
      <pre>{children}</pre>
    </div>
  )
}

/* ============ SLIDE 14 - PETA METHOD PDO ============ */
export function S14_PetaPdo() {
  return (
    <div className="slide">
      <span className="eyebrow">Query &amp; Keamanan</span>
      <h2 className="section-title">Empat Method Inti PDO</h2>
      <p className="section-sub">
        Seluruh proses pengolahan data pada aplikasi pembayaran SPP ini bersandar pada empat method inti.
        Dua method bertindak sebagai eksekutor perintah, dan dua method bertindak sebagai penarik hasil ke memori.
      </p>
      <div className="grid-2">
        <div className="card">
          <span className="tag">Eksekutor Statis</span>
          <h4>$pdo-&gt;query()</h4>
          <p>
            Mengeksekusi perintah SQL secara langsung tanpa parameter tambahan. Digunakan murni untuk
            perintah statis seperti menampilkan daftar seluruh kelas tanpa filter masukan pengguna.
          </p>
          <span className="loc">Skenario: SELECT * FROM tbl_kelas</span>
        </div>
        <div className="card amber">
          <span className="tag">Eksekutor Aman Berparameter</span>
          <h4>prepare() + execute()</h4>
          <p>
            Dua tahap pengamanan: prepare() menyusun cetak biru query dengan placeholder (?), lalu execute()
            mengirimkan nilai data riil secara terpisah. Wajib dipakai untuk INSERT, UPDATE, dan DELETE.
          </p>
          <span className="loc">Skenario: Operasi tulis data siswa &amp; kelas</span>
        </div>
        <div className="card">
          <span className="tag">Penarik Multi-Record</span>
          <h4>fetchAll(PDO::FETCH_ASSOC)</h4>
          <p>
            Menarik seluruh baris hasil query dari server MySQL ke dalam memori PHP sebagai array asosiatif
            dua dimensi. Ideal untuk kebutuhan tabel daftar siswa dan dropdown pilihan kelas.
          </p>
          <span className="loc">Skenario: Daftar data di index.php</span>
        </div>
        <div className="card">
          <span className="tag">Penarik Record Tunggal</span>
          <h4>fetch(PDO::FETCH_ASSOC)</h4>
          <p>
            Menarik tepat satu baris record pertama yang cocok. Menghemat alokasi memori server saat
            menampilkan data spesifik siswa berdasarkan Primary Key pada formulir edit.
          </p>
          <span className="loc">Skenario: Form edit data siswa di edit.php</span>
        </div>
      </div>
      <Code lang="Pola Umum Standar PDO" src="Arsitektur Query Aman" style={{ marginTop: 20 }}>
        {`$stmt = $pdo->prepare("SELECT * FROM tbl_siswa WHERE nis = ?");   // 1. Siapkan cetak biru query berparameter
$stmt->execute([$nis]);                                            // 2. Kirim nilai melalui array terpisah
$siswa = $stmt->fetch(PDO::FETCH_ASSOC);                           // 3. Ambil satu record hasil ke memori PHP`}
      </Code>
    </div>
  )
}

/* ============ SLIDE 15 - query() ============ */
export function S15_Query() {
  return (
    <div className="slide">
      <span className="eyebrow">Method Eksekusi</span>
      <h2 className="section-title">Method $pdo-&gt;query()</h2>
      <p className="section-sub">
        Mengeksekusi pernyataan SQL statis dalam satu langkah. Sangat cepat dan efisien,
        tetapi memiliki batasan keamanan yang ketat mengenai asal-usul data query.
      </p>
      <div className="split">
        <div>
          <Code lang="php" data-src="kelas/index.php:3">
            {`$data_kelas = $pdo
    ->query("SELECT * FROM tbl_kelas ORDER BY id_kelas DESC")
    ->fetchAll(PDO::FETCH_ASSOC);`}
          </Code>
          <div className="card" style={{ marginTop: 18 }}>
            <span className="tag">Aturan Penggunaan</span>
            <h4>Kapan query() Boleh Digunakan?</h4>
            <p>
              Hanya digunakan saat string query 100% ditulis oleh programmer dan sama sekali tidak
              melibatkan variabel dinamis dari pengguna ($_POST atau $_GET). Contohnya: menampilkan
              seluruh isi tabel kelas untuk monitoring admin sekolah.
            </p>
          </div>
        </div>
        <div>
          <div className="card amber">
            <span className="tag">Analisis SQL</span>
            <h4>Klausa ORDER BY id_kelas DESC</h4>
            <p>
              Perintah DESC (descending) menginstruksikan MySQL untuk mengurutkan hasil dari angka ID terbesar.
              Dengan demikian, kelas yang baru saja diinputkan oleh staf tata usaha sekolah akan langsung
              muncul di baris paling atas tabel tanpa perlu memuat ulang seluruh halaman.
            </p>
          </div>
          <div className="card" style={{ marginTop: 14 }}>
            <span className="tag">Peringatan Keamanan</span>
            <h4>Batasan Keras</h4>
            <p>
              DILARANG KERAS menggabungkan variabel pengguna ke dalam method query() menggunakan titik (.)
              karena akan membuka celah SQL Injection fatal. Jika query membutuhkan parameter, wajib beralih
              ke method prepare().
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ============ SLIDE 16 - prepare() ============ */
export function S16_Prepare() {
  return (
    <div className="slide">
      <span className="eyebrow">Keamanan Query</span>
      <h2 className="section-title">Method $pdo-&gt;prepare() dan Konsep Placeholder</h2>
      <p className="section-sub">
        Pondasi utama keamanan aplikasi modern. Memisahkan kompilasi logika perintah SQL
        dari data masukan pengguna menggunakan simbol tanda tanya (?) sebagai penampung parameter.
      </p>
      <div className="split">
        <div>
          <Code lang="php" data-src="siswa/tambah.php:7-9">
            {`$sql = "INSERT INTO tbl_siswa
    (nis, nama_siswa, id_kelas, alamat, telepon)
    VALUES (?, ?, ?, ?, ?)";

// Kirim struktur query ke MySQL server terlebih dahulu
$stmt = $pdo->prepare($sql);`}
          </Code>
          <div className="card" style={{ marginTop: 18 }}>
            <span className="tag">Mekanisme Database</span>
            <h4>Kompilasi Execution Plan</h4>
            <p>
              Saat prepare() dipanggil, MySQL mengurai sintaks SQL dan menyusun rencana eksekusi
              (execution plan) terlebih dahulu. Struktur query terkunci permanen di memori database,
              sehingga karakter apapun yang nanti dikirimkan tidak akan pernah bisa mengubah arti query.
            </p>
          </div>
        </div>
        <div className="list">
          <div className="item">
            <span className="idx">1</span>
            <div className="body">
              <strong>Simbol Tanda Tanya (?) sebagai Placeholder</strong>
              <p>
                Tanda tanya mewakili titik data dinamis. Di baris ini ada lima tanda tanya yang mewakili
                kolom nis, nama, kelas, alamat, dan nomor telepon siswa.
              </p>
            </div>
          </div>
          <div className="item">
            <span className="idx">2</span>
            <div className="body">
              <strong>Objek Pengembali PDOStatement</strong>
              <p>
                Method prepare() menghasilkan objek baru bertipe PDOStatement (disimpan di $stmt)
                yang siap menerima parameter dan dieksekusi berulang kali.
              </p>
            </div>
          </div>
          <div className="item">
            <span className="idx">3</span>
            <div className="body">
              <strong>Pencegahan Manipulasi Sintaks</strong>
              <p>
                Meskipun penyerang mengetikkan tanda kutip atau kode SQL jahat pada form NIS, MySQL
                tetap menganggapnya murni sebagai data string biasa, bukan perintah database.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ============ SLIDE 17 - execute() ============ */
export function S17_Execute() {
  return (
    <div className="slide">
      <span className="eyebrow">Keamanan Query</span>
      <h2 className="section-title">Method $stmt-&gt;execute() dan Parameter Binding</h2>
      <p className="section-sub">
        Mengirimkan nilai riil dari formulir pengguna ke server database melalui array terindeks,
        di mana driver PDO secara otomatis melakukan sanitasi dan konversi tipe data.
      </p>
      <div className="split">
        <div>
          <Code lang="php" data-src="siswa/tambah.php:9-11">
            {`$stmt->execute([
    $_POST['nis'],         // Mengisi tanda tanya ke-1
    $_POST['nama_siswa'],  // Mengisi tanda tanya ke-2
    $_POST['id_kelas'],    // Mengisi tanda tanya ke-3
    $_POST['alamat'],      // Mengisi tanda tanya ke-4
    $_POST['telepon']      // Mengisi tanda tanya ke-5
]);`}
          </Code>
          <div className="card" style={{ marginTop: 18 }}>
            <span className="tag">Aturan Emas</span>
            <h4>Kesesuaian Urutan dan Jumlah Parameter</h4>
            <p>
              Urutan elemen di dalam array wajib sama persis dengan urutan tanda tanya di query prepare.
              Jika jumlah nilai tidak cocok dengan jumlah tanda tanya, PDO seketika melempar exception fatal.
            </p>
          </div>
        </div>
        <div>
          <div className="card">
            <span className="tag">Proses di Balik Layar</span>
            <h4>Binding Data Otomatis oleh Driver</h4>
            <p>
              Driver PDO mengirimkan data array melalui kanal terpisah (out-of-band data transmission).
              Nilai string secara otomatis di-escape dan di-quote dengan aman oleh driver tanpa campur tangan manual programmer.
            </p>
          </div>
          <div className="card amber" style={{ marginTop: 14 }}>
            <span className="tag">Nilai Kembalian</span>
            <h4>Status Eksekusi Boolean</h4>
            <p>
              Method execute() mengembalikan nilai boolean true jika query berhasil disimpan ke tabel,
              atau melempar PDOException jika terjadi pelanggaran aturan database (misalnya duplikasi NIS atau tipe data tidak valid).
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ============ SLIDE 18 - fetchAll() ============ */
export function S18_FetchAll() {
  return (
    <div className="slide">
      <span className="eyebrow">Pengambilan Data</span>
      <h2 className="section-title">Method fetchAll(PDO::FETCH_ASSOC)</h2>
      <p className="section-sub">
        Menarik seluruh kumpulan baris hasil query dari server MySQL ke dalam memori PHP
        menjadi struktur array asosiatif dua dimensi yang siap ditampilkan ke tabel web.
      </p>
      <div className="split">
        <div>
          <Code lang="php" data-src="siswa/index.php:5-7">
            {`$sql = "SELECT tbl_siswa.*, tbl_kelas.nama_kelas 
        FROM tbl_siswa 
        JOIN tbl_kelas ON tbl_siswa.id_kelas = tbl_kelas.id_kelas";

$data_siswa = $pdo->query($sql)
                  ->fetchAll(PDO::FETCH_ASSOC);`}
          </Code>
          <div className="card" style={{ marginTop: 18 }}>
            <span className="tag">Penggunaan Utama</span>
            <h4>Dasar Pengisian Tabel Antarmuka</h4>
            <p>
              Variabel $data_siswa yang dihasilkan langsung diteruskan ke template HTML untuk di-looping
              menggunakan foreach, menghasilkan deretan baris &lt;tr&gt; pada daftar siswa sekolah.
            </p>
          </div>
        </div>
        <div>
          <Code lang="Struktur Data di Memori PHP" data-src="Array Asosiatif 2D">
            {`[
  0 => [
    "id_siswa"   => 1,
    "nis"        => "1024",
    "nama_siswa" => "Azka Hafidzha",
    "nama_kelas" => "XI RPL 2"
  ],
  1 => [
    "id_siswa"   => 2,
    "nis"        => "1025",
    "nama_siswa" => "Rifqi Arya",
    "nama_kelas" => "XI RPL 2"
  ]
]`}
          </Code>
        </div>
      </div>
      <div className="grid-3" style={{ marginTop: 18 }}>
        <div className="card">
          <span className="tag">Konstanta Default</span>
          <h4>PDO::FETCH_ASSOC</h4>
          <p>Kunci array berupa string nama kolom tabel ($row['nama_siswa']). Sangat bersih dan mudah dibaca.</p>
        </div>
        <div className="card">
          <span className="tag">Opsi Angka</span>
          <h4>PDO::FETCH_NUM</h4>
          <p>Kunci array berupa angka urut ($row[0], $row[1]). Kurang fleksibel jika urutan kolom di SQL berubah.</p>
        </div>
        <div className="card">
          <span className="tag">Opsi Objek</span>
          <h4>PDO::FETCH_OBJ</h4>
          <p>Mengembalikan objek standar PHP (stdClass), diakses memakai operator panah ($row-&gt;nama_siswa).</p>
        </div>
      </div>
    </div>
  )
}

/* ============ SLIDE 19 - fetch() ============ */
export function S19_Fetch() {
  return (
    <div className="slide">
      <span className="eyebrow">Pengambilan Data</span>
      <h2 className="section-title">Method fetch(PDO::FETCH_ASSOC) untuk Record Tunggal</h2>
      <p className="section-sub">
        Mengambil tepat satu baris data pertama dari hasil query. Sangat efisien untuk halaman edit
        dan detail karena menghemat pemakaian memori server.
      </p>
      <div className="split">
        <div>
          <Code lang="php" data-src="siswa/edit.php:9-13">
            {`// 1. Ambil data satu siswa berdasarkan Primary Key
$stmt = $pdo->prepare("SELECT * FROM tbl_siswa WHERE id_siswa = ?");
$stmt->execute([$id]);

// 2. Ambil tepat satu baris record tunggal
$siswa = $stmt->fetch(PDO::FETCH_ASSOC);

// 3. Jika ID tidak ada, $siswa bernilai false`}
          </Code>
          <Code lang="html" data-src="siswa/edit.php:Formulir Edit" style={{ marginTop: 14 }}>
            {`<input type="text" name="nama_siswa" 
       value="<?= htmlspecialchars($siswa['nama_siswa']); ?>" required>`}
          </Code>
        </div>
        <div className="list">
          <div className="item">
            <span className="idx">1</span>
            <div className="body">
              <strong>Efisiensi Memori Server</strong>
              <p>
                Karena query WHERE id_siswa = ? hanya menghasilkan satu record unik, memanggil fetch()
                jauh lebih efisien daripada fetchAll() karena tidak perlu membuat array pembungkus tingkat luar.
              </p>
            </div>
          </div>
          <div className="item">
            <span className="idx">2</span>
            <div className="body">
              <strong>Kursor Internal Satu Arah</strong>
              <p>
                Setiap kali fetch() dipanggil, kursor pointer internal MySQL bergeser ke baris berikutnya.
                Jika baris habis atau data tidak ditemukan, method ini mengembalikan nilai boolean false.
              </p>
            </div>
          </div>
          <div className="item">
            <span className="idx">3</span>
            <div className="body">
              <strong>Pengisian Nilai Awal Form (Prefill)</strong>
              <p>
                Data hasil fetch ditampung ke array satu dimensi $siswa, lalu dicetak langsung ke dalam
                atribut value tag input HTML sehingga formulir otomatis terisi data lama siswa.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ============ SLIDE 20 - PREPARED STATEMENT ============ */
export function S20_Prepared() {
  return (
    <div className="slide">
      <span className="eyebrow">Keamanan Komputasi</span>
      <h2 className="section-title">Bedah Keamanan: Prepared Statement vs Query Rentan</h2>
      <p className="section-sub">
        Perbandingan langsung antara cara penulisan kode rentan yang rawan manipulasi peretas
        dengan standar keamanan industri parameterized query pada aplikasi SPP.
      </p>
      <div className="grid-2">
        <div className="card">
          <span className="tag">Pola Berbahaya</span>
          <h4>Query Konkatenasi String (Rentan SQLi)</h4>
          <Code lang="php" data-src="Pola Rentan Serangan" style={{ marginTop: 12 }}>
            {`$nis = $_GET['nis']; // Contoh input: ' OR '1'='1
$sql = "SELECT * FROM tbl_siswa WHERE nis = '" . $nis . "'";
$pdo->query($sql);`}
          </Code>
          <p style={{ marginTop: 12 }}>
            Input pengguna langsung disambung menjadi bagian dari instruksi SQL. Karakter kutip satu (')
            dari penyerang memecah sintaks asli dan menyuntikkan logika OR 1=1, sehingga seluruh data rahasia
            sekolah terbongkar.
          </p>
        </div>
        <div className="card amber">
          <span className="tag">Pola Standar Proyek SPP</span>
          <h4>Prepared Statement PDO (Aman 100%)</h4>
          <Code lang="php" data-src="siswa/tambah.php, edit.php" style={{ marginTop: 12 }}>
            {`$stmt = $pdo->prepare("SELECT * FROM tbl_siswa WHERE nis = ?");
$stmt->execute([$_GET['nis']]);
$siswa = $stmt->fetch(PDO::FETCH_ASSOC);`}
          </Code>
          <p style={{ marginTop: 12 }}>
            Query dikompilasi terlebih dahulu di server MySQL. Nilai input $_GET['nis'] dikirimkan secara
            terpisah dan dipaksa murni sebagai data string netral, sehingga tanda kutip penyerang tidak akan
            pernah dieksekusi sebagai perintah.
          </p>
        </div>
      </div>
      <div className="grid-3" style={{ marginTop: 20 }}>
        <div className="card">
          <span className="tag">Definisi Serangan</span>
          <h4>SQL Injection (SQLi)</h4>
          <p>Teknik eksploitasi di mana penyerang menyisipkan perintah SQL ilegal melalui input formulir atau URL.</p>
        </div>
        <div className="card">
          <span className="tag">Perlindungan Bawaan</span>
          <h4>Netralisasi Karakter Kutip</h4>
          <p>Driver PDO membungkus nilai parameter secara otomatis sehingga kutip penyerang tidak merusak sintaks database.</p>
        </div>
        <div className="card">
          <span className="tag">Integritas Sekolah</span>
          <h4>Kerahasiaan Data SPP</h4>
          <p>Menjamin riwayat transaksi pembayaran dan data pribadi siswa terlindungi secara aman dari upaya peretasan.</p>
        </div>
      </div>
    </div>
  )
}

/* ============ SLIDE 21 - htmlspecialchars() ============ */
export function S21_Htmlspecialchars() {
  return (
    <div className="slide">
      <span className="eyebrow">Keamanan Antarmuka</span>
      <h2 className="section-title">Proteksi Celah XSS dengan htmlspecialchars()</h2>
      <p className="section-sub">
        Mensterilkan data sebelum dicetak ke layar peramban agar karakter kode HTML dan skrip JavaScript
        tidak dieksekusi sembarangan oleh browser klien.
      </p>
      <div className="split">
        <div>
          <Code lang="php" data-src="kelas/index.php:27-29, siswa/index.php">
            {`// Cetak nama kelas dengan pengamanan entitas HTML
<td><?= htmlspecialchars($row['nama_kelas']); ?></td>

// Jika admin nakal memasukkan nama:
// <script>alert('Hacked')</script>
// Fungsi ini mengubahnya menjadi teks biasa di browser.`}
          </Code>
          <div className="card" style={{ marginTop: 18 }}>
            <span className="tag">Daftar Konversi Entitas</span>
            <h4>Karakter Khusus yang Dinetralisir</h4>
            <div className="list tight" style={{ marginTop: 10 }}>
              <div className="item">
                <span className="idx">&lt;</span>
                <div className="body">
                  <p>Diubah menjadi <code>&amp;lt;</code> (mencegah pembukaan tag script HTML)</p>
                </div>
              </div>
              <div className="item">
                <span className="idx">&gt;</span>
                <div className="body">
                  <p>Diubah menjadi <code>&amp;gt;</code> (mencegah penutupan tag HTML)</p>
                </div>
              </div>
              <div className="item">
                <span className="idx">&amp;</span>
                <div className="body">
                  <p>Diubah menjadi <code>&amp;amp;</code> (menghindari penafsiran entitas ganda)</p>
                </div>
              </div>
              <div className="item">
                <span className="idx">&quot;</span>
                <div className="body">
                  <p>Diubah menjadi <code>&amp;quot;</code> (mencegah penutupan atribut value form)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="card amber">
            <span className="tag">Ancaman Nyata</span>
            <h4>Cross-Site Scripting (XSS)</h4>
            <p>
              Serangan di mana kode JavaScript jahat disuntikkan ke database melalui form input.
              Ketika data tersebut dibuka oleh guru atau admin lain, skrip jahat tersebut otomatis berjalan
              di browser korban dan dapat mencuri session cookie login.
            </p>
          </div>
          <div className="card" style={{ marginTop: 14 }}>
            <span className="tag">Waktu Eksekusi</span>
            <h4>Kapan htmlspecialchars() Harus Dipanggil?</h4>
            <p>
              Tepat pada saat mencetak data ke dokumen HTML (view layer). Data di dalam tabel database
              tetap tersimpan apa adanya secara bersih, sedangkan sterilisasi hanya dilakukan saat
              data hendak dipresentasikan ke layar pengguna.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
