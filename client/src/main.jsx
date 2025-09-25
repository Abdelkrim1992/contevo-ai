import './index.css'
import ReactDom from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { ClerkProvider } from '@clerk/clerk-react'

const App = React.lazy(() => import('./App.jsx'))

ReactDom.createRoot(document.getElementById('root')).render(
  <BrowserRouter >
    <ClerkProvider frontendApi={import.meta.env.VITE_CLERK_FRONTEND_API} publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
      <Provider store={store}>
        <App />
      </Provider>
    </ClerkProvider>
  </BrowserRouter>
)
