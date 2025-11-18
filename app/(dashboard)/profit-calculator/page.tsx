'use client'

import { Calculator } from 'lucide-react'

export default function ProfitCalculatorPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
          Profit Calculator
        </h1>
        <p className="text-gray-400 mt-1">Calculez vos profits avec précision</p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-12 text-center">
        <Calculator className="w-16 h-16 text-gray-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">Calculateur de Profit Avancé</h3>
        <p className="text-gray-400 mb-6 max-w-md mx-auto">
          Comparez la profitabilité entre plateformes et optimisez vos prix
        </p>
      </div>

      <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-6">
        <h3 className="text-white font-semibold mb-2">Fonctionnalités à venir:</h3>
        <ul className="text-gray-300 text-sm space-y-2">
          <li>• Calculer profit net avec tous les frais par plateforme</li>
          <li>• Comparer plusieurs plateformes côte-à-côte</li>
          <li>• Scénarios "What-if" pour prix optimaux</li>
          <li>• Sauvegarder vos calculs</li>
          <li>• IA pour recommandations de prix</li>
        </ul>
      </div>
    </div>
  )
}
