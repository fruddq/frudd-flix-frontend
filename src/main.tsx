import React from 'react'
import ReactDOM from 'react-dom/client'
import ComponentErrorBoundary from './components/ComponentErrorBoundary'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ComponentErrorBoundary>
      <App />
    </ComponentErrorBoundary>
  </React.StrictMode>,
)
