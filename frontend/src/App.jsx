import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import './App.css'

// Components
import ProtectedRoute from './components/auth/ProtectedRoute'
import AuthLayout from './components/auth/AuthLayout'

// Pages
import HomePage from './pages/HomePage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import UserDashboard from './pages/user/UserDashboard'
import UserSubscriptions from './pages/user/UserSubscriptions'
import BrowsePlans from './pages/user/BrowsePlans'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminPlans from './pages/admin/AdminPlans'
import AdminAnalytics from './pages/admin/AdminAnalytics'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />

            {/* Auth Routes */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>

            {/* Protected User Routes */}
            <Route
              path="/user/dashboard"
              element={
                <ProtectedRoute allowedRoles={['USER', 'ADMIN']}>
                  <UserDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/subscriptions"
              element={
                <ProtectedRoute allowedRoles={['USER', 'ADMIN']}>
                  <UserSubscriptions />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/plans"
              element={
                <ProtectedRoute allowedRoles={['USER', 'ADMIN']}>
                  <BrowsePlans />
                </ProtectedRoute>
              }
            />

            {/* Protected Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/plans"
              element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <AdminPlans />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/analytics"
              element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <AdminAnalytics />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </Provider>
  )
}

export default App
