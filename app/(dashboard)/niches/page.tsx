'use client'

import { Target } from 'lucide-react'

export default function NichesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-rose-600 bg-clip-text text-transparent">
          Niches Explorer
        </h1>
        <p className="text-gray-400 mt-1">Découvrez les niches profitables avec l'IA</p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-12 text-center">
        <Target className="w-16 h-16 text-gray-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">Explorateur de Niches IA</h3>
        <p className="text-gray-400 mb-6 max-w-md mx-auto">
          L'IA analyse les tendances et trouve les niches les plus profitables pour vous
        </p>
      </div>

      <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-6">
        <h3 className="text-white font-semibold mb-2">Fonctionnalités à venir:</h3>
        <ul className="text-gray-300 text-sm space-y-2">
          <li>• IA génère des suggestions de niches profitables</li>
          <li>• Analyse de tendances (Google Trends, social media)</li>
          <li>• Score de compétition et profit potentiel</li>
          <li>• Suivre vos niches favorites</li>
          <li>• Alertes sur changements de tendances</li>
        </ul>
      </div>
    </div>
  )
}
