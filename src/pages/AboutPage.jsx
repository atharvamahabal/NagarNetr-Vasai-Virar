import { ChevronRight, ArrowDown, Info, ShieldCheck, History, Landmark } from 'lucide-react'

const AboutPage = () => {
  const hierarchy = [
    { level: 'President of India', icon: Landmark },
    { level: 'Prime Minister', icon: Landmark },
    { level: 'Chief Minister', icon: Landmark },
    { level: 'Guardian Minister', icon: Landmark },
    { level: 'MLA (Vidhan Sabha)', icon: Landmark },
    { level: 'Mayor of Vasai-Virar', icon: Landmark },
    { level: 'Municipal Commissioner', icon: ShieldCheck },
    { level: 'Zonal Deputy Commissioner', icon: ShieldCheck },
    { level: 'Ward Officer', icon: ShieldCheck },
    { level: 'Nagarsevak (Corporator)', icon: Info },
    { level: 'Citizen', icon: History, active: true }
  ];

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-12">
      {/* Introduction */}
      <section className="text-center">
        <h1 className="text-3xl font-bold text-secondary mb-4">About NagarNetr</h1>
        <p className="text-gray-600">
          NagarNetr is a citizen-first platform designed to bridge the gap between Vasai-Virar residents and their elected representatives. 
          By leveraging GPS and mobile technology, we ensure your voice reaches the right person instantly.
        </p>
      </section>

      {/* Why Nagarsevak? */}
      <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-secondary mb-4">Why Nagarsevak?</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          The Nagarsevak (Ward Corporator) is your most immediate link to the government. They are responsible for the basic civic amenities in your 1-2 km radius. 
          While VVMC handles large projects, the Nagarsevak has the "Ward Committee Funds" to fix local issues like potholes, streetlights, and drainage immediately.
        </p>
      </section>

      {/* Hierarchy Diagram */}
      <section>
        <h2 className="text-xl font-bold text-secondary mb-8 text-center">Administrative Hierarchy</h2>
        <div className="flex flex-col items-center gap-2">
          {hierarchy.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center w-full">
              <div className={`
                flex items-center gap-4 px-6 py-3 rounded-xl border w-full max-w-sm transition-all
                ${item.active ? 'bg-primary border-primary text-secondary scale-105 shadow-lg font-bold' : 'bg-white border-gray-100 text-gray-500'}
              `}>
                <item.icon size={20} className={item.active ? 'text-secondary' : 'text-gray-400'} />
                <span className="font-bold text-sm">{item.level}</span>
                {item.active && <span className="ml-auto text-[10px] bg-secondary text-primary px-2 py-0.5 rounded-full uppercase">You are here</span>}
              </div>
              {idx < hierarchy.length - 1 && (
                <div className="h-4 w-px bg-gray-200 my-1" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Escalation Timeline */}
      <section>
        <h2 className="text-xl font-bold text-secondary mb-6">Escalation Timeline</h2>
        <div className="relative pl-8 space-y-8 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
          <div className="relative">
            <div className="absolute -left-[30px] top-1 w-6 h-6 bg-primary rounded-full border-4 border-white shadow-sm" />
            <h4 className="font-bold text-secondary">Day 0: Report Filed</h4>
            <p className="text-xs text-gray-500">Ticket generated and Nagarsevak notified via WhatsApp.</p>
          </div>
          <div className="relative">
            <div className="absolute -left-[30px] top-1 w-6 h-6 bg-amber-400 rounded-full border-4 border-white shadow-sm" />
            <h4 className="font-bold text-secondary">Day 3: Acknowledgment</h4>
            <p className="text-xs text-gray-500">Nagarsevak or Ward Office should acknowledge the receipt.</p>
          </div>
          <div className="relative">
            <div className="absolute -left-[30px] top-1 w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow-sm" />
            <h4 className="font-bold text-secondary">Day 7: Work Commences</h4>
            <p className="text-xs text-gray-500">Inspection and resource allocation for the issue.</p>
          </div>
          <div className="relative">
            <div className="absolute -left-[30px] top-1 w-6 h-6 bg-red-500 rounded-full border-4 border-white shadow-sm" />
            <h4 className="font-bold text-secondary">Day 15: Escalation</h4>
            <p className="text-xs text-gray-500">Automatic escalation to the Assistant Municipal Commissioner (AMC).</p>
          </div>
        </div>
      </section>

      {/* VVMC Comparison */}
      <section className="overflow-hidden rounded-2xl border border-gray-200">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="p-4 font-bold text-secondary">Feature</th>
              <th className="p-4 font-bold text-primary">NagarNetr</th>
              <th className="p-4 font-bold text-gray-500">VVMC Portal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            <tr>
              <td className="p-4 font-medium">Speed</td>
              <td className="p-4 text-green-600 font-bold">Instant (WA)</td>
              <td className="p-4">Standard (2-4 days)</td>
            </tr>
            <tr>
              <td className="p-4 font-medium">Point of Contact</td>
              <td className="p-4">Direct Nagarsevak</td>
              <td className="p-4">Centralized Desk</td>
            </tr>
            <tr>
              <td className="p-4 font-medium">Ease of Use</td>
              <td className="p-4">3-tap Reporting</td>
              <td className="p-4">Multi-step form</td>
            </tr>
          </tbody>
        </table>
      </section>

      <div className="text-center pb-12">
        <p className="text-[10px] text-gray-400 uppercase tracking-widest">NagarNetr MVP v1.0 • Vasai-Virar 2026</p>
      </div>
    </div>
  )
}

export default AboutPage
