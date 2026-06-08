import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getComplaints, updateComplaintStatus } from '../utils/storage'
import { Clock, CheckCircle2, AlertCircle, ChevronRight, Filter, Trash2 } from 'lucide-react'
import { cn } from '../utils/cn'

const TrackerPage = () => {
  const [complaints, setComplaints] = useState([])
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    setComplaints(getComplaints())
  }, [])

  const handleResolve = (id) => {
    updateComplaintStatus(id, 'resolved')
    setComplaints(getComplaints())
  }

  const filteredComplaints = complaints.filter(c => {
    if (filter === 'all') return true
    return c.status === filter
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved': return 'text-green-600 bg-green-50 border-green-200'
      case 'in-progress': return 'text-blue-600 bg-blue-50 border-blue-200'
      case 'acknowledged': return 'text-amber-600 bg-amber-50 border-amber-200'
      default: return 'text-red-600 bg-red-50 border-red-200'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'resolved': return <CheckCircle2 size={16} />
      case 'in-progress': return <Clock size={16} />
      default: return <AlertCircle size={16} />
    }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-secondary">My Complaints</h1>
        <div className="relative">
          <Filter size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <select 
            className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm appearance-none"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="acknowledged">Acknowledged</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>

      {filteredComplaints.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
          <div className="w-20 h-20 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle size={40} />
          </div>
          <h3 className="text-lg font-bold text-secondary mb-2">No complaints found</h3>
          <p className="text-gray-500 mb-6">You haven't filed any complaints yet.</p>
          <Link to="/report" className="inline-block bg-primary text-white font-bold py-3 px-8 rounded-xl">
            Report an Issue
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredComplaints.map((complaint) => (
            <div key={complaint.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center text-2xl shrink-0">
                  {complaint.photo ? (
                    <img src={complaint.photo} alt="" className="w-full h-full object-cover rounded-xl" />
                  ) : (
                    '📍'
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono text-gray-400 uppercase tracking-tighter">{complaint.id}</span>
                    <span className="text-[10px] text-gray-400">{new Date(complaint.date).toLocaleDateString()}</span>
                  </div>
                  <h4 className="font-bold text-secondary truncate">{complaint.category}</h4>
                  <p className="text-xs text-gray-500 truncate">{complaint.wardName}</p>
                  <div className={cn(
                    "mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold border",
                    getStatusColor(complaint.status)
                  )}>
                    {getStatusIcon(complaint.status)}
                    {complaint.status.toUpperCase()}
                  </div>
                </div>
              </div>
              
              {complaint.status !== 'resolved' && (
                <button 
                  onClick={() => handleResolve(complaint.id)}
                  className="w-full py-2.5 bg-green-50 text-green-600 text-xs font-bold rounded-xl border border-green-100 hover:bg-green-100 transition-colors flex items-center justify-center gap-2"
                >
                  <CheckCircle2 size={14} />
                  Mark as Resolved
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Escalation Info */}
      <div className="mt-8 p-4 bg-orange-50 rounded-xl border border-orange-100">
        <h5 className="text-sm font-bold text-primary mb-1 flex items-center gap-2">
          <Clock size={16} />
          SLA & Escalation
        </h5>
        <p className="text-xs text-gray-600">
          Most complaints are acknowledged within 3 days. If no action is taken within 15 days, it is automatically escalated to the Ward Officer.
        </p>
      </div>
    </div>
  )
}

export default TrackerPage
