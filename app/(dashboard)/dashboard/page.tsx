'use client'

import { useEffect, useState } from 'react'
import { Package, DollarSign, TrendingUp, Warehouse, AlertCircle, ShoppingCart, Eye, Star } from 'lucide-react'
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, LineChart, Line } from 'recharts'
import { PLATFORM_INFO, type DashboardStats, type PlatformName } from '@/types'

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // TODO: Replace with actual API call
    // For now, using mock data
    setTimeout(() => {
      setStats({
        totalListings: 127,
        activeListings: 98,
        totalSales: 342,
        totalRevenue: 28450.75,
        totalProfit: 12890.50,
        avgProfitMargin: 45.3,
        totalInventoryValue: 8950.00,
        lowStockItems: 5,
        platformBreakdown: [
          { platform: 'ebay', listings: 42, sales: 145, revenue: 12450.00 },
          { platform: 'amazon', listings: 28, sales: 98, revenue: 8920.50 },
          { platform: 'shopify', listings: 15, sales: 56, revenue: 4580.25 },
          { platform: 'etsy', listings: 8, sales: 23, revenue: 1450.00 },
          { platform: 'discogs', listings: 12, sales: 15, revenue: 890.00 },
          { platform: 'in_person', listings: 0, sales: 5, revenue: 160.00 },
        ]
      })
      setLoading(false)
    }, 500)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-red-400 text-xl">Error loading dashboard</div>
      </div>
    )
  }

  // Chart data
  const platformRevenueData = stats.platformBreakdown.map(p => ({
    name: PLATFORM_INFO[p.platform].displayName,
    revenue: p.revenue,
    color: PLATFORM_INFO[p.platform].color
  }))

  const platformListingsData = stats.platformBreakdown.map(p => ({
    name: PLATFORM_INFO[p.platform].displayName,
    listings: p.listings,
    color: PLATFORM_INFO[p.platform].color
  }))

  // Mock sales trend data (last 7 days)
  const salesTrendData = [
    { day: 'Lun', sales: 45, profit: 580 },
    { day: 'Mar', sales: 52, profit: 720 },
    { day: 'Mer', sales: 48, profit: 650 },
    { day: 'Jeu', sales: 61, profit: 890 },
    { day: 'Ven', sales: 58, profit: 820 },
    { day: 'Sam', sales: 43, profit: 610 },
    { day: 'Dim', sales: 35, profit: 480 },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
          Dashboard
        </h1>
        <p className="text-gray-400 mt-1">Vue d'ensemble de vos ventes e-commerce</p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Listings */}
        <div className="bg-gradient-to-br from-blue-600 to-cyan-700 rounded-xl p-6 border border-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white/10 rounded-lg">
              <Package className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">{stats.totalListings}</div>
          <div className="text-blue-200 text-sm">Total Listings</div>
          <div className="mt-2 text-xs text-blue-200">{stats.activeListings} active</div>
        </div>

        {/* Total Revenue */}
        <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-xl p-6 border border-emerald-500/20 hover:shadow-lg hover:shadow-emerald-500/30 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white/10 rounded-lg">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">${stats.totalRevenue.toLocaleString()}</div>
          <div className="text-emerald-200 text-sm">Total Revenue</div>
          <div className="mt-2 text-xs text-emerald-200">{stats.totalSales} sales</div>
        </div>

        {/* Total Profit */}
        <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-xl p-6 border border-green-500/20 hover:shadow-lg hover:shadow-green-500/30 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white/10 rounded-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">${stats.totalProfit.toLocaleString()}</div>
          <div className="text-green-200 text-sm">Net Profit</div>
          <div className="mt-2 text-xs text-green-200">{stats.avgProfitMargin.toFixed(1)}% margin</div>
        </div>

        {/* Inventory Value */}
        <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl p-6 border border-purple-500/20 hover:shadow-lg hover:shadow-purple-500/30 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white/10 rounded-lg">
              <Warehouse className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">${stats.totalInventoryValue.toLocaleString()}</div>
          <div className="text-purple-200 text-sm">Inventory Value</div>
          {stats.lowStockItems > 0 && (
            <div className="mt-2 text-xs text-yellow-300 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {stats.lowStockItems} low stock items
            </div>
          )}
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue by Platform */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Revenue par Plateforme</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={platformRevenueData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="revenue"
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              >
                {platformRevenueData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#fff'
                }}
                formatter={(value: number) => `$${value.toLocaleString()}`}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Listings by Platform */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Listings par Plateforme</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={platformListingsData}>
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Bar dataKey="listings" radius={[8, 8, 0, 0]}>
                {platformListingsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sales Trend */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Tendance des Ventes (7 derniers jours)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesTrendData}>
            <XAxis dataKey="day" stroke="#9CA3AF" />
            <YAxis yAxisId="left" stroke="#9CA3AF" />
            <YAxis yAxisId="right" orientation="right" stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#fff'
              }}
            />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="sales" stroke="#10B981" strokeWidth={2} name="Ventes" />
            <Line yAxisId="right" type="monotone" dataKey="profit" stroke="#3B82F6" strokeWidth={2} name="Profit ($)" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Quick Actions & Platform Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Actions Rapides</h3>
          <div className="space-y-3">
            <a
              href="/listings"
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all"
            >
              <ShoppingCart className="w-5 h-5 text-white" />
              <span className="text-white font-medium">Créer un Nouveau Listing</span>
            </a>
            <a
              href="/research"
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
            >
              <Eye className="w-5 h-5 text-white" />
              <span className="text-white font-medium">Rechercher des Produits</span>
            </a>
            <a
              href="/profit-calculator"
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all"
            >
              <DollarSign className="w-5 h-5 text-white" />
              <span className="text-white font-medium">Calculer les Profits</span>
            </a>
          </div>
        </div>

        {/* Platform Status */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Statut des Plateformes</h3>
          <div className="space-y-3">
            {stats.platformBreakdown.map(p => {
              const info = PLATFORM_INFO[p.platform]
              return (
                <div key={p.platform} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{info.icon}</span>
                    <div>
                      <div className="text-white font-medium">{info.displayName}</div>
                      <div className="text-sm text-gray-400">{p.listings} listings • {p.sales} ventes</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-emerald-400 font-semibold">${p.revenue.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">revenue</div>
                  </div>
                </div>
              )
            })}
          </div>
          <a
            href="/platforms"
            className="mt-4 block text-center py-2 px-4 border border-gray-700 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-all"
          >
            Gérer les Connexions
          </a>
        </div>
      </div>
    </div>
  )
}
