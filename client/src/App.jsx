import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'

const Home = lazy(() => import('./pages/Home.jsx'))
const Dashboard = lazy(() => import('./pages/Dashboard.jsx'))
const Community = lazy(() => import('./pages/Community.jsx'))
const GenerateImages = lazy(() => import('./pages/GenerateImages.jsx'))
const BlogTitles = lazy(() => import('./pages/BlogTitles.jsx'))
const WriteArticles = lazy(() => import('./pages/WriteArticales.jsx'))
const RemoveBackground = lazy(() => import('./pages/RemoveBackground.jsx'))
const RemoveObjects = lazy(() => import('./pages/RemoveObjects.jsx'))
const ReviewResume = lazy(() => import('./pages/ReviewResume.jsx'))
const Layout = lazy(() => import('./pages/Layout.jsx'))

const App = () => {
  return (
    <>
      <Suspense fallback={<div className="p-6 text-center">Loading...</div>}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/pages' element={<Layout />}>
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='community' element={<Community />} />
            <Route path='generate-images' element={<GenerateImages />} />
            <Route path='blog-titles' element={<BlogTitles />} />
            <Route path='write-articles' element={<WriteArticles />} />
            <Route path='remove-background' element={<RemoveBackground />} />
            <Route path='remove-objects' element={<RemoveObjects />} />
            <Route path='review-resume' element={<ReviewResume />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  )
}

export default App