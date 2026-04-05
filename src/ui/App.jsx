import { Button } from '@theotible-pro/design-system'
import { PencilLine } from 'lucide-react'

export default function App() {
  function handleRename() {
    parent.postMessage({ pluginMessage: { type: 'rename' } }, '*')
  }

  return (
    <div style={{ padding: 16, backgroundColor: '#1e1e1e'}}>
      <Button
        onClick={handleRename}
        iconLeft={<PencilLine size={16} />}
        size="lg"
        variant="default"
      >
        Renommer les frames
      </Button>
    </div>
  )
}