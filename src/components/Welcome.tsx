import { useState } from 'react'
import { useReactFlow } from '@xyflow/react'
import { Link } from 'react-router-dom'
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
    <div className="fixed inset-0 z-50 overflow-hidden bg-gradient-to-br from-[#0F3D2E] via-[#1D5C46] to-[#0A2E22]">
      {/* círculos decorativos */}
      <div className="pointer-events-none absolute -right-[15%] top-[8%] h-[70vh] w-[70vh] rounded-full border border-white/10" />
      <div className="pointer-events-none absolute -right-[5%] bottom-[-30%] h-[80vh] w-[80vh] rounded-full border border-white/[0.07]" />
      <div className="pointer-events-none absolute left-[45%] top-[-25%] h-[60vh] w-[60vh] rounded-full bg-white/[0.04] blur-2xl" />
      <div className="pointer-events-none absolute bottom-[-20%] left-[-10%] h-[55vh] w-[55vh] rounded-full bg-emerald-300/[0.06] blur-3xl" />

      <div className="relative flex h-full flex-col justify-center overflow-y-auto px-6 py-10 md:px-16 lg:px-24">
        <div className="max-w-[860px]">
          <h1 className="font-display text-[44px] font-bold leading-[1.02] tracking-tight text-white md:text-[76px] lg:text-[88px]">
            Como funciona a assistência estudantil
          </h1>
          <p className="mt-5 max-w-[560px] text-[15px] leading-relaxed text-emerald-50/85 md:mt-7 md:text-[17px]">
            O caminho dos auxílios estudantis no IFBA campus Juazeiro, etapa por etapa: do edital à
            inscrição, da análise ao pagamento. Toque em qualquer etapa para entender o que acontece,
            quem é o responsável e o que você precisa fazer.
          </p>
          <div className="mt-8 flex max-w-[460px] flex-col gap-3 md:mt-10">
            <button
              type="button"
              className="w-full rounded-2xl bg-white px-5 py-4 text-[15px] font-semibold text-emerald-950 shadow-xl shadow-black/20 transition-all hover:shadow-2xl hover:brightness-95"
              onClick={() => {
                setVisivel(false)
                setTour({ ativo: true, atual: 'inicio', historico: [] })
              }}
            >
              ▶ Percorrer o fluxo passo a passo
            </button>
            <button
              type="button"
              className="w-full rounded-2xl bg-white/10 px-5 py-3.5 text-[14px] font-semibold text-white ring-1 ring-white/25 backdrop-blur transition-colors hover:bg-white/15"
              onClick={() => setVisivel(false)}
            >
              Explorar o mapa por conta própria
            </button>
            <button
              type="button"
              className="w-full rounded-2xl bg-white/10 px-5 py-3.5 text-[14px] font-semibold text-white ring-1 ring-white/25 backdrop-blur transition-colors hover:bg-white/15"
              onClick={verCompleto}
            >
              ⛶ Ver o fluxograma completo em tela cheia
            </button>
          </div>
          <Link
            to="/sobre"
            className="mt-6 inline-block text-[13px] font-medium text-emerald-100/70 underline decoration-emerald-100/30 underline-offset-4 transition-colors hover:text-white"
          >
            Sobre este guia e a pesquisa que o originou
          </Link>
        </div>
      </div>
    </div>
  )
}
