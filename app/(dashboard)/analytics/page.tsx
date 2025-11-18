'use client'

import { TrendingUp } from 'lucide-react'

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-500 to-cyan-600 bg-clip-text text-transparent">
          Analytics
        </h1>
        <p className="text-gray-400 mt-1">Analyses détaillées de vos performances</p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-12 text-center">
        <TrendingUp className="w-16 h-16 text-gray-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">Analytics Avancés</h3>
        <p className="text-gray-400 mb-6 max-w-md mx-auto">
          Comprenez vos performances et optimisez votre stratégie
        </p>
      </div>

      <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-6">
        <h3 className="text-white font-semibold mb-2">Fonctionnalités à venir:</h3>
        <ul className="text-gray-300 text-sm space-y-2">
          <li>• Rapports détaillés de ventes et profits</li>
          <li>• Performance par plateforme, catégorie, produit</li>
          <li>• Tendances temporelles et saisonnalité</li>
          <li>• Export PDF/Excel des rapports</li>
          <li>• Recommandations IA pour optimisation</li>
        </ul>
      </div>
    </div>
  )
}
