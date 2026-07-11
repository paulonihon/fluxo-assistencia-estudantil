import { useEffect, useMemo, useState } from 'react'
import glossario from '../data/glossario.json'
import { useAppStore } from '../store'

export function Glossary() {
  const aberto = useAppStore((s) => s.glossarioAberto)
  const setAberto = useAppStore((s) => s.setGlossarioAberto)
  const [busca, setBusca] = useState('')

  useEffect(() => {
    if (!aberto) return
    const esc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setAberto(false)
    }
    document.addEventListener('keydown', esc)
    return () => document.removeEventListener('keydown', esc)
  }, [aberto, setAberto])

  const termos = useMemo(() => {
    const q = busca.trim().toLowerCase()
    return [...glossario.termos]
      .sort((a, b) => a.sigla.localeCompare(b.sigla, 'pt-BR'))
      .filter(
        (t) =>
          !q ||
          t.sigla.toLowerCase().includes(q) ||
          t.nome.toLowerCase().includes(q) ||
          t.definicao.toLowerCase().includes(q),
      )
  }, [busca])

  if (!aberto) return null

  return (
    <div
      className="fixed inset-0 z-40 flex items-end md:items-center justify-center bg-black/40"
      onClick={() => setAberto(false)}
    >
      <div
        className="flex h-[85vh] md:h-[78vh] w-full md:w-[840px] md:max-w-[92vw] flex-col rounded-t-2xl md:rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-4 md:px-6 py-3.5">
          <div className="font-display text-[18px] md:text-[20px] font-semibold text-[#1C2B24]">Glossário</div>
          <button
            type="button"
            aria-label="Fechar glossário"
            className="rounded-full p-1.5 text-gray-500 hover:bg-gray-100"
            onClick={() => setAberto(false)}
          >
            ✕
          </button>
        </div>
        <div className="px-4 md:px-6 py-2.5">
          <input
            type="search"
            placeholder="Buscar termo…"
            className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-[15px] outline-none focus:border-emerald-600"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>
        <div className="flex-1 overflow-y-auto px-4 md:px-6 pb-5">
          {termos.length === 0 ? (
            <div className="py-8 text-center text-[14px] text-gray-500">Nenhum termo encontrado.</div>
          ) : (
            termos.map((t) => (
              <div key={t.sigla} className="border-b border-gray-100 py-4">
                <div className="text-[16px] md:text-[17px] font-semibold text-[#1C2B24]">
                  {t.sigla}
                  {t.nome !== t.sigla ? <span className="ml-2 font-normal text-gray-500">{t.nome}</span> : null}
                </div>
                <div className="mt-1.5 text-[14px] md:text-[15px] leading-relaxed text-gray-700">{t.definicao}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
