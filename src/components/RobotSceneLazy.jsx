import React, { Suspense, lazy } from 'react'

/* Lazy-load komponen 3D: slide pertama tetap muncul instan,
   three.js di-download di belakang layar. */
const RobotScene = lazy(() =>
  import('./RobotScene.jsx').then((m) => ({ default: m.RobotScene }))
)

function Placeholder() {
  return (
    <div className="scene3d scene-loading">
      <span className="scene-spinner" />
      <span className="scene-loading-text">Memuat model 3D</span>
    </div>
  )
}

export function RobotSceneLazy(props) {
  return (
    <Suspense fallback={<Placeholder />}>
      <RobotScene {...props} />
    </Suspense>
  )
}
