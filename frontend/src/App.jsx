import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

// Pages
import HomePage from './pages/HomePage'
import UserDashboard from './pages/user/UserDashboard'
import UserSubscriptions from './pages/user/UserSubscriptions'
import BrowsePlans from './pages/user/BrowsePlans'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminPlans from './pages/admin/AdminPlans'
import AdminAnalytics from './pages/admin/AdminAnalytics'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* home Route */}
          <Route path="/" element={<HomePage />} />

          {/* user Routes */}
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/user/subscriptions" element={<UserSubscriptions />} />
          <Route path="/user/plans" element={<BrowsePlans />} />

          {/* admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/plans" element={<AdminPlans />} />
          <Route path="/admin/analytics" element={<AdminAnalytics />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
