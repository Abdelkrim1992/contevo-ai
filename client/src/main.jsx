import './index.css'
import ReactDom from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'
import { ClerkProvider } from '@clerk/clerk-react'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

const App = React.lazy(() => import('./App.jsx'))

ReactDom.createRoot(document.getElementById('root')).render(
  <BrowserRouter >
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl={'/'}>
      <App />
    </ClerkProvider>
  </BrowserRouter>
)
