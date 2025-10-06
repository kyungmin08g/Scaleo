import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

const container = document.getElementById('root')
if (!container) throw new Error('Root container missing')

const root = ReactDOM.createRoot(container)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
