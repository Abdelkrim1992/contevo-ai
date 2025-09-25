import { Suspense, lazy, React } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ProtectedRoute from './components/ProtectedRoute'
import { Loader } from 'lucide-react'
import { LoaderOne } from './components/ui/loader'

const Home = lazy(() => import('./pages/home/Home.jsx'))
const AuthLayout = lazy(() => import('./pages/auth/auth-layout.jsx'))
const SignInPage = lazy(() => import('./pages/auth/sign-in.jsx'))
const SignUpPage = lazy(() => import('./pages/auth/sign-up.jsx'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'))

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <LoaderOne />
      </div>
    }>
      <Routes>
        
        <Route path='/' element={<Home />} />
        
        
        <Route path='/auth' element={
          isAuthenticated ? <Navigate to="/dashboard/home" /> : <AuthLayout />
        }>
          <Route path='signin' element={<SignInPage />} />
          <Route path='signup' element={<SignUpPage />} />
        </Route>

        <Route path='/dashboard/*' element={<ProtectedRoute/>} />

        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  )
}

export default App