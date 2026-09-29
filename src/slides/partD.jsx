import React from 'react'

function Code({ lang, src, children, style }) {
  return (
    <div className="code" data-lang={lang} data-src={src} style={style}>
      <pre>{children}</pre>
    </div>
  )
}

/* ============ SLIDE 22 - SUPERGLOBAL POST GET ============ */
export function S22_Superglobal() {
  return (
    <div className="slide">
      <span className="eyebrow">Superglobal PHP</span>
      <h2 className="section-title">Variabel Superglobal: $_POST dan $_GET</h2>
      <p className="section-sub">
        Dua larik asosiatif bawaan PHP yang bertindak sebagai gerbang penerimaan data dari peramban klien.
        Pemilihannya ditentukan oleh tingkat sensitivitas data dan standar protokol HTTP.
      </p>
      <div className="grid-2">
        <div className="card">
          <span className="tag">Metode HTTP POST</span>
          <h4>$_POST: Pengiriman Tertutup &amp; Aman</h4>
          <p>
            Data dikemas di dalam badan (body) permintaan HTTP sehingga nilainya tidak tampak di address bar.
            Wajib digunakan untuk pengiriman formulir pendaftaran, pengubahan data profil, dan kolom sensitif
            seperti nomor telepon atau alamat siswa.
          </p>
          <Code lang="php" data-src="siswa/tambah.php:9-11" style={{ marginTop: 12 }}>
            {`$stmt->execute([
    $_POST['nis'],
    $_POST['nama_siswa'],
    $_POST['id_kelas']
]);`}
          </Code>
          <span className="loc">Digunakan pada: tambah.php dan proses update di edit.php</span>
        </div>
        <div className="card amber">
          <span className="tag">Metode HTTP GET</span>
          <h4>$_GET: Parameter Terbuka pada URL</h4>
          <p>
            Data dikirimkan melalui query string di bilah alamat peramban (misal: <code>index.php?hapus=5</code>).
            Sangat efisien untuk aksi navigasi cepat dan tautan tindakan langsung yang tidak membawa muatan besar.
          </p>
          <Code lang="php" data-src="siswa/edit.php:3, index.php:48" style={{ marginTop: 12 }}>
            {`$id = $_GET['id']; // Mengambil ID dari URL
$stmt->execute([$_GET['hapus']]); // Menghapus ID dari URL`}
          </Code>
          <span className="loc">Digunakan pada: edit.php?id=... dan index.php?hapus=...</span>
        </div>
      </div>
      <div className="grid-3" style={{ marginTop: 18 }}>
        <div className="card">
          <span className="tag">Kapasitas Muatan</span>
          <h4>Batasan Ukuran Data</h4>
          <p>GET dibatasi oleh panjang maksimal URL peramban (~2048 karakter), sedangkan POST dapat mengirim muatan besar tanpa batasan bilah alamat.</p>
        </div>
        <div className="card">
          <span className="tag">Riwayat Peramban</span>
          <h4>Keamanan Caching</h4>
          <p>Parameter GET tersimpan di riwayat browser dan log server, sementara data POST tidak disimpan di riwayat URL peramban.</p>
        </div>
        <div className="card">
          <span className="tag">Prinsip RESTful</span>
          <h4>Kesesuaian Aksi</h4>
          <p>Gunakan POST saat terjadi mutasi atau penulisan data baru ke database, dan gunakan GET murni untuk identifikasi target aksi.</p>
        </div>
      </div>
    </div>
  )
}

/* ============ SLIDE 23 - isset() ============ */
export function S23_Isset() {
  return (
    <div className="slide">
      <span className="eyebrow">Logika Pemrograman</span>
      <h2 className="section-title">Fungsi Pemeriksa isset()</h2>
      <p className="section-sub">
        Fungsi gerbang pengaman (guard condition) yang memeriksa apakah suatu variabel sudah dideklarasikan
        dan nilainya bukan NULL sebelum dieksekusi oleh mesin PHP.
      </p>
      <div className="split">
        <div>
          <Code lang="php" data-src="siswa/tambah.php:5, kelas/index.php:38">
            {`// Memastikan form hanya diproses saat tombol Simpan diklik
if (isset($_POST['simpan'])) {
    $stmt = $pdo->prepare("INSERT INTO tbl_siswa ...");
    $stmt->execute([...]);
}

// Memastikan query hapus hanya jalan jika ada parameter di URL
if (isset($_GET['hapus'])) {
    $stmt = $pdo->prepare("DELETE FROM tbl_siswa WHERE id_siswa = ?");
    $stmt->execute([$_GET['hapus']]);
}`}
          </Code>
          <div className="card" style={{ marginTop: 18 }}>
            <span className="tag">Pencegahan Fatal</span>
            <h4>Menghindari Warning PHP Modern</h4>
            <p>
              Pada PHP 8, mengakses indeks array yang belum ada (seperti langsung membaca <code>$_POST['simpan']</code> saat halaman
              baru dibuka) akan memicu peringatan <code>Warning: Undefined array key</code>. Fungsi <code>isset()</code> menjamin kode berjalan bersih tanpa peringatan.
            </p>
          </div>
        </div>
        <div className="list">
          <div className="item">
            <span className="idx">1</span>
            <div className="body">
              <strong>Pembeda Antara GET Halaman dan POST Data</strong>
              <p>
                Ketika form pertama kali dimuat via GET, <code>$_POST['simpan']</code> belum ada sehingga logika query dilewati dan form HTML langsung ditampilkan.
              </p>
            </div>
          </div>
          <div className="item">
            <span className="idx">2</span>
            <div className="body">
              <strong>Pemicu Tombol Tertentu</strong>
              <p>
                Nama atribut <code>name="simpan"</code> pada tombol <code>&lt;button type="submit"&gt;</code> menjadi kunci pembuktian bahwa tombol tersebut benar-benar ditekan.
              </p>
            </div>
          </div>
          <div className="item">
            <span className="idx">3</span>
            <div className="body">
              <strong>Pencegahan Eksekusi Query Kosong</strong>
              <p>
                Mencegah database server MySQL menerima query INSERT atau DELETE kosong yang tidak disengaja akibat pemuatan ulang halaman (refresh).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ============ SLIDE 24 - COALESCING ============ */
export function S24_Coalesce() {
  return (
    <div className="slide">
      <span className="eyebrow">Operator Modern PHP</span>
      <h2 className="section-title">Null Coalescing Operator (??)</h2>
      <p className="section-sub">
        Operator modern yang menyederhanakan pemeriksaan keberadaan data dan penetapan nilai cadangan (fallback)
        dalam satu baris yang bersih dan elegan.
      </p>
      <div className="split">
        <div>
          <Code lang="php" data-src="siswa/edit.php:3, kelas/edit.php:3">
            {`// Cara Modern (PHP 7+): Bersih dan Ringkas
$id = $_GET['id'] ?? null;

// Jika $_GET['id'] ada di URL, masukkan nilainya ke $id.
// Jika tidak ada di URL, isi variabel $id dengan nilai null.`}
          </Code>
          <div className="card" style={{ marginTop: 18 }}>
            <span className="tag">Perbandingan Tradisional</span>
            <h4>Cara Lama sebelum Operator (??)</h4>
            <Code lang="php" data-src="Sintaks Lama Verbose">
              {`// Cara lama yang panjang dan rawan salah ketik:
$id = isset($_GET['id']) ? $_GET['id'] : null;`}
            </Code>
            <p style={{ marginTop: 10 }}>
              Operator <code>??</code> menggantikan ternary <code>isset()</code> tanpa perlu mengetikkan nama variabel berulang kali.
            </p>
          </div>
        </div>
        <div>
          <div className="card amber">
            <span className="tag">Perilaku Sistem</span>
            <h4>Penanganan Akses Liar di URL</h4>
            <p>
              Jika siswa atau pengguna iseng membuka halaman <code>siswa/edit.php</code> secara langsung tanpa menuliskan <code>?id=1</code> di URL,
              variabel <code>$id</code> akan otomatis bernilai <code>null</code>.
            </p>
          </div>
          <div className="card" style={{ marginTop: 14 }}>
            <span className="tag">Kombinasi Kondisi</span>
            <h4>Koneksi ke Guard Clause</h4>
            <p>
              Nilai <code>null</code> tersebut langsung diuji pada baris berikutnya: <code>if (!$id)</code>. Jika kosong, sistem langsung
              menolak akses dan mengalihkan halaman kembali ke index.php demi keselamatan data.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ============ SLIDE 25 - HEADER EXIT ============ */
export function S25_HeaderExit() {
  return (
    <div className="slide">
      <span className="eyebrow">Alur Navigasi Server</span>
      <h2 className="section-title">header("Location: ...") dan Kewajiban exit</h2>
      <p className="section-sub">
        Mekanisme pengalihan halaman dari sisi server dan aturan emas pemrograman web PHP
        mengenai penghentian eksekusi latar belakang.
      </p>
      <div className="split">
        <div>
          <Code lang="php" data-src="siswa/edit.php:3-7">
            {`$id = $_GET['id'] ?? null;

// Jika parameter ID tidak ada di URL, tolak akses seketika
if (!$id) {
    header("Location: index.php");
    exit; // Wajib ditulis: hentikan eksekusi script!
}`}
          </Code>
          <div className="card" style={{ marginTop: 18 }}>
            <span className="tag">Status Protokol HTTP</span>
            <h4>HTTP Response Header 302 Found</h4>
            <p>
              Fungsi <code>header("Location: ...")</code> mengirimkan instruksi HTTP redirection ke peramban klien
              agar berpindah ke alamat tujuan sebelum halaman web sempat menampilkan konten apapun.
            </p>
          </div>
        </div>
        <div className="list">
          <div className="item">
            <span className="idx">!</span>
            <div className="body">
              <strong>Aturan Emas: Mengapa exit Mutlak Wajib?</strong>
              <p>
                Fungsi <code>header()</code> HANYA menitipkan pesan pengalihan ke peramban. Mesin PHP di server AKAN TETAP
                menjalankan baris-baris kode di bawahnya sampai file selesai jika tidak dihentikan secara paksa oleh perintah <code>exit</code>.
              </p>
            </div>
          </div>
          <div className="item">
            <span className="idx">!</span>
            <div className="body">
              <strong>Bahaya Kebocoran Data Tanpa exit</strong>
              <p>
                Tanpa perintah <code>exit</code>, kode query rahasia atau markup formulir pengeditan siswa di bawahnya tetap diproses
                dan dapat diintip oleh penyerang melalui perangkat inspeksi jaringan (curl atau Burp Suite).
              </p>
            </div>
          </div>
          <div className="item">
            <span className="idx">!</span>
            <div className="body">
              <strong>Alternatif Sisi Klien via JavaScript</strong>
              <p>
                Untuk pengalihan setelah notifikasi alert sukses, kami menggunakan <code>window.location='index.php'</code> di sisi klien
                agar pengguna sempat membaca pesan konfirmasi terlebih dahulu.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ============ SLIDE 26 - FOREACH VIEW ============ */
export function S26_Foreach() {
  return (
    <div className="slide">
      <span className="eyebrow">Tampilan Antarmuka</span>
      <h2 className="section-title">Sintaks Kontrol Alternatif: foreach dan Short Echo</h2>
      <p className="section-sub">
        Teknik pengulangan data array ke dalam baris tabel HTML menggunakan sintaks pemisah
        yang bersih, mudah dibaca, dan memisahkan logika dari dokumen markup.
      </p>
      <div className="split">
        <div>
          <Code lang="php" data-src="siswa/index.php:29-42">
            {`<?php $no = 1; ?>
<?php foreach ($data_siswa as $row) : ?>
  <tr>
    <td><?= $no++; ?></td>
    <td><?= htmlspecialchars($row['nis']); ?></td>
    <td><?= htmlspecialchars($row['nama_siswa']); ?></td>
    <td><?= htmlspecialchars($row['nama_kelas']); ?></td>
    <td>
      <a href="edit.php?id=<?= $row['id_siswa']; ?>">Edit</a>
      <a href="index.php?hapus=<?= $row['id_siswa']; ?>" 
         onclick="return confirm('Hapus siswa ini?')">Hapus</a>
    </td>
  </tr>
<?php endforeach; ?>`}
          </Code>
        </div>
        <div>
          <div className="card">
            <span className="tag">Keterbacaan Template</span>
            <h4>Sintaks foreach : endforeach</h4>
            <p>
              Menggantikan kurung kurawal buka-tutup ({`{ }`}) dengan titik dua (:) dan <code>endforeach;</code>.
              Sintaks ini sangat disukai dalam standar pengkodean profesional karena batas awal dan akhir blok pengulangan
              terlihat sangat jelas saat bercampur dengan puluhan baris tag HTML <code>&lt;tr&gt;</code> dan <code>&lt;td&gt;</code>.
            </p>
          </div>
          <div className="card amber" style={{ marginTop: 14 }}>
            <span className="tag">Pencetakan Ringkas</span>
            <h4>Tag Echo Pendek (&lt;?= ?&gt;)</h4>
            <p>
              Sintaks <code>&lt;?= $nilai; ?&gt;</code> adalah singkatan resmi dari <code>&lt;?php echo $nilai; ?&gt;</code>.
              Membuat template tabel lebih bersih, menghemat ruang visual, dan sejak PHP 5.4 sudah menjadi standar permanen
              di seluruh server web.
            </p>
          </div>
          <div className="card" style={{ marginTop: 14 }}>
            <span className="tag">Nomor Urut Dinamis</span>
            <h4>Variabel Counter $no++</h4>
            <p>
              Menampilkan nomor urut visual tabel (1, 2, 3...) yang independen dari Primary Key <code>id_siswa</code>,
              sehingga urutan nomor tampilan selalu rapi meskipun ada baris data siswa yang sebelumnya telah dihapus.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ============ SLIDE 27 - TERNARY ============ */
export function S27_Ternary() {
  return (
    <div className="slide">
      <span className="eyebrow">Logika Kondisi</span>
      <h2 className="section-title">Operator Ternary untuk Seleksi Dropdown Kelas</h2>
      <p className="section-sub">
        Bentuk ringkas evaluasi kondisi if-else dalam satu ekspresi untuk menandai opsi kelas
        yang sedang aktif dimiliki oleh siswa pada formulir edit.
      </p>
      <div className="split">
        <div>
          <Code lang="php" data-src="siswa/edit.php:48">
            {`// Di dalam perulangan daftar opsi kelas:
$selected = ($k['id_kelas'] == $siswa['id_kelas']) ? 'selected' : '';

// Dicetak ke dalam elemen option HTML:
<option value="<?= $k['id_kelas']; ?>" <?= $selected; ?>>
  <?= htmlspecialchars($k['nama_kelas']); ?>
</option>`}
          </Code>
          <div className="card" style={{ marginTop: 18 }}>
            <span className="tag">Struktur Logika</span>
            <h4>Pola Dasar Operator Ternary</h4>
            <Code lang="Struktur Sintaks" data-src="Rumus Operator">
              {`kondisi_evaluasi ? nilai_jika_benar : nilai_jika_salah;`}
            </Code>
            <p style={{ marginTop: 10 }}>
              Jika ID kelas pada opsi saat ini sama dengan ID kelas milik data siswa lama, cetak teks atribut <code>selected</code>.
              Jika tidak sama, cetak string kosong.
            </p>
          </div>
        </div>
        <div>
          <div className="card amber">
            <span className="tag">Hasil di Browser</span>
            <h4>Dokumen HTML yang Diterima Klien</h4>
            <Code lang="html" data-src="Output Peramban">
              {`<select name="id_kelas" required>
  <option value="1">X RPL 1</option>
  <option value="2" selected>XI RPL 2</option>
  <option value="3">XII RPL 1</option>
</select>`}
            </Code>
            <p style={{ marginTop: 10 }}>
              Peramban membaca atribut <code>selected</code> dan secara otomatis menampilkan "XI RPL 2" sebagai kelas terpilih di layar.
            </p>
          </div>
          <div className="card" style={{ marginTop: 14 }}>
            <span className="tag">Integritas Data</span>
            <h4>Mencegah Perubahan Kelas Tidak Sengaja</h4>
            <p>
              Tanpa logika ternary ini, dropdown akan selalu reset memilih kelas paling atas (X RPL 1).
              Jika admin hanya berniat mengedit nomor telepon lalu menekan simpan, data kelas siswa bisa tertimpa
              secara salah tanpa disadari.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
