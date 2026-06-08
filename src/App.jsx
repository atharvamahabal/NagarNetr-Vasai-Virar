import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import BottomNav from './components/BottomNav'
import LandingPage from './pages/LandingPage'
import ReportPage from './pages/ReportPage'
import MapPage from './pages/MapPage'
import TrackerPage from './pages/TrackerPage'
import DirectoryPage from './pages/DirectoryPage'
import AboutPage from './pages/AboutPage'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-1 pb-20 md:pb-0">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/report" element={<ReportPage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/tracker" element={<TrackerPage />} />
            <Route path="/directory" element={<DirectoryPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
        <BottomNav />
      </div>
    </Router>
  )
}

export default App
