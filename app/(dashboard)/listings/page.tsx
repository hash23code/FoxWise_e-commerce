'use client'

import { useState } from 'react'
import { ShoppingCart, Plus, Sparkles, X, DollarSign, Package } from 'lucide-react'
import { PLATFORM_INFO, type PlatformName } from '@/types'

type Step = 'details' | 'pricing' | 'platforms'

interface ListingForm {
  title: string
  description: string
  category: string
  brand: string
  costPrice: string
  sellingPrice: string
  quantity: string
  sku: string
  selectedPlatforms: PlatformName[]
}

export default function ListingsPage() {
  const [showForm, setShowForm] = useState(false)
  const [currentStep, setCurrentStep] = useState<Step>('details')
  const [aiLoading, setAiLoading] = useState(false)
  const [form, setForm] = useState<ListingForm>({
    title: '',
    description: '',
    category: '',
    brand: '',
    costPrice: '',
    sellingPrice: '',
    quantity: '1',
    sku: '',
    selectedPlatforms: [],
  })

  // Mock listings data
  const [listings] = useState([
    { id: '1', title: 'Vintage Nike Air Jordan 1 - Size 10', platform: 'ebay' as PlatformName, price: 299.99, quantity: 1, status: 'active', views: 142, image: '🏀' },
    { id: '2', title: 'Apple Watch Series 9 - GPS 41mm', platform: 'amazon' as PlatformName, price: 399.00, quantity: 3, status: 'active', views: 89, image: '⌚' },
  ])

  const handleAIGenerate = async (field: 'title' | 'description') => {
    setAiLoading(true)
    setTimeout(() => {
      if (field === 'title') {
        setForm(prev => ({
          ...prev,
          title: `Premium ${prev.brand || 'Brand'} ${prev.category || 'Product'} - High Quality & Authentic`
        }))
      } else {
        setForm(prev => ({
          ...prev,
          description: `✨ DESCRIPTION GÉNÉRÉE PAR IA ✨\n\nDécouvrez ce magnifique ${prev.category || 'produit'} de qualité supérieure.\n\n🌟 CARACTÉRISTIQUES:\n• Marque: ${prev.brand || 'Premium'}\n• Catégorie: ${prev.category || 'N/A'}\n• État: Comme neuf\n• Garantie incluse\n\n📦 LIVRAISON RAPIDE\nExpédition sous 24h avec suivi.\n\n💯 SATISFACTION GARANTIE\nRetours acceptés sous 30 jours.`
        }))
      }
      setAiLoading(false)
    }, 1500)
  }

  const handlePlatformToggle = (platform: PlatformName) => {
    setForm(prev => ({
      ...prev,
      selectedPlatforms: prev.selectedPlatforms.includes(platform)
        ? prev.selectedPlatforms.filter(p => p !== platform)
        : [...prev.selectedPlatforms, platform]
    }))
  }

  const handleSubmit = () => {
    alert(`Listing créé avec succès sur ${form.selectedPlatforms.length} plateforme(s)!`)
    setShowForm(false)
    setCurrentStep('details')
    setForm({ title: '', description: '', category: '', brand: '', costPrice: '', sellingPrice: '', quantity: '1', sku: '', selectedPlatforms: [] })
  }

  if (!showForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
              Listings
            </h1>
            <p className="text-gray-400 mt-1">Gérez vos listings multi-plateformes</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all font-medium inline-flex items-center gap-2 shadow-lg shadow-emerald-500/30"
          >
            <Plus className="w-5 h-5" />
            Nouveau Listing
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-blue-600 to-cyan-700 rounded-xl p-6">
            <div className="text-2xl font-bold text-white">127</div>
            <div className="text-blue-200 text-sm">Total Listings</div>
          </div>
          <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-xl p-6">
            <div className="text-2xl font-bold text-white">98</div>
            <div className="text-emerald-200 text-sm">Active</div>
          </div>
          <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl p-6">
            <div className="text-2xl font-bold text-white">15</div>
            <div className="text-purple-200 text-sm">Draft</div>
          </div>
          <div className="bg-gradient-to-br from-orange-600 to-red-700 rounded-xl p-6">
            <div className="text-2xl font-bold text-white">14</div>
            <div className="text-orange-200 text-sm">Ended</div>
          </div>
        </div>

        {/* Listings Table */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-gray-800">
            <h3 className="text-lg font-semibold text-white">Vos Listings</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Produit</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Plateforme</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Prix</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Qty</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Vues</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {listings.map((listing) => (
                  <tr key={listing.id} className="hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{listing.image}</div>
                        <div className="text-white font-medium">{listing.title}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${PLATFORM_INFO[listing.platform].gradient} text-white`}>
                        {PLATFORM_INFO[listing.platform].displayName}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-white font-semibold">${listing.price}</td>
                    <td className="px-6 py-4 text-gray-400">{listing.quantity}</td>
                    <td className="px-6 py-4 text-gray-400">{listing.views}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-400">Active</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  // Create Listing Form
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">Créer un Nouveau Listing</h1>
          <p className="text-gray-400 mt-1">Publiez sur plusieurs plateformes en un clic</p>
        </div>
        <button onClick={() => setShowForm(false)} className="p-2 text-gray-400 hover:text-white transition-colors">
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center gap-4">
        {[
          { key: 'details' as Step, label: 'Détails Produit', icon: Package },
          { key: 'pricing' as Step, label: 'Prix & Stock', icon: DollarSign },
          { key: 'platforms' as Step, label: 'Plateformes', icon: ShoppingCart },
        ].map((step, index) => {
          const Icon = step.icon
          const isActive = currentStep === step.key
          const isCompleted = ['details', 'pricing', 'platforms'].indexOf(currentStep) > index

          return (
            <div key={step.key} className="flex items-center gap-4 flex-1">
              <div className={`flex items-center gap-3 flex-1 p-4 rounded-lg border-2 transition-all ${isActive ? 'border-emerald-500 bg-emerald-500/10' : isCompleted ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-gray-800 bg-gray-900'}`}>
                <div className={`p-2 rounded-lg ${isActive || isCompleted ? 'bg-emerald-500 text-white' : 'bg-gray-800 text-gray-400'}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`font-medium ${isActive ? 'text-white' : 'text-gray-400'}`}>{step.label}</span>
              </div>
              {index < 2 && <div className={`w-8 h-0.5 ${isCompleted ? 'bg-emerald-500' : 'bg-gray-800'}`} />}
            </div>
          )
        })}
      </div>

      {/* Form Content */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        {currentStep === 'details' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Titre du Produit</label>
              <div className="flex gap-2">
                <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500" placeholder="Ex: Vintage Nike Air Jordan 1 - Size 10" />
                <button onClick={() => handleAIGenerate('title')} disabled={aiLoading} className="px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all flex items-center gap-2 disabled:opacity-50">
                  <Sparkles className="w-5 h-5" />
                  {aiLoading ? 'Génération...' : 'AI'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Catégorie</label>
                <input type="text" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500" placeholder="Ex: Sneakers, Electronics..." />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Marque</label>
                <input type="text" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500" placeholder="Ex: Nike, Apple..." />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
              <div className="space-y-2">
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={8} className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500" placeholder="Décrivez votre produit en détail..." />
                <button onClick={() => handleAIGenerate('description')} disabled={aiLoading} className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all flex items-center gap-2 text-sm disabled:opacity-50">
                  <Sparkles className="w-4 h-4" />
                  {aiLoading ? 'Génération...' : 'Générer avec IA'}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button onClick={() => setCurrentStep('pricing')} className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all font-medium">
                Suivant: Prix & Stock →
              </button>
            </div>
          </div>
        )}

        {currentStep === 'pricing' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Prix Coûtant</label>
                <input type="number" value={form.costPrice} onChange={(e) => setForm({ ...form, costPrice: e.target.value })} className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500" placeholder="0.00" step="0.01" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Prix de Vente</label>
                <input type="number" value={form.sellingPrice} onChange={(e) => setForm({ ...form, sellingPrice: e.target.value })} className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500" placeholder="0.00" step="0.01" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Quantité</label>
                <input type="number" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500" placeholder="1" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">SKU (optionnel)</label>
                <input type="text" value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500" placeholder="PROD-001" />
              </div>
            </div>

            {form.costPrice && form.sellingPrice && (
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
                <div className="text-sm text-emerald-400 mb-2">Estimation de Profit</div>
                <div className="text-2xl font-bold text-white">
                  ${(parseFloat(form.sellingPrice) - parseFloat(form.costPrice)).toFixed(2)}
                </div>
                <div className="text-sm text-gray-400">
                  Marge: {((parseFloat(form.sellingPrice) - parseFloat(form.costPrice)) / parseFloat(form.sellingPrice) * 100).toFixed(1)}%
                </div>
              </div>
            )}

            <div className="flex justify-between">
              <button onClick={() => setCurrentStep('details')} className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium">← Retour</button>
              <button onClick={() => setCurrentStep('platforms')} className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all font-medium">Suivant: Plateformes →</button>
            </div>
          </div>
        )}

        {currentStep === 'platforms' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Sélectionnez les Plateformes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(['ebay', 'amazon', 'shopify', 'etsy', 'facebook_marketplace', 'discogs'] as PlatformName[]).map((platformName) => {
                  const platform = PLATFORM_INFO[platformName]
                  const isSelected = form.selectedPlatforms.includes(platformName)

                  return (
                    <button key={platformName} onClick={() => handlePlatformToggle(platformName)} className={`p-4 rounded-lg border-2 transition-all text-left ${isSelected ? 'border-emerald-500 bg-emerald-500/10' : 'border-gray-800 bg-gray-900 hover:border-gray-700'}`}>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{platform.icon}</span>
                        <div className="flex-1">
                          <div className="font-semibold text-white">{platform.displayName}</div>
                          <div className="text-xs text-gray-400">Fee: {platform.defaultFees.final_value_fee_percent}%</div>
                        </div>
                        {isSelected && (
                          <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {form.selectedPlatforms.length > 0 && (
              <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                <div className="text-sm text-blue-400 mb-2">{form.selectedPlatforms.length} plateforme(s) sélectionnée(s)</div>
                <div className="text-white font-semibold">Votre produit sera publié sur: {form.selectedPlatforms.map(p => PLATFORM_INFO[p].displayName).join(', ')}</div>
              </div>
            )}

            <div className="flex justify-between">
              <button onClick={() => setCurrentStep('pricing')} className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium">← Retour</button>
              <button onClick={handleSubmit} disabled={form.selectedPlatforms.length === 0} className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Publier le Listing
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
