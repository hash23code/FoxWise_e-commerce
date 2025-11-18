'use client'

import { ShoppingCart, Plus } from 'lucide-react'

export default function ListingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
          Listings
        </h1>
        <p className="text-gray-400 mt-1">Gérez vos listings multi-plateformes</p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-12 text-center">
        <ShoppingCart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">Créez votre premier listing</h3>
        <p className="text-gray-400 mb-6 max-w-md mx-auto">
          Publiez vos produits sur plusieurs plateformes en quelques clics avec l'aide de l'IA
        </p>
        <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all font-medium inline-flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Créer un Listing
        </button>
      </div>

      <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-6">
        <h3 className="text-white font-semibold mb-2">Fonctionnalités à venir:</h3>
        <ul className="text-gray-300 text-sm space-y-2">
          <li>• Créer des listings avec génération AI de titre et description</li>
          <li>• Publier simultanément sur eBay, Amazon, Shopify, Etsy, Discogs, etc.</li>
          <li>• Gérer toutes vos listings depuis un seul endroit</li>
          <li>• Modifier les prix en masse</li>
          <li>• Voir les statistiques de performance par listing</li>
        </ul>
      </div>
    </div>
  )
}
