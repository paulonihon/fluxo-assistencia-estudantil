import { ReactFlowProvider } from '@xyflow/react'
import { FlowCanvas } from './components/FlowCanvas'
import { DetailPanel } from './components/DetailPanel'
import { GuidedTour } from './components/GuidedTour'
import { Header } from './components/Header'
import { Glossary } from './components/Glossary'

export default function App() {
  return (
    <ReactFlowProvider>
      <div className="flex h-full flex-col">
        <Header />
        <div className="relative min-h-0 flex-1">
          <FlowCanvas />
          <DetailPanel />
          <GuidedTour />
        </div>
        <Glossary />
      </div>
    </ReactFlowProvider>
  )
}
