'use client'

import { Search } from 'lucide-react'

export default function ResearchPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Research
        </h1>
        <p className="text-gray-400 mt-1">Recherchez et analysez des produits sur les marketplaces</p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-12 text-center">
        <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">Recherche de Produits Avancée</h3>
        <p className="text-gray-400 mb-6 max-w-md mx-auto">
          Trouvez les meilleurs produits à vendre avec des insights IA sur la demande et la compétition
        </p>
      </div>

      <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-6">
        <h3 className="text-white font-semibold mb-2">Fonctionnalités à venir:</h3>
        <ul className="text-gray-300 text-sm space-y-2">
          <li>• Rechercher sur eBay, Amazon, Etsy simultanément</li>
          <li>• Voir les volumes de vente estimés par produit</li>
          <li>• Analyser la concurrence et les prix</li>
          <li>• Recherche par image (reverse image search)</li>
          <li>• Insights IA sur la profitabilité</li>
        </ul>
      </div>
    </div>
  )
}
