import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import MultipLayerMode from './components/MultipLayerMode'
import Leaderboard from './components/Leaderboard'
import TournamentManager from './components/TournamentManager'
import ParentTeacherDashboard from './components/ParentTeacherDashboard'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-surface-900 dark:via-surface-800 dark:to-surface-900">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/multiplayer" element={<MultipLayerMode />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/dashboard" element={<ParentTeacherDashboard />} />
        <Route path="/tournaments" element={<TournamentManager />} />
      </Routes>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="mt-16"
        toastClassName="rounded-xl shadow-soft"
      />
    </div>
  )
}

export default App