import { useState } from 'react'
import { useAppStore } from '../store'

const CHAVE = 'banner-trilha-dispensado'

export function NarrowBanner() {
  const setTour = useAppStore((s) => s.setTour)
  const [visivel, setVisivel] = useState(
    () => window.innerWidth < 360 && localStorage.getItem(CHAVE) !== '1',
  )
  if (!visivel) return null

  const dispensar = () => {
    localStorage.setItem(CHAVE, '1')
    setVisivel(false)
  }

  return (
    <div className="flex items-center gap-2 bg-emerald-50 border-b border-emerald-200 px-3 py-2 text-[12px] text-emerald-900">
      <span className="flex-1">Em telas pequenas, a trilha guiada facilita a leitura do fluxo.</span>
      <button
        type="button"
        className="shrink-0 rounded bg-emerald-700 px-2 py-1 font-semibold text-white"
        onClick={() => {
          setTour({ ativo: true, atual: 'inicio', historico: [] })
          dispensar()
        }}
      >
        Iniciar
      </button>
      <button type="button" aria-label="Dispensar aviso" className="shrink-0 px-1 text-emerald-700" onClick={dispensar}>
        ✕
      </button>
    </div>
  )
}
