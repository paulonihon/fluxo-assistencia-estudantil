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
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-[#0E4429]/40 p-4 backdrop-blur-[2px]">
      <div className="w-full max-w-[520px] rounded-3xl bg-white p-6 md:p-8 shadow-2xl">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0E4429] font-display text-[18px] font-bold text-white">
          AE
        </div>
        <h2 className="mt-4 font-display text-[22px] md:text-[26px] font-bold leading-tight text-[#1C2B24]">
          Como funciona a assistência estudantil?
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-gray-600">
          Este guia mostra, etapa por etapa, o caminho dos auxílios estudantis no IFBA campus Juazeiro:
          do edital à inscrição, da análise ao pagamento. Toque em qualquer etapa para entender o que
          acontece, quem é o responsável e o que você precisa fazer.
        </p>
        <div className="mt-6 flex flex-col gap-2">
          <button
            type="button"
            className="w-full rounded-2xl bg-[#0E4429] px-4 py-3.5 text-[15px] font-semibold text-white hover:bg-[#14532D]"
            onClick={() => {
              setVisivel(false)
              setTour({ ativo: true, atual: 'inicio', historico: [] })
            }}
          >
            ▶ Percorrer o fluxo passo a passo
          </button>
          <button
            type="button"
            className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-[14px] font-semibold text-gray-700 hover:bg-gray-50"
            onClick={() => setVisivel(false)}
          >
            Explorar o mapa por conta própria
          </button>
          <button
            type="button"
            className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-[14px] font-semibold text-gray-700 hover:bg-gray-50"
            onClick={verCompleto}
          >
            ⛶ Ver o fluxograma completo em tela cheia
          </button>
        </div>
      </div>
    </div>
  )
}
