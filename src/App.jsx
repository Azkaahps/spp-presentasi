import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { S01_Title, S02_Agenda, S03_Overview, S04_Tujuan, S05_Struktur, S06_Skema } from './slides/partA.jsx'
import { S07_KoneksiFile, S08_NewPdo, S09_ErrMode, S10_TryCatch, S11_Die, S12_RingkasKoneksi, S13_RequireOnce } from './slides/partB.jsx'
import { S14_PetaPdo, S15_Query, S16_Prepare, S17_Execute, S18_FetchAll, S19_Fetch, S20_Prepared, S21_Htmlspecialchars } from './slides/partC.jsx'
import { S22_Superglobal, S23_Isset, S24_Coalesce, S25_HeaderExit, S26_Foreach, S27_Ternary } from './slides/partD.jsx'
import { S28_SiswaIntro, S29_SiswaCreate, S30_SiswaRead, S31_SiswaUpdate, S32_SiswaDelete, S33_Kelas, S34_KelasDelete, S35_Javascript, S36_HtmlForm, S37_Alur, S38_Kesimpulan } from './slides/partE.jsx'
import { PRESENTER_NOTES } from './data/presenterNotes.js'

const SLIDES = [
  { id: 'judul', tag: 'Pembuka', src: '-', Comp: S01_Title },
  { id: 'agenda', tag: 'Pembuka', src: '-', Comp: S02_Agenda },
  { id: 'overview', tag: 'Pembuka', src: '-', Comp: S03_Overview },
  { id: 'tujuan', tag: 'Pembuka', src: 'config/koneksi.php', Comp: S04_Tujuan },
  { id: 'struktur', tag: 'Pembuka', src: '-', Comp: S05_Struktur },
  { id: 'skema', tag: 'Database', src: 'DB/database.sql', Comp: S06_Skema },
  { id: 'koneksi-file', tag: 'Koneksi', src: 'config/koneksi.php', Comp: S07_KoneksiFile },
  { id: 'new-pdo', tag: 'Koneksi', src: 'config/koneksi.php', Comp: S08_NewPdo },
  { id: 'errmode', tag: 'Koneksi', src: 'config/koneksi.php', Comp: S09_ErrMode },
  { id: 'try-catch', tag: 'Koneksi', src: 'config/koneksi.php, siswa/index.php', Comp: S10_TryCatch },
  { id: 'die', tag: 'Koneksi', src: 'config/koneksi.php', Comp: S11_Die },
  { id: 'ringkas-koneksi', tag: 'Koneksi', src: 'config/koneksi.php', Comp: S12_RingkasKoneksi },
  { id: 'require-once', tag: 'Koneksi', src: 'semua modul', Comp: S13_RequireOnce },
  { id: 'peta-pdo', tag: 'Query', src: 'semua modul', Comp: S14_PetaPdo },
  { id: 'query', tag: 'Query', src: 'kelas/index.php:3', Comp: S15_Query },
  { id: 'prepare', tag: 'Query', src: 'siswa/tambah.php, kelas/edit.php', Comp: S16_Prepare },
  { id: 'execute', tag: 'Query', src: 'siswa/tambah.php:9', Comp: S17_Execute },
  { id: 'fetchall', tag: 'Query', src: 'siswa/index.php:7, kelas/index.php:3', Comp: S18_FetchAll },
  { id: 'fetch', tag: 'Query', src: 'siswa/edit.php:11', Comp: S19_Fetch },
  { id: 'prepared', tag: 'Keamanan', src: 'siswa/tambah.php, siswa/edit.php', Comp: S20_Prepared },
  { id: 'htmlspecialchars', tag: 'Keamanan', src: 'kelas/index.php:27-29', Comp: S21_Htmlspecialchars },
  { id: 'superglobal', tag: 'Logika', src: 'siswa/tambah.php, siswa/index.php', Comp: S22_Superglobal },
  { id: 'isset', tag: 'Logika', src: 'siswa/tambah.php:5, kelas/index.php:38', Comp: S23_Isset },
  { id: 'coalesce', tag: 'Logika', src: 'siswa/edit.php:3, kelas/edit.php:3', Comp: S24_Coalesce },
  { id: 'header-exit', tag: 'Logika', src: 'siswa/edit.php:4-7', Comp: S25_HeaderExit },
  { id: 'foreach', tag: 'Tampilan', src: 'siswa/index.php:29-42', Comp: S26_Foreach },
  { id: 'ternary', tag: 'Tampilan', src: 'siswa/edit.php:48', Comp: S27_Ternary },
  { id: 'siswa-intro', tag: 'Modul Siswa', src: 'siswa/*.php', Comp: S28_SiswaIntro },
  { id: 'siswa-create', tag: 'Modul Siswa', src: 'siswa/tambah.php:3-13', Comp: S29_SiswaCreate },
  { id: 'siswa-read', tag: 'Modul Siswa', src: 'siswa/index.php:3-7', Comp: S30_SiswaRead },
  { id: 'siswa-update', tag: 'Modul Siswa', src: 'siswa/edit.php:9-20', Comp: S31_SiswaUpdate },
  { id: 'siswa-delete', tag: 'Modul Siswa', src: 'siswa/index.php:45-53', Comp: S32_SiswaDelete },
  { id: 'kelas', tag: 'Modul Kelas', src: 'kelas/*.php', Comp: S33_Kelas },
  { id: 'kelas-delete', tag: 'Modul Kelas', src: 'kelas/index.php:38-46', Comp: S34_KelasDelete },
  { id: 'javascript', tag: 'Client Side', src: 'siswa/tambah.php:10, siswa/index.php:39', Comp: S35_Javascript },
  { id: 'html-form', tag: 'Client Side', src: 'siswa/tambah.php:26-61', Comp: S36_HtmlForm },
  { id: 'alur', tag: 'Alur', src: 'semua modul', Comp: S37_Alur },
  { id: 'kesimpulan', tag: 'Penutup', src: '-', Comp: S38_Kesimpulan },
]

const variants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 64 : -64, filter: 'blur(6px)' }),
  center: { opacity: 1, x: 0, filter: 'blur(0px)' },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -64 : 64, filter: 'blur(6px)' }),
}

function Icon({ name }) {
  const paths = {
    left: 'M15 18l-6-6 6-6',
    right: 'M9 6l6 6-6 6',
    full: 'M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5',
    grid: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',
    notes: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20 M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15z M8 6h8 M8 10h8 M8 14h5',
    close: 'M18 6L6 18 M6 6l12 12',
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={paths[name]} />
    </svg>
  )
}

export default function App() {
  const [[index, dir], setState] = useState(() => {
    /* Dukungan deep-link: index.html#12 membuka slide 12 */
    const fromHash = parseInt(window.location.hash.replace('#', ''), 10)
    if (Number.isFinite(fromHash) && fromHash >= 1 && fromHash <= SLIDES.length) {
      return [fromHash - 1, 0]
    }
    return [0, 0]
  })
  const [overview, setOverview] = useState(false)
  const [showNotes, setShowNotes] = useState(false)
  const total = SLIDES.length

  const go = useCallback(
    (next) => {
      setState(([cur]) => {
        const target = Math.max(0, Math.min(total - 1, next))
        if (target === cur) return [cur, 0]
        return [target, target > cur ? 1 : -1]
      })
    },
    [total]
  )

  /* Sinkronkan nomor slide ke hash URL supaya bisa di-bookmark / dibuka langsung */
  useEffect(() => {
    const wanted = '#' + (index + 1)
    if (window.location.hash !== wanted) {
      window.history.replaceState(null, '', wanted)
    }
  }, [index])

  const next = useCallback(() => go(index + 1), [go, index])
  const prev = useCallback(() => go(index - 1), [go, index])

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {})
    } else {
      document.exitFullscreen?.()
    }
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault()
        next()
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault()
        prev()
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen()
      } else if (e.key === 'Escape') {
        setOverview(false)
        setShowNotes(false)
      } else if (e.key === 'o' || e.key === 'O') {
        setOverview((v) => !v)
      } else if (e.key === 'n' || e.key === 'N') {
        setShowNotes((v) => !v)
      } else if (e.key === 'Home') {
        go(0)
      } else if (e.key === 'End') {
        go(total - 1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev, toggleFullscreen, go, total])

  const Current = SLIDES[index].Comp
  const currentNote = PRESENTER_NOTES[index] || {
    speaker: 'Presenter',
    topic: SLIDES[index].tag,
    script: 'Silakan jelaskan materi slide ini.',
    fokus: 'Pahami logika dan alur kode.',
    qna: 'Siap menjawab pertanyaan.',
  }
  const progress = useMemo(() => ((index + 1) / total) * 100, [index, total])

  return (
    <div className="deck">
      <div className="deck-art" aria-hidden="true" />
      <div className="deck-vig" aria-hidden="true" />
      <div className="deck-marks" aria-hidden="true" />

      <div className="progress" aria-hidden="true">
        <motion.span animate={{ width: `${progress}%` }} transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }} />
      </div>

      <header className="topnav">
        <span className="brand">PEMOGRAMAN WEB</span>
        <span className="src">
          {SLIDES[index].src !== '-' ? (
            <>
              <em>file:</em> {SLIDES[index].src}
            </>
          ) : (
            <em>slide</em>
          )}
        </span>
        <span className="meta">
          {SLIDES[index].tag} / {String(index + 1).padStart(2, '0')} - {String(total).padStart(2, '0')}
        </span>
      </header>

      <main className="stage">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={SLIDES[index].id}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.42, ease: [0.2, 0.8, 0.2, 1] }}
            style={{ width: '100%', display: 'grid', placeItems: 'center' }}
          >
            <Current />
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="controls">
        <div className="group">
          <button className="btn solid" onClick={next} disabled={index === total - 1}>
            <Icon name="right" /> Lanjut
          </button>
          <button className="btn" onClick={prev} disabled={index === 0}>
            <Icon name="left" /> Balik
          </button>
          <button
            className={'btn' + (showNotes ? ' solid' : '')}
            onClick={() => setShowNotes((v) => !v)}
            title="Buka / Tutup Naskah Presenter (N)"
          >
            <Icon name={showNotes ? 'close' : 'notes'} />
            {showNotes ? 'Tutup Naskah' : 'Naskah'}
          </button>
          <button className="btn" onClick={toggleFullscreen} title="Fullscreen (F)">
            <Icon name="full" /> Fullscreen
          </button>
          <button className="btn" onClick={() => setOverview((v) => !v)} title="Daftar Slide (O)">
            <Icon name="grid" /> Slide
          </button>
        </div>

        <div className="dots" aria-hidden="true">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              className={'dot' + (i === index ? ' on' : '')}
              onClick={() => go(i)}
              title={`${i + 1}. ${s.tag}`}
            />
          ))}
        </div>

        <span className="counter">
          <b>{String(index + 1).padStart(2, '0')}</b> / {String(total).padStart(2, '0')}
        </span>
      </footer>

      {/* Drawer Naskah & Panduan Presenter */}
      <AnimatePresence>
        {showNotes && (
          <motion.aside
            className="notes-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.24, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <div className="notes-header">
              <div>
                <span className="badge-speaker">{currentNote.speaker}</span>
                <span style={{ marginLeft: 10, fontSize: 11, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                  Slide {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                </span>
              </div>
              <button className="notes-close" onClick={() => setShowNotes(false)} title="Tutup (Esc)">
                <Icon name="close" />
              </button>
            </div>

            <div className="notes-content">
              <div style={{ marginBottom: 4 }}>
                <span className="notes-label">Topik Bahasan</span>
                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: 'var(--text)' }}>
                  {currentNote.topic}
                </h3>
              </div>

              <div className="notes-section script-section">
                <span className="notes-label">Naskah Penjelasan untuk Audiens</span>
                <p className="notes-script-text">{currentNote.script}</p>
              </div>

              <div className="notes-section">
                <span className="notes-label">Poin Kunci Penjelasan</span>
                <p className="notes-fokus-text">{currentNote.fokus}</p>
              </div>

              <div className="notes-section">
                <span className="notes-label">Antisipasi Pertanyaan Guru Penguji</span>
                <p className="notes-qna-text">{currentNote.qna}</p>
              </div>
            </div>

            <div className="notes-footer">
              <button className="btn" onClick={prev} disabled={index === 0} style={{ padding: '6px 14px' }}>
                <Icon name="left" /> Slide Sebelumnya
              </button>
              <button
                className="btn solid"
                onClick={next}
                disabled={index === total - 1}
                style={{ padding: '6px 14px' }}
              >
                Lanjut <Icon name="right" />
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Modal Overview / Grid Slide */}
      <AnimatePresence>
        {overview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOverview(false)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 60,
              background: 'rgba(0,0,0,0.88)',
              backdropFilter: 'blur(10px)',
              padding: '80px 40px 60px',
              overflowY: 'auto',
            }}
          >
            <div style={{ maxWidth: 1180, margin: '0 auto' }}>
              <span className="eyebrow">Daftar Slide</span>
              <h2 className="section-title" style={{ marginBottom: 24 }}>
                Lompat ke Bagian
              </h2>
              <div className="grid-3">
                {SLIDES.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={(e) => {
                      e.stopPropagation()
                      go(i)
                      setOverview(false)
                    }}
                    className={'card' + (i === index ? ' amber' : '')}
                    style={{ textAlign: 'left', cursor: 'pointer', font: 'inherit', color: 'inherit' }}
                  >
                    <span className="tag">
                      #{String(i + 1).padStart(2, '0')} - {s.tag}
                    </span>
                    <h4>{s.id.toUpperCase()}</h4>
                    <p style={{ fontSize: 12 }}>{s.src !== '-' ? `Sumber: ${s.src}` : 'Slide materi'}</p>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
