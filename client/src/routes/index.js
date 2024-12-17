import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from '../App';
import DefaultLayout from '../Pages/Admin/DefaultLayout/DefaultLayout';
import BlogList from '../Pages/Blog/Blogger';
import LoginUser from '../Pages/Login/LoginUser';
import RegisterUser from '../Pages/Register/RegisterUser';
import BlogManagement from '../Pages/Admin/Blogs/BlogManagement';

// Public và Private Routes
export const publicRoutes = [
  { path: '/', element: <App /> },
  { path: '/login', element: <LoginUser /> },
  { path: '/register', element: <RegisterUser /> },
  { path: '/blog', element: <BlogList /> },
];

export const privateRoute = [
  { path: '/admin', element: <DefaultLayout /> },
  { path: '/admin/blog-management', element: <BlogManagement /> },
];

// Component chính chứa tất cả routes
function AppRouter() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        {publicRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}

        {/* Private Routes */}
        {privateRoute.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Router>
  );
}

export default AppRouter;
