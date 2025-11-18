'use client'

import { Warehouse } from 'lucide-react'

export default function InventoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
          Inventory
        </h1>
        <p className="text-gray-400 mt-1">Gérez votre inventaire multi-plateforme</p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-12 text-center">
        <Warehouse className="w-16 h-16 text-gray-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">Gestion d'Inventaire Centralisée</h3>
        <p className="text-gray-400 mb-6 max-w-md mx-auto">
          Synchronisez automatiquement vos stocks entre toutes vos plateformes
        </p>
      </div>

      <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-6">
        <h3 className="text-white font-semibold mb-2">Fonctionnalités à venir:</h3>
        <ul className="text-gray-300 text-sm space-y-2">
          <li>• Vue centralisée de tout votre inventaire</li>
          <li>• Sync automatique entre plateformes</li>
          <li>• Alertes de stock bas</li>
          <li>• Répartition intelligente de l'inventaire (IA)</li>
          <li>• Historique des mouvements</li>
        </ul>
      </div>
    </div>
  )
}
