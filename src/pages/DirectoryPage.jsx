import { useState } from 'react'
import { WARD_DATA } from '../data/wards'
import { Search } from 'lucide-react'

const DirectoryPage = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const allCorporators = WARD_DATA.flatMap(ward => 
    ward.corporators.map(corp => ({
      ...corp,
      wardId: ward.id,
      wardName: ward.name
    }))
  ).filter(corp => 
    corp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    corp.wardName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    corp.wardId.toString().includes(searchQuery)
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-secondary mb-2">Nagarsevak Directory</h1>
        <p className="text-sm text-gray-500">Find and contact your local ward representatives.</p>
      </div>

      <div className="relative mb-8">
        <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input 
          type="text" 
          placeholder="Search by name, ward number or area..." 
          className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-primary outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {allCorporators.map((corp, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div className="flex gap-4">
                <div>
                  <h3 className="font-bold text-secondary">{corp.name}</h3>
                  <p className="text-xs text-primary font-bold">{corp.party}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Ward {corp.wardId}</p>
                <p className="text-[10px] text-gray-500 font-medium truncate max-w-[120px]">{corp.wardName}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {allCorporators.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No Nagarsevaks found matching your search.</p>
        </div>
      )}
    </div>
  )
}

export default DirectoryPage
