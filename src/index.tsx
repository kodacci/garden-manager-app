import { createRoot } from 'react-dom/client'
import { App } from '@app/app'

const rootDiv = document.getElementById('root')
if (rootDiv) {
  const root = createRoot(rootDiv)
  root.render(<App />)
}
