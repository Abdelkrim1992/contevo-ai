import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Community from "./pages/Community.jsx";
import GenerateImages from "./pages/GenerateImages.jsx";
import BlogTitles from "./pages/BlogTitles.jsx";
import WriteArticles from "./pages/WriteArticales.jsx";
import RemoveBackground from "./pages/RemoveBackground.jsx";
import RemoveObjects from "./pages/RemoveObjects.jsx";
import ReviewResume from "./pages/ReviewResume.jsx";

export const router = createBrowserRouter([
    {
      path:'/',
      element : <Home />,
      errorElement : <NotFoundPage />
    },
    {
      path:'/dashboard',
      element : <Dashboard />,
    },
    {
      path :'/community',
      element : <Community />
    },
    {
      path :'/generate-images',
      element : <GenerateImages />
    },
    {
      path :'/blog-titles',
      element : <BlogTitles />
    },
    {
      path :'/write-articles',
      element : <WriteArticles />
    },
    {
      path :'/remove-background',
      element : <RemoveBackground />
    },
    {
      path :'/remove-objects',
      element : <RemoveObjects />
    },
    {
      path :'/review-resume',
      element : <ReviewResume />
    },
  ])