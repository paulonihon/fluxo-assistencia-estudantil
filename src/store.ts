import { create } from 'zustand'

interface TourState {
  ativo: boolean
  atual: string | null
  historico: string[]
}

interface AppState {
  selectedNodeId: string | null
  laneFilter: string | null
  glossarioAberto: boolean
  tour: TourState
  select: (id: string) => void
  clearSelection: () => void
  setLaneFilter: (id: string | null) => void
  setGlossarioAberto: (aberto: boolean) => void
  setTour: (t: Partial<TourState>) => void
}

export const useAppStore = create<AppState>((set) => ({
  selectedNodeId: null,
  laneFilter: null,
  glossarioAberto: false,
  tour: { ativo: false, atual: null, historico: [] },
  select: (id) => set({ selectedNodeId: id }),
  clearSelection: () => set({ selectedNodeId: null }),
  setLaneFilter: (id) => set({ laneFilter: id }),
  setGlossarioAberto: (aberto) => set({ glossarioAberto: aberto }),
  setTour: (t) => set((s) => ({ tour: { ...s.tour, ...t } })),
}))
