import { FlowCanvas } from './components/FlowCanvas'
import { DetailPanel } from './components/DetailPanel'

export default function App() {
  return (
    <div className="relative h-full">
      <FlowCanvas />
      <DetailPanel />
    </div>
  )
}
