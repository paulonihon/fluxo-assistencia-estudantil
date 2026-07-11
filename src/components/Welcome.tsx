import { useState } from 'react'
import { useReactFlow } from '@xyflow/react'
import { Link } from 'react-router-dom'
import { useAppStore } from '../store'

function MiniCard({ cor, ator, rotulo, className }: { cor: string; ator: string; rotulo: string; className: string }) {
  return (
    <div
      className={`absolute w-[200px] rounded-2xl bg-white/[0.08] px-4 py-3 ring-1 ring-white/15 backdrop-blur-md ${className}`}
    >
      <div className="flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: cor }} />
        <span className="text-[9px] font-semibold uppercase tracking-wider text-white/60">{ator}</span>
      </div>
      <div className="mt-1 text-[12.5px] font-semibold leading-snug text-white/90">{rotulo}</div>
    </div>
  )
}

// prévia decorativa do fluxo para preencher a coluna direita em telas grandes
function FlowPreview() {
  return (
    <div className="relative h-[520px] w-[480px]">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 480 520" fill="none" aria-hidden="true">
        <path d="M70 62 C 110 62, 130 96, 152 118" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
        <path d="M250 180 C 262 214, 262 224, 254 252" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
        <path d="M292 300 C 330 322, 344 342, 350 372" stroke="rgba(74,222,128,0.5)" strokeWidth="1.5" />
        <path d="M212 300 C 174 322, 158 342, 150 372" stroke="rgba(252,165,165,0.55)" strokeWidth="1.5" strokeDasharray="5 4" />
      </svg>
      <div className="absolute left-[38px] top-[40px] flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-[13px] font-bold text-white shadow-lg shadow-black/25">
        ▶
      </div>
      <MiniCard cor="#34D399" ator="CGAE" rotulo="Elaboração do Edital" className="left-[150px] top-[96px]" />
      <div className="absolute left-[224px] top-[252px]">
        <div className="h-[52px] w-[52px] rotate-45 rounded-lg bg-gradient-to-br from-amber-200/80 to-amber-400/70 ring-1 ring-amber-200/60" />
        <div className="absolute inset-0 flex items-center justify-center text-[17px] font-bold text-amber-950">?</div>
      </div>
      <span className="absolute left-[314px] top-[318px] rounded-full bg-emerald-400/25 px-2 py-0.5 text-[10px] font-bold text-emerald-100 ring-1 ring-emerald-300/40">
        Sim
      </span>
      <span className="absolute left-[128px] top-[318px] rounded-full bg-red-400/20 px-2 py-0.5 text-[10px] font-bold text-red-100 ring-1 ring-red-300/40">
        Não
      </span>
      <MiniCard cor="#A78BFA" ator="Discentes" rotulo="Inscrições pelo SUAP" className="left-[268px] top-[376px]" />
      <MiniCard cor="#38BDF8" ator="Comunicação" rotulo="Publicação do Edital" className="left-[16px] top-[376px]" />
    </div>
  )
}

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

      <div className="relative mx-auto flex h-full max-w-[1440px] items-center overflow-y-auto px-6 py-10 md:px-16 lg:px-20">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1fr_auto]">
          <div className="max-w-[720px]">
            <h1 className="font-display text-[44px] font-bold leading-[1.02] tracking-tight text-white md:text-[68px] xl:text-[80px]">
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
          <div className="hidden justify-end lg:flex">
            <FlowPreview />
          </div>
        </div>
      </div>
    </div>
  )
}
