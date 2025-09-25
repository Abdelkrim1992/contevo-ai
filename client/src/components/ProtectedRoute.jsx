import { useSelector } from 'react-redux';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { lazy } from 'react';
const Dashboard = lazy(() => import('@/pages/dashboard/Dashboard.jsx'))
const Community = lazy(() => import('@/pages/dashboard/Community.jsx'))
const GenerateImages = lazy(() => import('@/pages/dashboard/GenerateImages.jsx'))
const BlogTitles = lazy(() => import('@/pages/dashboard/BlogTitles.jsx')) 
const WriteArticles = lazy(() => import('@/pages/dashboard/WriteArticales.jsx'))
const RemoveBackground = lazy(() => import('@/pages/dashboard/RemoveBackground.jsx'))
const RemoveObjects = lazy(() => import('@/pages/dashboard/RemoveObjects.jsx'))
const ReviewResume = lazy(() => import('@/pages/dashboard/ReviewResume.jsx'))
const DashboardLayout = lazy(() => import('@/pages/dashboard/DashboardLayout.jsx'))

const ProtectedRoute = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const token = useSelector((state) => state.auth.token);
  const location = useLocation();

  // Check if user is authenticated (has token and isAuthenticated is true)
  if (!isAuthenticated || !token) {
    // Redirect to sign-in page, but remember where they were trying to go
    return <Navigate to="/auth/signin" state={{ from: location }} replace />;
  }

  return (
    <Routes>
        <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Navigate to="/dashboard/home" replace />} />
            <Route path='home' element={<Dashboard />} />
            <Route path='community' element={<Community />} />
            <Route path='generate-images' element={<GenerateImages />} />
            <Route path='blog-titles' element={<BlogTitles />} />
            <Route path='write-articles' element={<WriteArticles />} />
            <Route path='remove-background' element={<RemoveBackground />} />
            <Route path='remove-objects' element={<RemoveObjects />} />
            <Route path='review-resume' element={<ReviewResume />} />
        </Route>
    </Routes>
  )
};

export default ProtectedRoute; 