import { StrictMode } from 'react'
import './index.css'
import App from './App.jsx'
import ReactDom from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import { router } from './routers.jsx'

ReactDom.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
