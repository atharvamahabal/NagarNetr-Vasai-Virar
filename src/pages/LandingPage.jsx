import { Link } from 'react-router-dom'
import { Camera, MapPin, Send, ArrowRight, Users, ClipboardList, Info } from 'lucide-react'

const LandingPage = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-secondary text-white px-6 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-primary mb-2">NagarNetr</h1>
        <h2 className="text-xl md:text-2xl font-medium mb-6">नगर नेत्र - आपलं शहर, आपली जबाबदारी</h2>
        <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
          Report civic issues like potholes, garbage, and broken streetlights. 
          Reach your Nagarsevak (ward corporator) directly based on your GPS location in Vasai-Virar.
        </p>
        <Link 
          to="/report" 
          className="inline-flex items-center gap-2 bg-primary hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-transform active:scale-95"
        >
          Report an Issue
          <ArrowRight size={20} />
        </Link>
      </section>

      {/* Stats Bar */}
      <section className="bg-primary text-white py-4 px-6 flex justify-around items-center text-center">
        <div>
          <p className="text-2xl font-bold leading-none">115</p>
          <p className="text-[10px] uppercase tracking-wider">Nagarsevaks</p>
        </div>
        <div className="w-px h-8 bg-white/30" />
        <div>
          <p className="text-2xl font-bold leading-none">29</p>
          <p className="text-[10px] uppercase tracking-wider">Wards</p>
        </div>
        <div className="w-px h-8 bg-white/30" />
        <div>
          <p className="text-lg font-bold leading-none leading-tight">VVMC</p>
          <p className="text-[10px] uppercase tracking-wider">VVMC Corp.</p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="px-6 py-16 bg-white">
        <h3 className="text-2xl font-bold text-secondary text-center mb-12">How it works</h3>
        <div className="grid md:grid-cols-3 gap-12 max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-orange-100 text-primary rounded-full flex items-center justify-center mb-4">
              <Camera size={40} />
            </div>
            <h4 className="font-bold text-lg mb-2">1. Click Photo</h4>
            <p className="text-gray-600">Take a photo of the civic issue (pothole, garbage, etc.)</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-blue-100 text-secondary rounded-full flex items-center justify-center mb-4">
              <MapPin size={40} />
            </div>
            <h4 className="font-bold text-lg mb-2">2. GPS Detects Ward</h4>
            <p className="text-gray-600">The app automatically detects your ward and Nagarsevak.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
              <Send size={40} />
            </div>
            <h4 className="font-bold text-lg mb-2">3. Nagarsevak Notified</h4>
            <p className="text-gray-600">Your complaint is sent directly to your elected representative.</p>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="bg-gray-50 px-6 py-12 border-t border-gray-200">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/map" className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center gap-2 text-center">
            <MapIcon className="text-primary" size={24} />
            <span className="text-sm font-medium">Ward Map</span>
          </Link>
          <Link to="/directory" className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center gap-2 text-center">
            <Users className="text-primary" size={24} />
            <span className="text-sm font-medium">Directory</span>
          </Link>
          <Link to="/tracker" className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center gap-2 text-center">
            <ClipboardList className="text-primary" size={24} />
            <span className="text-sm font-medium">My Trackers</span>
          </Link>
          <Link to="/about" className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center gap-2 text-center">
            <Users className="text-primary" size={24} />
            <span className="text-sm font-medium">About VVMC</span>
          </Link>
        </div>
      </section>
    </div>
  )
}

// Re-using icon for quick links
const MapIcon = MapPin;

export default LandingPage
