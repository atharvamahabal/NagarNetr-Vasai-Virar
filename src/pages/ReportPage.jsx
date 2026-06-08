import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Camera, MapPin, MessageSquare, CheckCircle2, Loader2, Mail, ShieldCheck } from 'lucide-react'
import { WARD_DATA, ISSUE_CATEGORIES, getWardZone, EMAIL_TEMPLATES } from '../data/wards'
import { saveComplaint } from '../utils/storage'
import { cn } from '../utils/cn'

const ReportPage = () => {
  const navigate = useNavigate()
  const [photo, setPhoto] = useState(null)
  const [detecting, setDetecting] = useState(false)
  const [ward, setWard] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [description, setDescription] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [showMethodSelection, setShowMethodSelection] = useState(false)
  const [ticketNumber, setTicketNumber] = useState('')

  useEffect(() => {
    if (ward && selectedCategory) {
      const template = EMAIL_TEMPLATES[selectedCategory.id] || ''
      const nagarsevakName = ward.corporators[0]?.name || 'Nagarsevak'
      const wardInfo = `${ward.id} (${ward.name})`
      setDescription(template.replace('[NAME]', nagarsevakName).replace('[WARD]', wardInfo))
    }
  }, [ward, selectedCategory])

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setPhoto(URL.createObjectURL(file))
    }
  }

  const detectWard = () => {
    setDetecting(true)
    
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser")
      setDetecting(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        
        // Find the closest ward based on distance
        let closestWard = null
        let minDistance = Infinity

        WARD_DATA.forEach(w => {
          const dist = Math.sqrt(
            Math.pow(w.lat - latitude, 2) + Math.pow(w.lng - longitude, 2)
          )
          if (dist < minDistance) {
            minDistance = dist
            closestWard = w
          }
        })

        // VVMC approximate boundary check
        if (minDistance > 0.2) {
          alert("You appear to be outside the VVMC municipal limits. Please select your ward manually if you are reporting for a Vasai-Virar area.")
          setWard(null)
        } else {
          setWard(closestWard)
        }
        setDetecting(false)
      },
      (error) => {
        console.error("Error detecting location:", error)
        alert("Could not detect your location. Please select your ward manually.")
        setDetecting(false)
      },
      { enableHighAccuracy: true }
    )
  }

  const handleInitialSubmit = (e) => {
    e.preventDefault()
    if (!ward || !selectedCategory) return
    setShowMethodSelection(true)
  }

  const handleFinalSubmit = (method) => {
    const complaint = {
      wardId: ward.id,
      wardName: ward.name,
      category: selectedCategory.label,
      description,
      photo,
    }

    const saved = saveComplaint(complaint)
    setTicketNumber(saved.id)

    const zone = getWardZone(ward?.id)
    const nagarsevak = ward?.corporators[0]
    
    const emailSubject = zone 
      ? `Zone ${zone.code} (${zone.name}) — Ward ${ward.id} — ${selectedCategory?.label}`
      : `Ward ${ward?.id} — ${selectedCategory?.label}`
    
    const baseMessage = description || (EMAIL_TEMPLATES[selectedCategory?.id] || '')
      .replace('[NAME]', nagarsevak?.name || 'Nagarsevak')
      .replace('[WARD]', `${ward?.id} (${ward?.name})`)
    const photoNote = photo 
      ? "\n\n🚨 IMPORTANT: Please MANUALLY ATTACH the captured photo from your gallery to this message for proof." 
      : ""
    const nagarsevakRef = `\nThis road/area comes under Nagarsevak: ${nagarsevak?.name || 'Unknown'}`
    
    const fullMessage = `${baseMessage}${photoNote}${nagarsevakRef}\n\n` +
      `Location: Ward ${ward?.id} (${ward?.name})\n` +
      `Ticket Reference: ${saved.id}`

    if (method === 'whatsapp') {
      const whatsappUrl = `https://wa.me/${(nagarsevak?.phone || '919689900002').replace(/\D/g, '')}?text=${encodeURIComponent(fullMessage)}`
      window.open(whatsappUrl, '_blank')
    } else if (method === 'email') {
      const recipient = 'complaints@vvmc.in'
      const ccRecipient = 'commissioner@vvmc.in'
      const emailSubjectEncoded = encodeURIComponent(emailSubject)
      const fullMessageEncoded = encodeURIComponent(fullMessage)
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&cc=${ccRecipient}&su=${emailSubjectEncoded}&body=${fullMessageEncoded}`
      window.open(gmailUrl, '_blank')
    }

    setSubmitted(true)
    setShowMethodSelection(false)
  }

  if (submitted) {
    const zone = getWardZone(ward?.id)
    const nagarsevak = ward?.corporators[0]
    
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center py-12 animate-in fade-in duration-700">
        <div className="w-24 h-24 bg-primary text-secondary rounded-full flex items-center justify-center mb-6 animate-bounce shadow-lg border-4 border-white">
          <CheckCircle2 size={60} />
        </div>
        <h2 className="text-3xl font-bold text-secondary mb-2">Complaint Registered!</h2>
        <p className="text-gray-600 mb-8 text-sm">Your ticket has been generated and the message was sent.</p>
        
        <div className="bg-white border-2 border-dashed border-secondary rounded-xl p-8 mb-8 w-full max-w-sm shadow-md flex flex-col items-center hover:shadow-lg transition-shadow">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-2 font-bold">Complaint Ticket Number</p>
          <p className="text-4xl font-mono font-bold text-secondary tracking-tighter">{ticketNumber}</p>
        </div>

        <div className="p-4 bg-primary/10 rounded-xl border border-primary/20 mb-8 max-w-sm w-full mx-auto flex flex-col items-center">
            <h5 className="text-sm font-bold text-secondary mb-1 flex items-center gap-2">
              <ShieldCheck size={16} className="text-secondary" />
              Verified Submission
            </h5>
            <p className="text-[10px] text-secondary/70 font-bold uppercase tracking-widest text-center">
              Logged in VVMC Central Database
            </p>
          </div>

        <div className="flex flex-col gap-3 w-full max-w-sm mx-auto">
            <button 
              onClick={() => navigate('/tracker')}
              className="w-full bg-secondary text-primary font-bold py-4 px-8 rounded-xl hover:bg-blue-800 transition-all shadow-lg active:scale-95"
            >
              Track my complaints
            </button>
            
            <button 
              onClick={() => navigate('/')}
              className="text-secondary font-bold py-2 underline hover:text-primary transition-colors text-sm"
            >
              Go back to home
            </button>
          </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-secondary mb-6">Report a Civic Issue</h1>
      
      <form onSubmit={handleInitialSubmit} className="space-y-6">
          {/* Photo Section */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">
              1. Upload Proof
            </label>
            <div 
              className={cn(
                "relative h-48 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center overflow-hidden transition-all shadow-sm",
                photo ? "border-primary bg-primary/5" : "border-gray-200 bg-white hover:border-primary/50"
              )}
            >
              {photo ? (
                <>
                  <img src={photo} alt="Issue proof" className="w-full h-full object-cover" />
                  <button 
                    type="button"
                    onClick={() => setPhoto(null)}
                    className="absolute top-2 right-2 bg-white/90 p-2 rounded-full shadow-lg text-red-500"
                  >
                    <Loader2 size={20} className="animate-spin" />
                  </button>
                </>
              ) : (
                  <label className="cursor-pointer flex flex-col items-center gap-2 p-8 text-center group">
                    <div className="w-16 h-16 bg-secondary/5 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Camera size={32} className="text-secondary" />
                    </div>
                    <span className="font-bold text-secondary">Click to snap or upload</span>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Clear photo helps faster resolution</span>
                    <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                  </label>
              )}
            </div>
          </div>

          {/* Location Section */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">
              2. Confirm Location
            </label>
            <div className="flex flex-col gap-3">
              <button 
                type="button"
                onClick={detectWard}
                disabled={detecting}
                className="w-full h-14 bg-white border-2 border-primary text-secondary font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-primary/5 transition-all disabled:opacity-50 shadow-sm"
              >
                {detecting ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Detecting GPS...
                  </>
                ) : (
                  <>
                    <MapPin size={20} />
                    Auto-detect Ward
                  </>
                )}
              </button>
              
              <div className="relative">
                <select
                  onChange={(e) => {
                    const selected = WARD_DATA.find(w => w.id === parseInt(e.target.value))
                    setWard(selected)
                  }}
                  value={ward?.id || ""}
                  className="w-full h-14 px-4 bg-white border-2 border-gray-100 rounded-xl font-bold text-secondary appearance-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                >
                  <option value="" disabled>Or select ward manually...</option>
                  {WARD_DATA.map(w => (
                    <option key={w.id} value={w.id}>Ward {w.id}: {w.name}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  ▼
                </div>
              </div>
            </div>

            {ward && (
              <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300 mt-4">
            <div className="bg-white border border-secondary/10 rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-2 text-secondary font-bold mb-1">
                    <CheckCircle2 size={18} className="text-green-500" />
                    Location Detected
                  </div>
                    <p className="text-secondary font-bold text-sm">Ward {ward.id} – {ward.name}</p>
                  {getWardZone(ward.id) && (
                    <p className="text-xs text-secondary/70 font-bold mt-1">
                      Zone {getWardZone(ward.id).code} ({getWardZone(ward.id).name})
                    </p>
                  )}
                  
                  {/* Nagarsevak Card */}
                  <div className="mt-4 pt-4 border-t border-secondary/10">
                    <p className="text-xs text-secondary/50 font-bold uppercase tracking-tighter">Your Representative</p>
                    <p className="text-sm font-bold text-secondary">{ward.corporators[0]?.name}</p>
                    <p className="text-[10px] text-secondary/60 font-bold">{ward.corporators[0]?.party}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Category Section */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">
              3. Select Issue Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {ISSUE_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all",
                    selectedCategory?.id === cat.id 
                      ? "border-primary bg-primary/5 ring-4 ring-primary/10 shadow-sm" 
                      : "border-gray-100 bg-white hover:border-primary/30"
                  )}
                >
                  <span className="text-2xl">{cat.icon}</span>
                  <span className="text-sm font-bold text-secondary">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Description Section */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">
              4. Additional Details
            </label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide exact address or landmarks..."
              className="w-full h-32 p-4 bg-white border-2 border-gray-100 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all resize-none font-medium text-secondary"
            />
          </div>

          <button
            type="submit"
            disabled={!ward || !selectedCategory}
            className="w-full bg-primary text-secondary font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-yellow-500 transition-all disabled:opacity-50 shadow-lg"
          >
            <MessageSquare size={20} />
            Report to Nagarsevak
          </button>
        </form>

        {/* Reporting Method Selection Modal */}
        {showMethodSelection && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-sm rounded-3xl p-6 space-y-6 animate-in slide-in-from-bottom-8 duration-300">
              <div className="text-center space-y-2">
                <h3 className="text-xl font-bold text-secondary">Choose Reporting Method</h3>
                <p className="text-gray-500">How would you like to send this report to the authorities?</p>
              </div>

              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => handleFinalSubmit('whatsapp')}
                  className="flex items-center justify-between w-full bg-[#25D366] text-white font-bold py-4 px-6 rounded-2xl hover:brightness-110 transition-all group shadow-lg active:scale-95"
                >
                  <div className="flex items-center gap-3">
                    <MessageSquare size={24} />
                    <span>WhatsApp Nagarsevak</span>
                  </div>
                  <CheckCircle2 size={20} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>

                <button 
                  onClick={() => handleFinalSubmit('email')}
                  className="flex items-center justify-between w-full bg-secondary text-primary font-bold py-4 px-6 rounded-2xl hover:bg-blue-700 transition-all group shadow-lg active:scale-95"
                >
                  <div className="flex items-center gap-3">
                    <Mail size={24} />
                    <span>Email Central VVMC</span>
                  </div>
                  <CheckCircle2 size={20} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>

                <button 
                  onClick={() => setShowMethodSelection(false)}
                  className="w-full text-gray-400 font-bold py-2 mt-2 hover:text-secondary transition-colors text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

export default ReportPage
