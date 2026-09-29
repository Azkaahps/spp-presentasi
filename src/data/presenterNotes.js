/* =========================================================
   PANDUAN PRESENTER DAN NASKAH PENJELASAN LENGKAP
   Presentasi Berpasangan:
   - Azka Hafidzha Putra Septo (Absen 07)
   - Rifqi Arya Dira Fairuz (Absen 25)
   Kelas XI RPL 2 - SMK Taruna Bangsa
   ========================================================= */

export const PRESENTER_NOTES = [
  {
    slideNum: 1,
    speaker: 'Azka (Absen 07)',
    topic: 'Pembukaan & Judul Presentasi',
    script:
      'Selamat pagi Bapak, Ibu guru, dan rekan-rekan sekalian. Kami dari kelompok pemrograman web kelas XI RPL 2 SMK Taruna Bangsa. Saya Azka Hafidzha Putra Septo absen 07, bersama rekan saya Rifqi Arya Dira Fairuz absen 25. Pada kesempatan hari ini, kami akan membedah secara teknis dan mendalam struktur kode, fungsi, method, serta alur logika pada aplikasi pembayaran SPP berbasis PHP Native dan PDO yang telah kami bangun.',
    fokus:
      'Tegaskan bahwa aplikasi ini dibangun murni menggunakan PHP native dengan standar keamanan PDO prepared statement, mencakup 9 file terstruktur dan 2 modul relasional.',
    qna:
      'Tanya: Mengapa memakai PDO bukan ekstensi mysqli? Jawab: PDO merupakan standar industri modern yang berorientasi objek, mendukung prepared statement asli di tingkat engine, dan portabel ke berbagai jenis database tanpa merombak logika kode.',
  },
  {
    slideNum: 2,
    speaker: 'Rifqi (Absen 25)',
    topic: 'Urutan Pembahasan Materi',
    script:
      'Terima kasih Azka. Untuk mempermudah pemahaman audiens, kami membagi materi presentasi ini menjadi tujuh bagian utama yang disusun berurutan mengikuti alur eksekusi aplikasi. Kita akan mulai dari pendahuluan, konfigurasi koneksi database terpusat, pengamanan query PDO, pengelolaan variabel superglobal, pembedahan modul CRUD siswa dan kelas, hingga skenario validasi dan penanganan error.',
    fokus:
      'Jelaskan bahwa urutan ini sengaja dirancang dari fondasi arsitektur (koneksi dan keamanan) menuju implementasi fitur di browser.',
    qna:
      'Tanya: Mengapa modul siswa dibahas setelah query dan superglobal? Jawab: Karena modul siswa merupakan penerapan langsung dari method PDO dan variabel POST/GET yang harus dipahami terlebih dahulu.',
  },
  {
    slideNum: 3,
    speaker: 'Azka (Absen 07)',
    topic: 'Gambaran Umum Arsitektur Aplikasi',
    script:
      'Pada slide ketiga ini, kita melihat gambaran sistem yang dibangun. Aplikasi ini adalah sistem informasi akademik untuk mencatat dan mengelola data pembayaran SPP sekolah. Arsitekturnya terdiri dari dua modul relasional: modul kelas sebagai data master referensi rombel, dan modul siswa sebagai entitas transaksi utama. Seluruh proses data diproses oleh web server Apache di lingkungan Laragon dengan database MySQL via PDO.',
    fokus:
      'Jelaskan relasi antara data master kelas dan data siswa, serta ketiadaan framework untuk membuktikan penguasaan murni PHP dasar dan SQL.',
    qna:
      'Tanya: Mengapa tanpa framework? Jawab: Tujuannya untuk menguasai mekanisme fundamental web seperti request-response HTTP, penanganan koneksi database, dan sanitasi keamanan secara manual dari nol.',
  },
  {
    slideNum: 4,
    speaker: 'Rifqi (Absen 25)',
    topic: 'Tujuan dan Manfaat Struktur Kode',
    script:
      'Mengapa kami memilih arsitektur seperti ini? Ada tiga alasan fundamental. Pertama, prinsip Single Source of Truth melalui koneksi terpusat di config/koneksi.php, sehingga jika server database berpindah, kita cukup mengedit satu file. Kedua, kepatuhan keamanan dasar dengan memisahkan data dan perintah query untuk mencegah serangan SQL Injection. Ketiga, pemisahan yang rapi antara blok pemrosesan logika PHP di bagian atas file dengan template form HTML di bagian bawah.',
    fokus:
      'Tekankan konsep modularitas dan kemudahan pemeliharaan (maintainability) pada aplikasi.',
    qna:
      'Tanya: Apa keuntungan meletakkan proses PHP di atas form HTML? Jawab: Agar proses pengolahan data atau pengalihan halaman (redirect) dapat dieksekusi sebelum ada satu pun karakter output HTML yang dikirim ke browser.',
  },
  {
    slideNum: 5,
    speaker: 'Azka (Absen 07)',
    topic: 'Peta Struktur Folder dan File Proyek',
    script:
      'Berikut adalah peta struktur direktori dari aplikasi kami. Folder config menampung konfigurasi koneksi PDO, folder DB menyimpan skrip DDL database, sedangkan modul kerja dibagi menjadi folder siswa dan folder kelas. Masing-masing folder modul memiliki tiga file konsisten: index.php untuk membaca dan menghapus data, tambah.php untuk membuat data baru, dan edit.php untuk memperbarui data yang sudah ada.',
    fokus:
      'Tunjukkan konsistensi penamaan file (index, tambah, edit) yang memudahkan navigasi pengembang.',
    qna:
      'Tanya: Mengapa proses hapus disatukan di index.php bukan file hapus.php terpisah? Jawab: Agar setelah proses hapus selesai, sistem tidak perlu melakukan redirect tambahan yang berlebihan, melainkan langsung menyegarkan daftar data di halaman yang sama.',
  },
  {
    slideNum: 6,
    speaker: 'Rifqi (Absen 25)',
    topic: 'Skema Database dan Integritas Relasi',
    script:
      'Di balik tampilan web, terdapat dua tabel relasional MySQL. Tabel tbl_kelas bertindak sebagai tabel induk dengan kolom id_kelas sebagai Primary Key auto increment. Tabel tbl_siswa bertindak sebagai tabel anak yang memiliki Foreign Key id_kelas. Kolom nis kami tandai sebagai UNIQUE karena nomor induk siswa tidak boleh ganda di sekolah. Selain itu, relasi ini menerapkan aturan ON DELETE RESTRICT, yang berarti sistem secara otomatis menolak penghapusan kelas jika masih ada siswa yang terdaftar di kelas tersebut.',
    fokus:
      'Soroti integritas data relasional, constraint UNIQUE pada NIS, dan fungsi keamanan ON DELETE RESTRICT.',
    qna:
      'Tanya: Apa yang terjadi jika tabel kelas dihapus sementara ada siswa di dalamnya? Jawab: MySQL akan menolak perintah tersebut dengan kode error 1451 (foreign key constraint fails) demi mencegah data siswa menjadi yatim (orphan data).',
  },
  {
    slideNum: 7,
    speaker: 'Azka (Absen 07)',
    topic: 'Bedah File config/koneksi.php',
    script:
      'Sekarang kita masuk ke Bagian 2, yaitu fondasi koneksi database. File config/koneksi.php adalah file yang pertama kali dieksekusi oleh setiap halaman. Di dalamnya, empat variabel konfigurasi menampung alamat host, username root, password, dan nama database. Seluruh pembuatan objek PDO dibungkus dalam blok try-catch agar jika terjadi gangguan jaringan atau database padam, aplikasi tidak menghasilkan pesan error mentah yang berantakan di layar publik.',
    fokus:
      'Jelaskan bahwa konfigurasi ini adalah jembatan vital antara PHP runtime dan daemon MySQL.',
    qna:
      'Tanya: Apakah aman meletakkan konfigurasi di file terpisah? Jawab: Sangat aman dan merupakan best practice, bahkan di lingkungan produksi file ini dapat dikombinasikan dengan environment variable (.env).',
  },
  {
    slideNum: 8,
    speaker: 'Rifqi (Absen 25)',
    topic: 'Konstruktor new PDO()',
    script:
      'Pada baris ke-12 koneksi.php, kita memanggil konstruktor new PDO. Konstruktor ini menerima tiga parameter wajib. Parameter pertama adalah DSN atau Data Source Name yang menyatakan driver database mysql, alamat server host, dan nama skema database. Parameter kedua dan ketiga adalah kredensial otentikasi username dan password. Begitu baris ini sukses dieksekusi, satu soket komunikasi aktif langsung terbentuk di memori server.',
    fokus:
      'Terangkan anatomi DSN dan bagaimana objek PDO merepresentasikan koneksi aktif yang siap digunakan.',
    qna:
      'Tanya: Apa beda DSN MySQL dengan database lain? Jawab: Di PostgreSQL formatnya pgsql:host=...;dbname=..., sedangkan di SQLite cukup sqlite:path_file. Sintaks query PHP-nya tetap sama.',
  },
  {
    slideNum: 9,
    speaker: 'Azka (Absen 07)',
    topic: 'Konfigurasi setAttribute & ERRMODE_EXCEPTION',
    script:
      'Baris ke-14 adalah baris yang sangat krusial bagi keandalan sistem: $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION). Secara default, PDO berjalan dalam mode ERRMODE_SILENT, di mana query yang gagal tidak akan memunculkan peringatan apapun dan script terus berjalan. Dengan mengaktifkan ERRMODE_EXCEPTION, setiap kali ada kesalahan SQL atau pelanggaran aturan data, PDO seketika melempar objek PDOException sehingga kesalahan langsung terdeteksi dan tidak menjadi bug tersembunyi.',
    fokus:
      'Bandingkan bahaya ERRMODE_SILENT dengan keunggulan ERRMODE_EXCEPTION dalam mendeteksi kegagalan query.',
    qna:
      'Tanya: Mengapa tidak memakai ERRMODE_WARNING? Jawab: Mode warning hanya mencetak teks peringatan tetapi program tetap berjalan, sehingga data berisiko tersimpan dalam kondisi tidak lengkap.',
  },
  {
    slideNum: 10,
    speaker: 'Rifqi (Absen 25)',
    topic: 'Mekanisme try, catch, dan PDOException',
    script:
      'Mekanisme try-catch memisahkan jalur eksekusi menjadi dua skenario. Kode yang berisiko ditaruh di dalam blok try. Jika seluruh instruksi di try sukses, blok catch akan dilewati sepenuhnya. Namun, jika terjadi kegagalan (misalnya database server belum dinyalakan di Laragon), PHP langsung memotong eksekusi dan mengalihkan kendali ke blok catch dengan membawa variabel $e bertipe PDOException. Di sinilah kita menyelamatkan sistem agar tidak mengalami crash fatal.',
    fokus:
      'Jelaskan aliran eksekusi program saat terjadi error dan bagaimana try-catch menjaga kestabilan aplikasi.',
    qna:
      'Tanya: Bisakah menangkap error selain database di catch ini? Jawab: Karena kita mengetik PDOException $e, catch ini hanya menangkap error terkait PDO. Untuk error umum, PHP menyediakan kelas Exception dasar.',
  },
  {
    slideNum: 11,
    speaker: 'Azka (Absen 07)',
    topic: 'Fungsi die() dan Pengambilan Pesan Error',
    script:
      'Pada penanganan error koneksi, kami memanggil fungsi die(). Fungsi ini berfungsi sebagai saklar pemutus sirkuit darurat: jika koneksi gagal, sistem langsung berhenti total dan mencetak pesan penjelas. Kami menggunakan $e->getMessage() untuk mendapatkan rincian teknis kesalahan MySQL saat tahap debugging. Sedangkan di modul tambah siswa, kami menggunakan $e->errorInfo[1] untuk membaca angka kode error resmi MySQL, misalnya 1062 saat terjadi duplikasi data NIS.',
    fokus:
      'Bedakan penggunaan getMessage() untuk pesan teks teknis dengan errorInfo[1] untuk kode numerik logika program.',
    qna:
      'Tanya: Mengapa tidak membiarkan halaman tetap berjalan saat koneksi gagal? Jawab: Karena seluruh file berikutnya membutuhkan objek $pdo. Jika dipaksa lanjut, akan timbul puluhan fatal error Call to a member function on null.',
  },
  {
    slideNum: 12,
    speaker: 'Rifqi (Absen 25)',
    topic: 'Rangkuman Alur Koneksi Database',
    script:
      'Mari kita simpulkan alur koneksi database dalam lima langkah berurutan. Pertama, file halaman memanggil koneksi.php lewat require_once. Kedua, variabel konfigurasi diisi. Ketiga, konstruktor new PDO membuka koneksi ke MySQL. Keempat, setAttribute mengaktifkan mode Exception. Kelima, objek $pdo dinyatakan siap digunakan. Jika kelima langkah ini lolos, halaman lanjut membaca atau menulis data. Jika gagal di langkah ketiga, eksekusi diputus seketika.',
    fokus:
      'Rangkum alur secara jelas dari inisiasi hingga kesiapan objek $pdo.',
    qna:
      'Tanya: Berapa kali koneksi dibuka saat satu halaman diakses? Jawab: Tepat satu kali, karena require_once mencegah pemanggilan ganda dalam satu request.',
  },
  {
    slideNum: 13,
    speaker: 'Azka (Absen 07)',
    topic: 'Pernyataan require_once',
    script:
      'Slide ke-13 membahas pernyataan require_once. Di PHP ada empat fungsi penyertaan file: include, require, include_once, dan require_once. Kami secara spesifik memilih require_once karena dua faktor penting. Kata require memastikan bahwa jika file koneksi hilang, program langsung berhenti dengan Fatal Error, bukan sekadar Warning seperti pada include. Sedangkan akhiran _once menjamin bahwa file tersebut hanya dimuat satu kali saja, mencegah deklarasi ulang objek yang memboroskan memori.',
    fokus:
      'Jelaskan perbedaan fundamental antara require vs include dan fungsi pengaman _once.',
    qna:
      'Tanya: Apa yang terjadi jika memakai include biasa untuk koneksi? Jawab: Jika koneksi.php hilang, PHP hanya mengeluarkan peringatan ringan dan tetap mencoba menjalankan query, yang berujung pada tumpukan error fatal di baris berikutnya.',
  },
  {
    slideNum: 14,
    speaker: 'Rifqi (Absen 25)',
    topic: 'Peta Empat Method Inti PDO',
    script:
      'Kita memasuki Bagian 3: Query dan Keamanan Database. Dalam seluruh proyek aplikasi SPP ini, semua operasi data hanya bersandar pada empat method inti PDO. Dua method bertugas mengeksekusi perintah SQL, yaitu query() untuk query statis dan kombinasi prepare() serta execute() untuk query berparameter yang aman. Sementara dua method lainnya bertugas mengambil data hasil ke memori PHP, yaitu fetchAll() untuk mengambil semua baris dan fetch() untuk mengambil satu baris.',
    fokus:
      'Tegaskan pembagian peran: dua method eksekutor dan dua method pengambil data (fetcher).',
    qna:
      'Tanya: Mengapa query() dan prepare() dibedakan? Jawab: query() mengeksekusi langsung tanpa sanitasi parameter, sedangkan prepare() memisahkan struktur SQL dari nilai input user untuk keamanan mutlak.',
  },
  {
    slideNum: 15,
    speaker: 'Azka (Absen 07)',
    topic: 'Method $pdo->query()',
    script:
      'Method $pdo->query() digunakan saat kita ingin menjalankan perintah SQL statis yang sama sekali tidak menerima input variabel dari pengguna atau URL. Contohnya pada file kelas/index.php baris ke-3, kita mengambil seluruh data kelas yang diurutkan dari ID terbesar dengan klausa ORDER BY id_kelas DESC. Karena query ini murni ditentukan oleh programmer tanpa campur tangan form pengguna, penggunaannya sangat aman dan cepat.',
    fokus:
      'Jelaskan kapan query() aman digunakan dan fungsi klausa ORDER BY DESC untuk kenyamanan pengguna.',
    qna:
      'Tanya: Bolehkah menambahkan variabel $_GET ke dalam query()? Jawab: Sangat dilarang, karena menggabungkan variabel langsung ke query() membuka celah fatal SQL Injection.',
  },
  {
    slideNum: 16,
    speaker: 'Rifqi (Absen 25)',
    topic: 'Method $pdo->prepare() dan Konsep Placeholder',
    script:
      'Inilah jantung keamanan aplikasi modern: $pdo->prepare(). Saat kita hendak menyimpan data siswa baru di siswa/tambah.php, kita tidak memasukkan nilai input ke dalam string SQL, melainkan meletakkan tanda tanya (?) sebagai placeholder atau parameter pengganti. Saat method prepare() dipanggil, MySQL mengkompilasi dan memvalidasi struktur query terlebih dahulu ke dalam execution plan. Query ini terkunci dan tidak bisa lagi diubah bentuknya oleh karakter apapun yang dimasukkan user.',
    fokus:
      'Terangkan bagaimana placeholder (?) memisahkan logika query SQL dari isi data pengguna.',
    qna:
      'Tanya: Apa itu execution plan di database? Jawab: Rencana jalur eksekusi yang disusun MySQL untuk memproses query sebelum data sebenarnya dikirimkan, sehingga struktur logika SQL tidak dapat disusupi.',
  },
  {
    slideNum: 17,
    speaker: 'Azka (Absen 07)',
    topic: 'Method $stmt->execute() dan Parameter Binding',
    script:
      'Setelah query disiapkan oleh prepare(), langkah berikutnya adalah memanggil $stmt->execute(). Method ini menerima sebuah array yang berisi nilai riil dari form $_POST. Driver PDO secara otomatis melakukan binding dan sanitasi tipe data pada setiap elemen array. Aturan penting yang harus ditaati: jumlah elemen array dan urutan posisinya harus cocok 100% dengan urutan tanda tanya di query prepare. Jika tanda tanya ada lima, array input juga wajib berisi tepat lima nilai.',
    fokus:
      'Tekankan pentingnya kesesuaian indeks urutan antara tanda tanya (?) dan array parameter di execute().',
    qna:
      'Tanya: Apa yang terjadi jika jumlah array kurang dari jumlah tanda tanya? Jawab: PDO akan melempar PDOException dengan pesan Invalid parameter number: number of bound variables does not match number of tokens.',
  },
  {
    slideNum: 18,
    speaker: 'Rifqi (Absen 25)',
    topic: 'Pengambilan Seluruh Data via fetchAll(PDO::FETCH_ASSOC)',
    script:
      'Setelah query pembacaan dieksekusi, kita memanggil fetchAll(PDO::FETCH_ASSOC) untuk menarik seluruh baris tabel dari memori database ke memori PHP. Parameter PDO::FETCH_ASSOC memberitahu PDO agar setiap baris data diubah menjadi array asosiatif dengan nama kolom tabel sebagai kuncinya, seperti nis, nama_siswa, dan nama_kelas. Format ini sangat bersih dan mudah di-looping menggunakan foreach di tabel HTML.',
    fokus:
      'Jelaskan struktur array asosiatif 2 dimensi yang dihasilkan oleh fetchAll() dan efisiensinya untuk daftar tabel.',
    qna:
      'Tanya: Apa alternatif selain FETCH_ASSOC? Jawab: Ada FETCH_NUM yang memakai indeks angka (0, 1, 2) dan FETCH_OBJ yang menghasilkan objek PHP dengan akses tanda panah ($row->nama).',
  },
  {
    slideNum: 19,
    speaker: 'Azka (Absen 07)',
    topic: 'Pengambilan Satu Record via fetch(PDO::FETCH_ASSOC)',
    script:
      'Berbeda dengan fetchAll() yang mengambil semua data, method fetch() hanya mengambil tepat satu baris record tunggal. Method ini diterapkan pada halaman edit siswa dan edit kelas, di mana kita hanya memerlukan data dari satu orang siswa berdasarkan ID yang dikirim lewat URL. Record tunggal ini langsung ditampung ke dalam array satu dimensi $siswa, lalu dicetak ke atribut value masing-masing elemen input di form pengeditan.',
    fokus:
      'Jelaskan efisiensi memori fetch() untuk record tunggal pada halaman edit dibanding memanggil fetchAll().',
    qna:
      'Tanya: Apa nilai kembalian fetch() jika data ID tidak ditemukan di tabel? Jawab: Method fetch() akan mengembalikan nilai boolean false, yang bisa kita deteksi untuk mengalihkan halaman.',
  },
  {
    slideNum: 20,
    speaker: 'Rifqi (Absen 25)',
    topic: 'Bedah Keamanan: Prepared Statement vs Query Konkatenasi',
    script:
      'Mari kita bedah secara nyata mengapa prepared statement mutlak diperlukan. Pada kode rentan di sebelah kiri, query disusun dengan menyambung string memakai titik ($_GET[nis]). Jika penyerang memasukkan kutip satu dan perintah OR 1=1, struktur query database akan jebol dan seluruh data rahasia bocor. Sementara pada kode aman di sebelah kanan, tanda kutip dari penyerang murni diperlakukan sebagai teks biasa yang netral, sehingga celah SQL Injection tertutup seratus persen.',
    fokus:
      'Tunjukkan perbandingan visual langsung antara manipulasi SQLi pada konkatenasi vs netralisasi parameter pada PDO.',
    qna:
      'Tanya: Mengapa tanda kutip pada prepared statement tidak merusak query? Jawab: Karena PDO mengirim data melalui kanal parameter biner terpisah setelah struktur SQL selesai dikompilasi oleh database server.',
  },
  {
    slideNum: 21,
    speaker: 'Azka (Absen 07)',
    topic: 'Proteksi XSS dengan htmlspecialchars()',
    script:
      'Selain keamanan database, aplikasi kami juga memproteksi tampilan antarmuka dari celah Cross-Site Scripting (XSS) menggunakan fungsi htmlspecialchars(). Jika ada nama siswa atau nama kelas yang mengandung karakter spesial HTML seperti tanda kurang dari (<), lebih dari (>), atau kutip, fungsi ini langsung mengubahnya menjadi entitas aman seperti &lt; dan &gt;. Dengan demikian, skrip JavaScript berbahaya tidak akan dieksekusi oleh browser klien.',
    fokus:
      'Jelaskan bahwa prepared statement mengamankan database, sedangkan htmlspecialchars mengamankan antarmuka browser.',
    qna:
      'Tanya: Kapan htmlspecialchars harus dipanggil? Jawab: Saat mencetak data (echo) ke dalam dokumen HTML, bukan saat menyimpan data ke database.',
  },
  {
    slideNum: 22,
    speaker: 'Rifqi (Absen 25)',
    topic: 'Superglobal $_POST dan $_GET',
    script:
      'Memasuki Bagian 4: Superglobal dan Logika PHP. PHP menyediakan variabel superglobal bawaan yang selalu dapat diakses di mana saja. Kami menggunakan $_POST untuk proses penambahan dan pembaruan data karena data dikirim melalui body HTTP request secara tertutup dan tidak terlihat di address bar. Sementara $_GET kami gunakan saat aksi navigasi memerlukan parameter yang terbaca di URL, seperti index.php?hapus=5 atau edit.php?id=3.',
    fokus:
      'Bedakan penggunaan POST untuk data form sensitif/banyak vs GET untuk parameter identitas di address bar.',
    qna:
      'Tanya: Bisakah proses hapus memakai POST? Jawab: Bisa, menggunakan form dan tombol submit tersembunyi. Namun untuk aplikasi native sederhana tingkat SMK, parameter GET pada tautan link adalah standar yang umum diajarkan.',
  },
  {
    slideNum: 23,
    speaker: 'Azka (Absen 07)',
    topic: 'Fungsi Pemeriksa isset()',
    script:
      'Fungsi isset() bertindak sebagai gerbang logika pengaman aplikasi. Sebelum PHP memproses data form atau query database, isset() memeriksa apakah kunci array yang dituju sudah terbentuk dan nilainya tidak bernilai NULL. Contohnya if (isset($_POST[simpan])), kode di dalamnya hanya akan dieksekusi saat tombol submit benar-benar ditekan. Tanpa isset(), PHP modern akan memunculkan peringatan Undefined array key saat halaman pertama kali dibuka.',
    fokus:
      'Jelaskan fungsi isset() sebagai filter gerbang (guard clause) pencegah error dan pengatur alur eksekusi.',
    qna:
      'Tanya: Apa beda isset() dengan empty()? Jawab: isset() memeriksa apakah variabel sudah dideklarasikan dan tidak null, sedangkan empty() juga memeriksa apakah nilainya bernilai kosong seperti string kosong ("") atau angka 0.',
  },
  {
    slideNum: 24,
    speaker: 'Rifqi (Absen 25)',
    topic: 'Null Coalescing Operator (??)',
    script:
      'Pada file edit.php baris ke-3, kami menerapkan operator modern PHP 7 ke atas, yaitu Null Coalescing Operator yang disimbolkan dengan dua tanda tanya (??). Sintaks $id = $_GET[id] ?? null adalah bentuk ringkas dan elegan dari pemeriksaan isset. Jika parameter id tersedia di URL, maka nilainya dimasukkan ke variabel $id. Namun jika pengguna mengakses edit.php tanpa menyertakan ID sama sekali, variabel $id otomatis bernilai null tanpa memicu error peringatan.',
    fokus:
      'Tunjukkan modernitas penulisan kode PHP menggunakan operator ?? yang bersih dan aman.',
    qna:
      'Tanya: Mengapa ini lebih baik daripada ternary isset()? Jawab: Lebih ringkas, lebih mudah dibaca, dan tidak mengulang pengetikan nama variabel dua kali.',
  },
  {
    slideNum: 25,
    speaker: 'Azka (Absen 07)',
    topic: 'Pengalihan Halaman via header("Location: ...") dan exit',
    script:
      'Jika halaman edit.php dibuka tanpa ID yang sah, baris ke-5 langsung mengalihkan pengguna kembali ke halaman daftar data menggunakan header("Location: index.php"). Di bawah baris header tersebut, kami WAJIB menyertakan perintah exit. Ini adalah aturan emas pemrograman web PHP: fungsi header() hanya mengirim instruksi redirect ke browser klien, tetapi server PHP akan tetap mengeksekusi baris kode di bawahnya sampai tuntas jika tidak dihentikan oleh perintah exit.',
    fokus:
      'Beri penekanan kuat pada keharusan menyertakan exit setelah fungsi header redirect.',
    qna:
      'Tanya: Apa bahayanya jika lupa menuliskan exit setelah header redirect? Jawab: Script di bawahnya (termasuk query database atau form rahasia) tetap berjalan di server dan datanya bisa dibaca oleh peretas melalui inspeksi raw HTTP response.',
  },
  {
    slideNum: 26,
    speaker: 'Rifqi (Absen 25)',
    topic: 'Sintaks Templating Alternatif foreach : endforeach',
    script:
      'Dalam menampilkan data tabel di antarmuka web, kami menggunakan sintaks kontrol alternatif PHP, yaitu foreach ($data as $row) : diakhiri endforeach;. Dibandingkan menggunakan kurung kurawal buka-tutup ({ }), sintaks titik dua ini jauh lebih mudah dibaca saat diselingi tag-tag HTML seperti <tr> dan <td>. Kami juga memakai tag echo pendek (<?= ?>) untuk mencetak nilai kolom secara ringkas dan bersih.',
    fokus:
      'Jelaskan kebersihan kode (clean code) saat mencampur logika PHP dengan markup tabel HTML.',
    qna:
      'Tanya: Apakah <?= ?> selalu didukung di semua server PHP? Jawab: Sejak PHP versi 5.4 ke atas, short echo tag <?= ?> sudah diaktifkan secara permanen secara default tanpa bergantung pada pengaturan short_open_tag.',
  },
  {
    slideNum: 27,
    speaker: 'Azka (Absen 07)',
    topic: 'Operator Ternary untuk Seleksi Dropdown Kelas',
    script:
      'Pada halaman edit siswa, kita harus menampilkan kelas lama yang sudah dipilih siswa sebelumnya pada elemen dropdown <select>. Kami menggunakan operator ternary satu baris: $k[id_kelas] == $siswa[id_kelas] ? "selected" : "". Logikanya: saat PHP melakukan looping daftar seluruh kelas, jika ID kelas saat ini cocok dengan ID kelas milik siswa yang sedang diedit, atribut "selected" langsung dicetak ke tag option sehingga dropdown otomatis menampilkan kelas yang benar.',
    fokus:
      'Jelaskan bagaimana operator kondisi ternary menjaga akurasi data relasi saat proses edit.',
    qna:
      'Tanya: Apa akibatnya jika logika ternary selected ini tidak dibuat? Jawab: Dropdown akan selalu kembali memilih opsi kelas paling atas, sehingga jika pengguna tidak sengaja menyimpan form, kelas siswa bisa berubah tanpa disadari.',
  },
  {
    slideNum: 28,
    speaker: 'Rifqi (Absen 25)',
    topic: 'Modul Siswa - Arsitektur dan Alur Kerja',
    script:
      'Sekarang kita memasuki Bagian 5: Bedah Modul Siswa. Modul siswa adalah inti dari aplikasi SPP ini karena data pembayaran selalu terikat pada siswa tertentu. Modul ini memiliki alur lengkap: penambahan siswa baru di tambah.php dengan validasi kelas, penampilan daftar siswa dengan relasi kelas di index.php, pengubahan profil di edit.php, dan penghapusan data secara aman.',
    fokus:
      'Buka penjelasan modul siswa sebagai entitas utama transaksi sekolah.',
    qna:
      'Tanya: Apa kolom paling krusial pada tabel siswa? Jawab: Kolom nis sebagai identitas unik siswa dan kolom id_kelas sebagai penghubung ke data master kelas.',
  },
  {
    slideNum: 29,
    speaker: 'Azka (Absen 07)',
    topic: 'Modul Siswa - Proses Tambah Data (Create)',
    script:
      'Pada proses tambah siswa di siswa/tambah.php baris 3-13, query INSERT INTO tbl_siswa dipersiapkan dengan lima parameter: nis, nama_siswa, id_kelas, alamat, dan telepon. Seluruh eksekusi dibungkus dalam blok try-catch. Jika berhasil, script mencetak JavaScript alert "Siswa berhasil disimpan!" lalu dialihkan ke index.php. Namun jika gagal, blok catch menangkap error-nya untuk dianalisis lebih lanjut.',
    fokus:
      'Jelaskan aliran data dari form POST menuju prepared statement INSERT.',
    qna:
      'Tanya: Mengapa id_siswa tidak dimasukkan ke dalam query INSERT? Jawab: Karena kolom id_siswa bertipe AUTO_INCREMENT, MySQL akan otomatis menghasilkan nomor ID urut berikutnya secara mandiri.',
  },
  {
    slideNum: 30,
    speaker: 'Rifqi (Absen 25)',
    topic: 'Modul Siswa - Penggabungan Tabel (Read with JOIN)',
    script:
      'Di halaman siswa/index.php, kita menampilkan seluruh data siswa ke dalam tabel. Karena tabel siswa hanya menyimpan angka id_kelas, kita membutuhkan query SQL JOIN agar nama kelas aslinya (misalnya XI RPL 2) dapat ditampilkan ke layar. Query menggabungkan tbl_siswa dengan tbl_kelas menggunakan klausa ON tbl_siswa.id_kelas = tbl_kelas.id_kelas, diurutkan dari id_siswa terbaru.',
    fokus:
      'Jelaskan fungsi SQL JOIN dalam menghadirkan informasi yang manusiawi (nama kelas) dari data relasional.',
    qna:
      'Tanya: Mengapa memakai LEFT JOIN atau INNER JOIN? Jawab: Di sini digunakan INNER JOIN karena setiap siswa valid dipastikan memiliki referensi kelas yang terdaftar.',
  },
  {
    slideNum: 31,
    speaker: 'Azka (Absen 07)',
    topic: 'Modul Siswa - Pembaruan Data (Update)',
    script:
      'File siswa/edit.php menerapkan pola dua tahap. Tahap pertama (Read): saat halaman dibuka dengan parameter ID, PHP mengambil record data siswa tersebut menggunakan prepare() dan fetch(), lalu mengisikan nilai-nilainya ke dalam form input. Tahap kedua (Write): saat admin menekan tombol Simpan Perubahan, query UPDATE dieksekusi untuk memperbarui kolom nama, kelas, alamat, dan telepon siswa di database.',
    fokus:
      'Jelaskan siklus dua tahap pengeditan: membaca data eksisting ke form, lalu menyimpan data revisi.',
    qna:
      'Tanya: Mengapa NIS biasanya tidak diizinkan diedit pada sistem sekolah? Jawab: Karena NIS adalah nomor registrasi resmi yang menjadi acuan administrasi permanen dan kunci unik integritas data.',
  },
  {
    slideNum: 32,
    speaker: 'Rifqi (Absen 25)',
    topic: 'Modul Siswa - Penghapusan Data (Delete)',
    script:
      'Proses hapus siswa di siswa/index.php baris 45-53 dipicu saat admin mengklik tautan Hapus yang menyertakan parameter GET. Query DELETE FROM tbl_siswa WHERE id_siswa = ? dieksekusi dengan parameter binding. Untuk mencegah data terhapus secara tidak sengaja akibat salah klik, tautan link dilengkapi atribut JavaScript onclick="return confirm()". Jika admin menekan Cancel, browser membatalkan pengiriman request ke server.',
    fokus:
      'Tekankan pentingnya konfirmasi ganda sisi klien (client-side confirmation) sebelum query DELETE dieksekusi.',
    qna:
      'Tanya: Apakah data yang sudah dihapus dengan DELETE SQL bisa dikembalikan? Jawab: Tanpa fitur backup atau soft-delete (kolom deleted_at), data yang dihapus akan hilang permanen dari tabel fisik MySQL.',
  },
  {
    slideNum: 33,
    speaker: 'Azka (Absen 07)',
    topic: 'Modul Kelas - Manajemen Data Master',
    script:
      'Kita beralih ke Bagian 6: Modul Kelas. Modul kelas mengelola tiga atribut utama: tahun_ajaran (misal 2025/2026), jurusan (misal Rekayasa Perangkat Lunak), dan nama_kelas (misal XI RPL 2). Kelas merupakan data master yang mutlak harus diinputkan terlebih dahulu sebelum admin dapat mendaftarkan siswa baru, karena form tambah siswa mengambil daftar kelas langsung dari tabel ini.',
    fokus:
      'Jelaskan posisi tabel kelas sebagai data referensi induk yang wajib ada sebelum data transaksi siswa dibuat.',
    qna:
      'Tanya: Apa yang terjadi jika admin mencoba menambah siswa saat tabel kelas masih kosong? Jawab: Dropdown pilihan kelas akan kosong sehingga form menolak pengiriman data karena atribut required.',
  },
  {
    slideNum: 34,
    speaker: 'Rifqi (Absen 25)',
    topic: 'Proteksi Integritas Foreign Key pada Hapus Kelas',
    script:
      'Inilah contoh penerapan aturan bisnis basis data yang sesungguhnya. Pada kelas/index.php, saat admin mencoba menghapus sebuah kelas, MySQL memeriksa apakah ada baris di tbl_siswa yang masih memakai id_kelas tersebut. Karena relasi kita disetel ke ON DELETE RESTRICT, MySQL menolak penghapusan dan melempar error code 1451. Blok catch menangkap error ini dan menampilkan pesan: "Kelas tidak bisa dihapus karena masih digunakan oleh data siswa". Data sekolah tetap utuh dan konsisten.',
    fokus:
      'Soroti bagaimana aturan database melindungi data sekolah dari kerusakan logika akibat penghapusan kelas sepihak.',
    qna:
      'Tanya: Mengapa tidak memakai ON DELETE CASCADE saja? Jawab: Menggunakan CASCADE sangat berbahaya di data sekolah, karena jika satu kelas dihapus tidak sengaja, seluruh puluhan siswa di kelas tersebut akan ikut terhapus otomatis.',
  },
  {
    slideNum: 35,
    speaker: 'Azka (Absen 07)',
    topic: 'Penanganan Kasus Nyata: Error 1062 Duplicate Entry',
    script:
      'Pada penanganan error tambah siswa, kami menerapkan pengecekan spesifik: if ($e->errorInfo[1] == 1062). Kode 1062 adalah kode kesalahan resmi MySQL untuk duplikasi data pada kolom yang bertanda UNIQUE, yaitu kolom nis. Dengan mendeteksi angka 1062 secara presisi, kita dapat menampilkan pesan berbahasa Indonesia yang jelas: "Gagal: NIS sudah Terdaftar!". Jika kodenya bukan 1062, barulah sistem menampilkan pesan kegagalan umum database.',
    fokus:
      'Jelaskan kecerdasan penanganan error spesifik menggunakan errorInfo[1] dibanding pesan error generik.',
    qna:
      'Tanya: Di mana kita bisa menemukan daftar kode error MySQL seperti 1062? Jawab: Di dokumentasi resmi MySQL Server Error Codes and Messages.',
  },
  {
    slideNum: 36,
    speaker: 'Rifqi (Absen 25)',
    topic: 'Form HTML dan Validasi Sisi Klien (required)',
    script:
      'Slide ke-36 memperlihatkan struktur form HTML dan pertahanan lapis pertama: atribut HTML5 required. Kami menyematkan required pada input text NIS, nama, telepon, dan dropdown select kelas. Atribut ini mencegah pengguna mengirim form kosong ke server. Validasi sisi klien ini menghemat beban server Apache karena request cacat langsung dicegat oleh browser sebelum komunikasi HTTP berlangsung.',
    fokus:
      'Jelaskan konsep validasi dua lapis: lapis pertama di browser klien (required) dan lapis kedua di database server (NOT NULL & PDO).',
    qna:
      'Tanya: Apakah atribut required di HTML sudah cukup aman? Jawab: Belum cukup, karena validasi HTML dapat dimatikan lewat Inspect Element. Oleh karena itu, database tetap wajib memiliki constraint NOT NULL dan validasi PHP.',
  },
  {
    slideNum: 37,
    speaker: 'Azka (Absen 07)',
    topic: 'Alur Sistem Menyeluruh dari Input ke Database',
    script:
      'Mari kita satukan seluruh konsep dalam diagram alur komprehensif pada slide 37. Perjalanan data dimulai dari Browser klien di mana pengguna mengisi form. Begitu tombol Simpan diklik, paket data dikirim via protokol HTTP POST ke server Apache. Di server, PHP runtime menangkap data lewat $_POST dan memeriksa isset. Selanjutnya, PDO menyiapkan prepared statement dan mengirim nilai aman ke MySQL. MySQL menyimpan data ke tabel fisik. Terakhir, server mengirim respon JavaScript alert dan redirect kembali ke layar pengguna.',
    fokus:
      'Rangkum siklus penuh request-response web secara utuh dan terpadu.',
    qna:
      'Tanya: Apa peran Apache dalam alur ini? Jawab: Apache menerima request jaringan dari browser, memanggil modul PHP interpreter untuk memproses skrip, lalu mengembalikan dokumen HTML/JS hasilnya ke browser.',
  },
  {
    slideNum: 38,
    speaker: 'Azka & Rifqi',
    topic: 'Sesi Tanya Jawab & Penutup',
    script:
      'Demikian pemaparan teknis kami mengenai analisis fungsi, method, dan struktur kode pada aplikasi pembayaran SPP berbasis PHP Native dan PDO. Kami telah membuktikan bahwa dengan penguasaan konsep yang tepat, aplikasi native sederhana sekalipun dapat dibangun dengan standar keamanan industri, arsitektur yang rapi, dan integritas data yang kokoh. Sekarang, kami mengundang Bapak/Ibu guru dan teman-teman sekalian untuk memberikan pertanyaan, masukan, maupun saran. Terima kasih.',
    fokus:
      'Tutup presentasi dengan rasa percaya diri, sopan, dan sambut sesi diskusi tanya jawab.',
    qna:
      'Tanya: Siap menjawab pertanyaan teknis seputar PDO, prepared statement, error handling, atau struktur basis data relasional.',
  },
]
