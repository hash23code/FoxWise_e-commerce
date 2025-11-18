'use client'

import { useState } from 'react'
import { Plug, Check, AlertCircle, Settings, Plus } from 'lucide-react'
import { PLATFORM_INFO, type PlatformName } from '@/types'

export default function PlatformsPage() {
  // Mock connected platforms
  const [connectedPlatforms, setConnectedPlatforms] = useState<PlatformName[]>(['ebay', 'shopify'])

  const platforms: PlatformName[] = ['ebay', 'amazon', 'shopify', 'etsy', 'facebook_marketplace', 'discogs', 'in_person']

  const isConnected = (platform: PlatformName) => connectedPlatforms.includes(platform)

  const handleConnect = (platform: PlatformName) => {
    // TODO: Implement actual connection flow
    alert(`Configuration de ${PLATFORM_INFO[platform].displayName} - À implémenter avec OAuth/API keys`)
  }

  const handleDisconnect = (platform: PlatformName) => {
    if (confirm(`Déconnecter ${PLATFORM_INFO[platform].displayName}?`)){
      setConnectedPlatforms(prev => prev.filter(p => p !== platform))
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
          Plateformes
        </h1>
        <p className="text-gray-400 mt-1">Gérez vos connexions aux plateformes de vente</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-xl p-6 border border-emerald-500/20">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/10 rounded-lg">
              <Plug className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{connectedPlatforms.length}</div>
              <div className="text-emerald-200 text-sm">Connectées</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-cyan-700 rounded-xl p-6 border border-blue-500/20">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/10 rounded-lg">
              <Check className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{platforms.length}</div>
              <div className="text-blue-200 text-sm">Disponibles</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl p-6 border border-purple-500/20">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/10 rounded-lg">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">Active</div>
              <div className="text-purple-200 text-sm">Toutes Sync</div>
            </div>
          </div>
        </div>
      </div>

      {/* Platform Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {platforms.map((platformName) => {
          const platform = PLATFORM_INFO[platformName]
          const connected = isConnected(platformName)

          return (
            <div
              key={platformName}
              className={`
                bg-gray-900 border rounded-xl p-6 transition-all hover:shadow-lg
                ${connected
                  ? 'border-emerald-500/50 hover:shadow-emerald-500/20'
                  : 'border-gray-800 hover:border-gray-700'
                }
              `}
            >
              {/* Platform Icon & Name */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{platform.icon}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{platform.displayName}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      {connected ? (
                        <span className="text-xs px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          Connecté
                        </span>
                      ) : (
                        <span className="text-xs px-2 py-1 bg-gray-700 text-gray-400 rounded-full">
                          Non connecté
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-400 mb-4">{platform.description}</p>

              {/* Fees Info */}
              <div className="bg-gray-800 rounded-lg p-3 mb-4 space-y-1 text-xs">
                <div className="flex justify-between text-gray-400">
                  <span>Listing Fee:</span>
                  <span className="text-white">${platform.defaultFees.listing_fee}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Final Value Fee:</span>
                  <span className="text-white">{platform.defaultFees.final_value_fee_percent}%</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Payment Processing:</span>
                  <span className="text-white">{platform.defaultFees.payment_processing_fee_percent}%</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                {connected ? (
                  <>
                    <button
                      className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm font-medium"
                      onClick={() => handleConnect(platformName)}
                    >
                      <Settings className="w-4 h-4 inline mr-2" />
                      Configure
                    </button>
                    <button
                      className="px-4 py-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition-colors text-sm font-medium"
                      onClick={() => handleDisconnect(platformName)}
                    >
                      Disconnect
                    </button>
                  </>
                ) : (
                  <button
                    className={`flex-1 px-4 py-2 bg-gradient-to-r ${platform.gradient} text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-medium`}
                    onClick={() => handleConnect(platformName)}
                  >
                    <Plus className="w-4 h-4 inline mr-2" />
                    Connect
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Help Section */}
      <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-white font-semibold mb-2">Besoin d'aide pour connecter vos plateformes?</h3>
            <p className="text-gray-300 text-sm mb-3">
              Chaque plateforme nécessite des API credentials différentes. Consultez notre documentation pour obtenir vos clés API.
            </p>
            <div className="space-y-2 text-sm">
              <div className="text-gray-400">
                <strong className="text-white">eBay:</strong> Créez une app sur{' '}
                <a href="https://developer.ebay.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                  developer.ebay.com
                </a>
              </div>
              <div className="text-gray-400">
                <strong className="text-white">Amazon:</strong> Accédez au SP-API via{' '}
                <a href="https://developer-docs.amazon.com/sp-api/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                  Seller Central
                </a>
              </div>
              <div className="text-gray-400">
                <strong className="text-white">Shopify:</strong> Installez l'app depuis votre{' '}
                <a href="https://www.shopify.com/admin" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                  Shopify Admin
                </a>
              </div>
              <div className="text-gray-400">
                <strong className="text-white">Etsy:</strong> Créez une app sur{' '}
                <a href="https://www.etsy.com/developers/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                  Etsy Developers
                </a>
              </div>
              <div className="text-gray-400">
                <strong className="text-white">Discogs:</strong> Obtenez vos clés sur{' '}
                <a href="https://www.discogs.com/settings/developers" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                  Discogs Developer Settings
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
