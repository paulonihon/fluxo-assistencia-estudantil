import { describe, it, expect } from 'vitest'
import { splitByTerms } from '../../components/TermText'

describe('splitByTerms', () => {
  it('marca siglas do glossário', () => {
    const partes = splitByTerms('A CGAE analisa via SUAP.', ['CGAE', 'SUAP'])
    expect(partes.filter((p) => p.term).map((p) => p.text)).toEqual(['CGAE', 'SUAP'])
  })
  it('não marca substring dentro de palavra', () => {
    const partes = splitByTerms('PAELLA não é PAE.', ['PAE'])
    expect(partes.filter((p) => p.term).map((p) => p.text)).toEqual(['PAE'])
  })
  it('prioriza termo mais longo', () => {
    const partes = splitByTerms('O PAAE usa o PAE.', ['PAE', 'PAAE'])
    expect(partes.filter((p) => p.term).map((p) => p.text)).toEqual(['PAAE', 'PAE'])
  })
})
