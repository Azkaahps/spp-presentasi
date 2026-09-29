import React from 'react'
import { RobotSceneLazy } from '../components/RobotSceneLazy.jsx'

/* ============ SLIDE 1 - TITLE ============ */
export function S01_Title() {
  return (
    <div className="slide title-slide">
      <div className="title-grid">
        <div className="title-copy">
          <span className="eyebrow">Presentasi Teknis PHP Native</span>
          <h1>
            Aplikasi
            <br />
            Pembayaran <em>SPP</em>
          </h1>
          <p>
            Analisis fungsi, method, dan struktur kode pada website CRUD PHP
            native berbasis PDO. Disusun berurutan dari koneksi database sampai
            alur pengelolaan data siswa dan kelas.
          </p>
          <div className="stats">
            <div className="st">
              <dt>Total File</dt>
              <dd>
                9 <b>file</b>
              </dd>
            </div>
            <div className="st">
              <dt>Modul</dt>
              <dd>
                2 <b>modul</b>
              </dd>
            </div>
            <div className="st">
              <dt>Tabel</dt>
              <dd>
                2 <b>tabel</b>
              </dd>
            </div>
            <div className="st">
              <dt>Teknik</dt>
              <dd>
                <b>PDO</b> Prepared
              </dd>
            </div>
          </div>
          <p className="kicker" style={{ marginTop: 26 }}>
            Presentasi Berpasangan / Kelas XI RPL 2 / SMK Taruna Bangsa
          </p>
          <div className="credits">
            <div className="credit">
              <span className="no">Absen 07</span>
              <strong>Azka Hafidzha Putra Septo</strong>
              <span>XI RPL 2</span>
            </div>
            <span className="amp">&amp;</span>
            <div className="credit">
              <span className="no">Absen 25</span>
              <strong>Rifqi Arya Dira Fairuz</strong>
              <span>XI RPL 2</span>
            </div>
          </div>
        </div>
        <div className="title-stage">
          <RobotSceneLazy />
        </div>
      </div>
    </div>
  )
}

/* ============ SLIDE 2 - AGENDA ============ */
export function S02_Agenda() {
  const items = [
    [
      'Pendahuluan & Arsitektur',
      'Latar belakang sistem SPP, tujuan modularitas kode, struktur folder, dan skema database relasional.',
    ],
    [
      'Koneksi Database & Error Handling',
      'Mekanisme konstruktor new PDO, konfigurasi ERRMODE_EXCEPTION, try-catch, dan fungsi pemutus die().',
    ],
    [
      'Query & Keamanan Database',
      'Analisis method query(), prepare(), execute(), fetchAll(), fetch(), serta netralisasi SQL Injection.',
    ],
    [
      'Superglobal & Logika PHP',
      'Pengelolaan $_POST, $_GET, validasi isset(), null coalescing (??), dan pengamanan redirect exit.',
    ],
    [
      'Pembedahan Modul Siswa (CRUD)',
      'Alur lengkap simpan data, query JOIN tabel kelas, pembaruan record, dan konfirmasi hapus.',
    ],
    [
      'Pembedahan Modul Kelas (Data Master)',
      'Manajemen referensi rombel kelas, aturan relasi Foreign Key, dan proteksi ON DELETE RESTRICT.',
    ],
    [
      'Validasi, Alur Sistem & Tanya Jawab',
      'Penanganan error 1062 duplicate entry, validasi form HTML5, siklus data menyeluruh, dan diskusi.',
    ],
  ]
  return (
    <div className="slide">
      <span className="eyebrow">Agenda Presentasi</span>
      <h2 className="section-title">Urutan Pembahasan Teknis</h2>
      <p className="section-sub">
        Materi disusun secara sistematis mengikuti alur eksekusi aplikasi web,
        mulai dari inisialisasi koneksi hingga rendering antarmuka di peramban.
      </p>
      <div className="list">
        {items.map((it, i) => (
          <div className="item" key={i}>
            <span className="idx">{String(i + 1).padStart(2, '0')}</span>
            <div className="body">
              <strong>{it[0]}</strong>
              <p>{it[1]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ============ SLIDE 3 - OVERVIEW APLIKASI ============ */
export function S03_Overview() {
  return (
    <div className="slide">
      <span className="eyebrow">Gambaran Umum</span>
      <h2 className="section-title">Arsitektur dan Komponen Sistem</h2>
      <p className="section-sub">
        Aplikasi pengelolaan data pembayaran SPP berbasis web yang dibangun murni
        menggunakan PHP native dan database MySQL tanpa ketergantungan framework.
      </p>
      <div className="grid-4">
        <div className="card">
          <span className="tag">Entitas Utama</span>
          <h4>Modul Siswa</h4>
          <p>
            Mengelola data transaksi siswa, nomor induk unik (NIS), kontak wali, dan penugasan kelas.
            Dilengkapi validasi duplikasi NIS dan dropdown dinamis.
          </p>
        </div>
        <div className="card">
          <span className="tag">Data Master</span>
          <h4>Modul Kelas</h4>
          <p>
            Menyediakan data referensi tahun ajaran, jurusan keahlian, dan nama rombel.
            Menjadi tabel induk yang dirujuk oleh seluruh data siswa.
          </p>
        </div>
        <div className="card">
          <span className="tag">Integritas Data</span>
          <h4>MySQL Relasional</h4>
          <p>
            Dua tabel dihubungkan oleh Foreign Key dengan aturan integritas referensial.
            Mencegah inkonsistensi data jika kelas yang aktif coba dihapus.
          </p>
        </div>
        <div className="card">
          <span className="tag">Keamanan Backend</span>
          <h4>PDO Prepared</h4>
          <p>
            Akses basis data mengandalkan parameterized query asli untuk menjamin proteksi total
            terhadap serangan SQL Injection dari formulir input.
          </p>
        </div>
      </div>
      <div className="code" data-lang="Teknologi yang Digunakan" style={{ marginTop: 24 }}>
        <pre>{`Frontend  : HTML5 + CSS3 murni + JavaScript sisi klien (alert, confirm, navigasi)
Backend   : PHP Native versi 8 (berorientasi objek via PDO, tanpa framework pihak ketiga)
Database  : MySQL / MariaDB dengan engine InnoDB (mendukung Foreign Key & Transaksi)
Server    : Lingkungan Laragon (Web Server Apache 2.4 + MySQL 5.7/8.0 port 3306)`}</pre>
      </div>
    </div>
  )
}

/* ============ SLIDE 4 - TUJUAN & MANFAAT ============ */
export function S04_Tujuan() {
  return (
    <div className="slide">
      <span className="eyebrow">Tujuan Arsitektur</span>
      <h2 className="section-title">Mengapa Struktur Ini Dipilih</h2>
      <div className="split" style={{ marginTop: 8 }}>
        <div className="list">
          <div className="item">
            <span className="idx">1</span>
            <div className="body">
              <strong>Koneksi Terpusat (Single Source of Truth)</strong>
              <p>
                Seluruh file modul mengimpor satu file konfigurasi di config/koneksi.php.
                Jika terjadi perubahan host atau kredensial database di sekolah, programmer cukup
                mengubah satu baris tanpa menyentuh modul lainnya.
              </p>
            </div>
          </div>
          <div className="item">
            <span className="idx">2</span>
            <div className="body">
              <strong>Standar Keamanan Sejak Desain (Security by Design)</strong>
              <p>
                Menolak penggabungan string (concatenation) pada query SQL untuk mencegah SQL Injection,
                serta menyaring output ke layar menggunakan fungsi sanitasi untuk mencegah celah XSS.
              </p>
            </div>
          </div>
          <div className="item">
            <span className="idx">3</span>
            <div className="body">
              <strong>Pemisahan Logika dan Tampilan (Separation of Concerns)</strong>
              <p>
                Blok pemrosesan PHP (validasi form, eksekusi query, redirect) selalu diletakkan di bagian paling atas,
                sedangkan markup form HTML diletakkan di bawah agar kode bersih dan mudah dirawat.
              </p>
            </div>
          </div>
        </div>
        <div className="code" data-lang="php" style={{ height: '100%' }}>
          <pre>{`<?php
// 1. Impor konfigurasi koneksi sentral
require_once '../config/koneksi.php';

// 2. Eksekusi query menggunakan objek $pdo bersama
$stmt = $pdo->prepare("SELECT * FROM tbl_siswa WHERE id_kelas = ?");
$stmt->execute([$id_kelas]);
$data = $stmt->fetchAll(PDO::FETCH_ASSOC);

// 3. Logika PHP selesai, data siap dirender ke HTML di bawah
?>`}</pre>
        </div>
      </div>
    </div>
  )
}

/* ============ SLIDE 5 - STRUKTUR FOLDER ============ */
export function S05_Struktur() {
  return (
    <div className="slide">
      <span className="eyebrow">Struktur Proyek</span>
      <h2 className="section-title">Peta Organisasi File Aplikasi</h2>
      <p className="section-sub">
        Sembilan file kerja dikelompokkan secara terstruktur berdasarkan fungsinya:
        konfigurasi terpusat, modul transaksi siswa, dan modul master kelas.
      </p>
      <div className="split">
        <div className="tree">
          <div>
            <span className="dir">AZKA_HSP_SPP/</span>
          </div>
          <div>
            {' '}
            ├─ <span className="fil">index.php</span>{' '}
            <span className="note"># Menu utama navigasi antar modul</span>
          </div>
          <div>
            {' '}
            ├─ <span className="dir">config/</span>
          </div>
          <div>
            {' '}
            │&nbsp;&nbsp;&nbsp;└─ <span className="fil">koneksi.php</span>{' '}
            <span className="note"># Inisialisasi PDO dan error handler</span>
          </div>
          <div>
            {' '}
            ├─ <span className="dir">DB/</span>
          </div>
          <div>
            {' '}
            │&nbsp;&nbsp;&nbsp;└─ <span className="fil">database.sql</span>{' '}
            <span className="note"># Skrip DDL tabel & foreign key</span>
          </div>
          <div>
            {' '}
            ├─ <span className="dir">siswa/</span>
          </div>
          <div>
            {' '}
            │&nbsp;&nbsp;&nbsp;├─ <span className="fil">index.php</span>{' '}
            <span className="note"># Tampilkan tabel siswa & aksi hapus</span>
          </div>
          <div>
            {' '}
            │&nbsp;&nbsp;&nbsp;├─ <span className="fil">tambah.php</span>{' '}
            <span className="note"># Formulir input siswa baru</span>
          </div>
          <div>
            {' '}
            │&nbsp;&nbsp;&nbsp;└─ <span className="fil">edit.php</span>{' '}
            <span className="note"># Formulir ubah data siswa</span>
          </div>
          <div>
            {' '}
            └─ <span className="dir">kelas/</span>
          </div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;├─ <span className="fil">index.php</span>{' '}
            <span className="note"># Tampilkan tabel kelas & aksi hapus</span>
          </div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;├─ <span className="fil">tambah.php</span>{' '}
            <span className="note"># Formulir input kelas baru</span>
          </div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;└─ <span className="fil">edit.php</span>{' '}
            <span className="note"># Formulir ubah data kelas</span>
          </div>
        </div>
        <div className="grid-2">
          <div className="card">
            <span className="tag">Fondasi</span>
            <h4>Folder config/ &amp; DB/</h4>
            <p>
              Berisi skrip konfigurasi koneksi dan skema database. File di folder ini tidak menampilkan
              antarmuka langsung ke pengguna, melainkan menjadi fondasi bagi modul kerja.
            </p>
          </div>
          <div className="card">
            <span className="tag">Transaksi</span>
            <h4>Modul siswa/</h4>
            <p>
              Tiga file siklus CRUD penuh dengan fitur query JOIN ke tabel kelas, validasi duplikasi NIS,
              dan dialog konfirmasi sebelum penghapusan.
            </p>
          </div>
          <div className="card">
            <span className="tag">Data Master</span>
            <h4>Modul kelas/</h4>
            <p>
              Tiga file pengelola data referensi rombel kelas. Dibatasi oleh aturan relasi Foreign Key
              agar kelas yang memiliki siswa tidak dapat terhapus secara tidak sengaja.
            </p>
          </div>
          <div className="card">
            <span className="tag">Gerbang Utama</span>
            <h4>index.php (Root)</h4>
            <p>
              Halaman beranda portal aplikasi yang menyajikan navigasi bersih menuju modul siswa
              maupun modul kelas.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ============ SLIDE 6 - SKEMA DATABASE ============ */
export function S06_Skema() {
  return (
    <div className="slide">
      <span className="eyebrow">Basis Data</span>
      <h2 className="section-title">Skema Tabel dan Integritas Relasi</h2>
      <p className="section-sub">
        Penerapan aturan database relasional di MySQL menggunakan tipe data yang tepat,
        indeks unik, serta constraint Foreign Key untuk menjaga konsistensi data sekolah.
      </p>
      <div className="grid-2">
        <div className="code" data-lang="sql" data-src="DB/database.sql">
          <pre>{`CREATE TABLE tbl_kelas (
  id_kelas       INT AUTO_INCREMENT PRIMARY KEY,
  tahun_ajaran   VARCHAR(20)  NOT NULL,
  jurusan        VARCHAR(50)  NOT NULL,
  nama_kelas     VARCHAR(20)  NOT NULL
) ENGINE=InnoDB;`}</pre>
        </div>
        <div className="code" data-lang="sql" data-src="DB/database.sql">
          <pre>{`CREATE TABLE tbl_siswa (
  id_siswa    INT AUTO_INCREMENT PRIMARY KEY,
  nis         VARCHAR(20) NOT NULL UNIQUE,
  nama_siswa  VARCHAR(100) NOT NULL,
  id_kelas    INT NOT NULL,
  alamat      TEXT NOT NULL,
  telepon     VARCHAR(20) NOT NULL
) ENGINE=InnoDB;`}</pre>
        </div>
      </div>
      <div className="code" data-lang="sql" data-src="DB/database.sql" style={{ marginTop: 16 }}>
        <pre>{`-- Relasi Integritas: mengikat tabel anak (siswa) ke tabel induk (kelas)
ALTER TABLE tbl_siswa
ADD CONSTRAINT fk_siswa_kelas
FOREIGN KEY (id_kelas) REFERENCES tbl_kelas(id_kelas)
ON UPDATE CASCADE ON DELETE RESTRICT;`}</pre>
      </div>
      <div className="grid-3" style={{ marginTop: 18 }}>
        <div className="card">
          <span className="tag">Primary Key</span>
          <h4>AUTO_INCREMENT</h4>
          <p>
            Menghasilkan nomor ID urut otomatis secara internal di MySQL. Menjadi kunci utama unik
            yang stabil untuk mengidentifikasi setiap baris record tanpa risiko duplikasi.
          </p>
        </div>
        <div className="card">
          <span className="tag">Integritas Entitas</span>
          <h4>Constraint UNIQUE (NIS)</h4>
          <p>
            Menjamin nomor induk siswa tidak boleh kembar di database. Jika ada input NIS yang sudah terdaftar,
            MySQL seketika menolak query dengan kode error 1062.
          </p>
        </div>
        <div className="card">
          <span className="tag">Integritas Referensial</span>
          <h4>ON DELETE RESTRICT</h4>
          <p>
            Aturan keselamatan data: MySQL akan membatalkan penghapusan kelas jika masih ada siswa yang terikat
            pada id_kelas tersebut, mencegah terjadinya data yatim (orphan record).
          </p>
        </div>
      </div>
    </div>
  )
}
