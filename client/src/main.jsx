import './index.css'
import ReactDom from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'

const App = React.lazy(() => import('./App.jsx'))

ReactDom.createRoot(document.getElementById('root')).render(
  <BrowserRouter >
      <App />
  </BrowserRouter>
)
