import { Route, Routes } from 'react-router-dom'
import { ReactFlowProvider } from '@xyflow/react'
import { FlowCanvas } from './components/FlowCanvas'
import { DetailPanel } from './components/DetailPanel'
import { GuidedTour } from './components/GuidedTour'
import { Header } from './components/Header'
import { Glossary } from './components/Glossary'
import { NarrowBanner } from './components/NarrowBanner'
import { Welcome } from './components/Welcome'
import { Sobre } from './pages/Sobre'

function FlowPage() {
  return (
    <ReactFlowProvider>
      <div className="flex h-full flex-col">
        <Header />
        <NarrowBanner />
        <div className="relative min-h-0 flex-1">
          <FlowCanvas />
          <DetailPanel />
          <GuidedTour />
          <Welcome />
        </div>
        <Glossary />
      </div>
    </ReactFlowProvider>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<FlowPage />} />
      <Route path="/sobre" element={<Sobre />} />
    </Routes>
  )
}
