import { Suspense, lazy, React } from 'react'
import { Routes, Route } from 'react-router-dom'

const Home = lazy(() => import('./pages/home/Home.jsx'))
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard.jsx'))
const Community = lazy(() => import('./pages/dashboard/Community.jsx'))
const GenerateImages = lazy(() => import('./pages/dashboard/GenerateImages.jsx'))
const BlogTitles = lazy(() => import('./pages/dashboard/BlogTitles.jsx'))
const WriteArticles = lazy(() => import('./pages/dashboard/WriteArticales.jsx'))
const RemoveBackground = lazy(() => import('./pages/dashboard/RemoveBackground.jsx'))
const RemoveObjects = lazy(() => import('./pages/dashboard/RemoveObjects.jsx'))
const ReviewResume = lazy(() => import('./pages/dashboard/ReviewResume.jsx'))
const Layout = lazy(() => import('./pages/Layout.jsx'))
const AuthLayout = lazy(() => import ('./pages/auth/auth-layout.jsx'))
const SignInPage = lazy(() => import('./pages/auth/sign-in.jsx'))
const SignUpPage = lazy(() => import('./pages/auth/sign-up.jsx'))

const App = () => {
  return (
    <>
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/dashboard' element={<Layout />}>
            <Route path='home' element={<Dashboard />} />
            <Route path='community' element={<Community />} />
            <Route path='generate-images' element={<GenerateImages />} />
            <Route path='blog-titles' element={<BlogTitles />} />
            <Route path='write-articles' element={<WriteArticles />} />
            <Route path='remove-background' element={<RemoveBackground />} />
            <Route path='remove-objects' element={<RemoveObjects />} />
            <Route path='review-resume' element={<ReviewResume />} />
          </Route>
          <Route path='/auth' element={<AuthLayout/>}>
            <Route path='sign-in' element={<SignInPage />} />
            <Route path='sign-up' element={<SignUpPage />} />
          </Route>
        </Routes>
    </>
  )
}

export default App