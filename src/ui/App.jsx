import { Button } from '@theotible-pro/design-system'

export default function App() {
  function handleRename() {
    parent.postMessage({ pluginMessage: { type: 'rename' } }, '*')
  }

  return (
    <div style={{ padding: 16 }}>
      <Button onClick={handleRename}>
        Renommer les frames
      </Button>
    </div>
  )
}