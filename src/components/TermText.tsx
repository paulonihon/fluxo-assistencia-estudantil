import { useEffect, useRef, useState } from 'react'
import glossario from '../data/glossario.json'

export interface ParteTexto {
  text: string
  term: boolean
}

function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export function splitByTerms(texto: string, siglas: string[]): ParteTexto[] {
  if (!siglas.length || !texto) return [{ text: texto, term: false }]
  const ordenadas = [...siglas].sort((a, b) => b.length - a.length).map(escapeRegex)
  const re = new RegExp(`(?<![\\p{L}\\p{N}])(${ordenadas.join('|')})(?![\\p{L}\\p{N}])`, 'gu')
  const partes: ParteTexto[] = []
  let ultimo = 0
  for (const m of texto.matchAll(re)) {
    const i = m.index ?? 0
    if (i > ultimo) partes.push({ text: texto.slice(ultimo, i), term: false })
    partes.push({ text: m[0], term: true })
    ultimo = i + m[0].length
  }
  if (ultimo < texto.length) partes.push({ text: texto.slice(ultimo), term: false })
  return partes
}

const siglasGlossario = glossario.termos.map((t) => t.sigla)

export function TermText({ texto }: { texto: string }) {
  const [aberto, setAberto] = useState<string | null>(null)
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const popoverRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!aberto) return
    const fechar = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) setAberto(null)
    }
    const esc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setAberto(null)
    }
    document.addEventListener('mousedown', fechar)
    document.addEventListener('keydown', esc)
    return () => {
      document.removeEventListener('mousedown', fechar)
      document.removeEventListener('keydown', esc)
    }
  }, [aberto])

  const termo = aberto ? glossario.termos.find((t) => t.sigla.toLowerCase() === aberto.toLowerCase()) : null
  const partes = splitByTerms(texto, siglasGlossario)

  return (
    <span>
      {partes.map((p, i) =>
        p.term ? (
          <button
            key={i}
            type="button"
            className="underline decoration-dotted decoration-blue-600 underline-offset-2 text-blue-800 hover:bg-blue-50 rounded-sm"
            onClick={(e) => {
              const r = (e.target as HTMLElement).getBoundingClientRect()
              setPos({ x: r.left, y: r.bottom + 6 })
              setAberto(p.text)
            }}
          >
            {p.text}
          </button>
        ) : (
          <span key={i}>{p.text}</span>
        ),
      )}
      {termo ? (
        <div
          ref={popoverRef}
          className="fixed z-50 max-w-[280px] rounded-lg border border-gray-300 bg-white p-3 shadow-lg text-[13px] leading-snug"
          style={{ left: Math.min(pos.x, window.innerWidth - 296), top: Math.min(pos.y, window.innerHeight - 160) }}
        >
          <div className="font-semibold text-gray-900">{termo.nome}</div>
          <div className="mt-1 text-gray-700">{termo.definicao}</div>
        </div>
      ) : null}
    </span>
  )
}
