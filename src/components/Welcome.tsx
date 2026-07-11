import { useState } from 'react'
import { useReactFlow } from '@xyflow/react'
import { useAppStore } from '../store'

export function Welcome() {
  const [visivel, setVisivel] = useState(true)
  const setTour = useAppStore((s) => s.setTour)
  const { fitView } = useReactFlow()

  const verCompleto = () => {
    setVisivel(false)
    document.documentElement.requestFullscreen?.().catch(() => {})
    setTimeout(() => fitView({ padding: 0.04, duration: 700 }), 150)
  }

  if (!visivel) return null

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-gradient-to-br from-emerald-950/50 via-emerald-900/40 to-emerald-950/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-[540px] overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-black/5">
        <div className="h-1.5 w-full bg-gradient-to-r from-emerald-700 via-emerald-500 to-emerald-700" />
        <div className="p-7 md:p-10">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-700 to-emerald-950 font-display text-[18px] font-bold text-white shadow-md shadow-emerald-900/25 ring-1 ring-emerald-950/20">
            AE
          </div>
          <h2 className="mt-6 font-display text-[24px] font-bold leading-tight tracking-tight text-[#14201A] md:text-[28px]">
            Como funciona a assistência estudantil?
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-gray-600">
            Este guia mostra, etapa por etapa, o caminho dos auxílios estudantis no IFBA campus Juazeiro:
            do edital à inscrição, da análise ao pagamento. Toque em qualquer etapa para entender o que
            acontece, quem é o responsável e o que você precisa fazer.
          </p>
          <div className="mt-8 space-y-3">
            <button
              type="button"
              className="w-full rounded-2xl bg-gradient-to-b from-emerald-800 to-emerald-950 px-5 py-4 text-[15px] font-semibold text-white shadow-lg shadow-emerald-900/25 ring-1 ring-emerald-950/30 transition-all hover:shadow-xl hover:brightness-110"
              onClick={() => {
                setVisivel(false)
                setTour({ ativo: true, atual: 'inicio', historico: [] })
              }}
            >
              ▶ Percorrer o fluxo passo a passo
            </button>
            <button
              type="button"
              className="w-full rounded-2xl bg-white px-5 py-3.5 text-[14px] font-semibold text-gray-700 shadow-sm ring-1 ring-gray-200 transition-colors hover:bg-gray-50 hover:ring-gray-300"
              onClick={() => setVisivel(false)}
            >
              Explorar o mapa por conta própria
            </button>
            <button
              type="button"
              className="w-full rounded-2xl bg-white px-5 py-3.5 text-[14px] font-semibold text-gray-700 shadow-sm ring-1 ring-gray-200 transition-colors hover:bg-gray-50 hover:ring-gray-300"
              onClick={verCompleto}
            >
              ⛶ Ver o fluxograma completo em tela cheia
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
