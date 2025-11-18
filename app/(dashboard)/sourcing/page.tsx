'use client'

import { Globe } from 'lucide-react'

export default function SourcingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
          Sourcing
        </h1>
        <p className="text-gray-400 mt-1">Trouvez des fournisseurs sur AliExpress, Alibaba, DHgate...</p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-12 text-center">
        <Globe className="w-16 h-16 text-gray-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">Sourcing Multi-Plateforme</h3>
        <p className="text-gray-400 mb-6 max-w-md mx-auto">
          Comparez les fournisseurs et trouvez les meilleurs prix pour maximiser vos marges
        </p>
      </div>

      <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-6">
        <h3 className="text-white font-semibold mb-2">Fonctionnalités à venir:</h3>
        <ul className="text-gray-300 text-sm space-y-2">
          <li>• Rechercher sur AliExpress, Alibaba, DHgate, Made-in-China</li>
          <li>• Comparer les prix et frais de shipping</li>
          <li>• Analyser la fiabilité des fournisseurs</li>
          <li>• Sauvegarder vos fournisseurs favoris</li>
          <li>• IA pour négociation et MOQ suggestions</li>
        </ul>
      </div>
    </div>
  )
}
