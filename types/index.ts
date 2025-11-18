// ============================================
// FOXWISE E-COMMERCE - TYPE DEFINITIONS
// ============================================

export interface User {
  id: string
  clerk_user_id: string
  email: string
  name?: string
  subscription_tier: 'free' | 'pro' | 'enterprise'
  created_at: string
  updated_at: string
}

export type PlatformName =
  | 'ebay'
  | 'amazon'
  | 'shopify'
  | 'etsy'
  | 'facebook_marketplace'
  | 'discogs'
  | 'in_person'

export interface Platform {
  id: string
  user_id: string
  platform_name: PlatformName
  api_key?: string
  api_secret?: string
  access_token?: string
  refresh_token?: string
  token_expires_at?: string
  store_name?: string
  store_url?: string
  store_id?: string
  additional_config?: Record<string, any>
  listing_fee: number
  final_value_fee_percent: number
  payment_processing_fee_percent: number
  is_active: boolean
  last_sync?: string
  sync_status?: 'success' | 'error' | 'pending'
  sync_error?: string
  created_at: string
  updated_at: string
}

export interface Product {
  id: string
  user_id: string
  sku?: string
  title: string
  description?: string
  category?: string
  subcategory?: string
  brand?: string
  tags?: string[]
  cost_price?: number
  selling_price?: number
  msrp?: number
  weight?: number
  length?: number
  width?: number
  height?: number
  images?: string[]
  main_image?: string
  total_quantity: number
  reserved_quantity: number
  available_quantity: number
  low_stock_threshold: number
  ai_title?: string
  ai_description?: string
  ai_short_description?: string
  ai_bullet_points?: string[]
  ai_tags?: string[]
  seo_keywords?: string[]
  // Discogs specific
  artist?: string
  album_title?: string
  release_year?: number
  format?: string
  genre?: string
  label?: string
  catalog_number?: string
  condition?: string
  grading_media?: string
  grading_sleeve?: string
  discogs_release_id?: string
  status: 'draft' | 'active' | 'inactive' | 'archived'
  notes?: string
  created_at: string
  updated_at: string
}

export interface Listing {
  id: string
  user_id: string
  product_id: string
  platform_id: string
  platform_listing_id?: string
  listing_url?: string
  title: string
  description?: string
  price: number
  quantity_listed: number
  quantity_sold: number
  quantity_available: number
  listing_type?: string
  listing_duration?: number
  start_date?: string
  end_date?: string
  starting_bid?: number
  reserve_price?: number
  buy_it_now_price?: number
  shipping_cost?: number
  shipping_method?: string
  handling_time?: number
  views: number
  watchers: number
  inquiries: number
  status: 'draft' | 'pending' | 'active' | 'sold' | 'ended' | 'cancelled'
  last_synced?: string
  sync_error?: string
  created_at: string
  updated_at: string
}

export interface Sale {
  id: string
  user_id: string
  listing_id?: string
  product_id?: string
  platform_id?: string
  platform_order_id?: string
  platform_buyer_id?: string
  buyer_username?: string
  buyer_name?: string
  buyer_email?: string
  quantity: number
  unit_price: number
  subtotal: number
  shipping_cost: number
  tax: number
  platform_fee: number
  payment_processing_fee: number
  other_fees: number
  total_amount: number
  cost_of_goods?: number
  total_fees?: number
  net_profit?: number
  profit_margin?: number
  shipping_address?: Record<string, any>
  order_status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
  payment_status: 'unpaid' | 'paid' | 'refunded'
  fulfillment_status: 'unfulfilled' | 'fulfilled' | 'partially_fulfilled'
  order_date: string
  paid_date?: string
  shipped_date?: string
  delivered_date?: string
  tracking_number?: string
  carrier?: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface SourcingProduct {
  id: string
  user_id: string
  source_platform: string
  source_product_id: string
  source_url: string
  title: string
  description?: string
  images?: string[]
  price: number
  price_range_min?: number
  price_range_max?: number
  currency: string
  shipping_cost?: number
  shipping_method?: string
  shipping_time_min?: number
  shipping_time_max?: number
  moq: number
  supplier_name?: string
  supplier_rating?: number
  supplier_response_rate?: number
  total_orders?: number
  supplier_url?: string
  num_reviews: number
  avg_rating?: number
  category?: string
  tags?: string[]
  is_favorite: boolean
  notes?: string
  created_at: string
  updated_at: string
}

export interface ProfitCalculation {
  id: string
  user_id: string
  product_id?: string
  sourcing_product_id?: string
  name?: string
  description?: string
  product_cost: number
  shipping_cost: number
  import_duties: number
  packaging_cost: number
  other_costs: number
  total_cost: number
  platform_calculations?: Record<string, any>
  selling_price: number
  platform_fees: number
  payment_processing_fees: number
  gross_profit?: number
  net_profit?: number
  profit_margin?: number
  roi?: number
  estimated_monthly_sales?: number
  estimated_monthly_profit?: number
  notes?: string
  created_at: string
  updated_at: string
}

export interface ResearchQuery {
  id: string
  user_id: string
  query_text: string
  platform: string
  filters?: Record<string, any>
  results_count?: number
  avg_price?: number
  min_price?: number
  max_price?: number
  top_sellers?: Record<string, any>
  ai_analysis?: string
  competition_level?: 'low' | 'medium' | 'high'
  profit_potential?: 'low' | 'medium' | 'high'
  created_at: string
}

export interface Niche {
  id: string
  user_id: string
  name: string
  description?: string
  keywords?: string[]
  category?: string
  ai_trend_score?: number
  ai_competition_level?: 'low' | 'medium' | 'high'
  ai_profit_potential?: 'low' | 'medium' | 'high'
  ai_recommendations?: string
  ai_analysis_full?: Record<string, any>
  avg_price?: number
  monthly_search_volume?: number
  seasonality_data?: Record<string, any>
  top_platforms?: string[]
  is_active: boolean
  last_analyzed?: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface Competitor {
  id: string
  user_id: string
  platform: string
  store_name: string
  store_url?: string
  store_id?: string
  total_listings?: number
  avg_rating?: number
  total_reviews?: number
  feedback_score?: number
  est_monthly_sales?: number
  est_monthly_revenue?: number
  top_products?: Record<string, any>
  avg_price?: number
  price_range_min?: number
  price_range_max?: number
  niches?: string[]
  is_active: boolean
  last_synced?: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface AIInteraction {
  id: string
  user_id: string
  interaction_type: string
  prompt?: string
  response?: string
  model_used?: string
  related_product_id?: string
  related_niche_id?: string
  context_data?: Record<string, any>
  user_rating?: number
  user_feedback?: string
  was_helpful?: boolean
  tokens_used?: number
  cost?: number
  created_at: string
}

export interface AutomationRule {
  id: string
  user_id: string
  name: string
  description?: string
  rule_type: string
  trigger_type: 'schedule' | 'event' | 'threshold'
  trigger_config?: Record<string, any>
  conditions?: Record<string, any>
  actions?: Record<string, any>
  internal_workflow_id?: string
  is_active: boolean
  last_run?: string
  next_run?: string
  total_runs: number
  success_count: number
  error_count: number
  last_error?: string
  created_at: string
  updated_at: string
}

export interface Notification {
  id: string
  user_id: string
  type: string
  title: string
  message: string
  related_product_id?: string
  related_sale_id?: string
  related_listing_id?: string
  priority: 'low' | 'normal' | 'high' | 'urgent'
  is_read: boolean
  read_at?: string
  action_url?: string
  action_label?: string
  created_at: string
}

// Dashboard stats
export interface DashboardStats {
  totalListings: number
  activeListings: number
  totalSales: number
  totalRevenue: number
  totalProfit: number
  avgProfitMargin: number
  totalInventoryValue: number
  lowStockItems: number
  platformBreakdown: {
    platform: PlatformName
    listings: number
    sales: number
    revenue: number
  }[]
}

// Chart data
export interface ChartData {
  name: string
  value: number
  color?: string
}

// Platform display info
export interface PlatformInfo {
  name: PlatformName
  displayName: string
  color: string
  gradient: string
  icon: string
  description: string
  defaultFees: {
    listing_fee: number
    final_value_fee_percent: number
    payment_processing_fee_percent: number
  }
}

// Platform configuration
export const PLATFORM_INFO: Record<PlatformName, PlatformInfo> = {
  ebay: {
    name: 'ebay',
    displayName: 'eBay',
    color: '#E53238',
    gradient: 'from-red-500 to-yellow-500',
    icon: '🏪',
    description: 'Global marketplace for new and used items',
    defaultFees: {
      listing_fee: 0.35,
      final_value_fee_percent: 12.9,
      payment_processing_fee_percent: 2.9
    }
  },
  amazon: {
    name: 'amazon',
    displayName: 'Amazon',
    color: '#FF9900',
    gradient: 'from-orange-500 to-amber-600',
    icon: '📦',
    description: 'World\'s largest online retailer',
    defaultFees: {
      listing_fee: 0,
      final_value_fee_percent: 15,
      payment_processing_fee_percent: 0 // Included in referral fee
    }
  },
  shopify: {
    name: 'shopify',
    displayName: 'Shopify',
    color: '#96BF48',
    gradient: 'from-green-500 to-emerald-600',
    icon: '🛍️',
    description: 'Your own online store',
    defaultFees: {
      listing_fee: 0,
      final_value_fee_percent: 0,
      payment_processing_fee_percent: 2.9
    }
  },
  etsy: {
    name: 'etsy',
    displayName: 'Etsy',
    color: '#F16521',
    gradient: 'from-orange-400 to-pink-500',
    icon: '🎨',
    description: 'Marketplace for handmade and vintage items',
    defaultFees: {
      listing_fee: 0.20,
      final_value_fee_percent: 6.5,
      payment_processing_fee_percent: 3
    }
  },
  facebook_marketplace: {
    name: 'facebook_marketplace',
    displayName: 'Facebook Marketplace',
    color: '#1877F2',
    gradient: 'from-blue-500 to-indigo-600',
    icon: '👥',
    description: 'Local buying and selling on Facebook',
    defaultFees: {
      listing_fee: 0,
      final_value_fee_percent: 5,
      payment_processing_fee_percent: 2.9
    }
  },
  discogs: {
    name: 'discogs',
    displayName: 'Discogs',
    color: '#333333',
    gradient: 'from-gray-700 to-gray-900',
    icon: '🎵',
    description: 'Music marketplace for vinyl, CDs, and more',
    defaultFees: {
      listing_fee: 0,
      final_value_fee_percent: 8,
      payment_processing_fee_percent: 2.9
    }
  },
  in_person: {
    name: 'in_person',
    displayName: 'In-Person',
    color: '#10B981',
    gradient: 'from-emerald-500 to-green-600',
    icon: '💵',
    description: 'Track your in-person and cash sales',
    defaultFees: {
      listing_fee: 0,
      final_value_fee_percent: 0,
      payment_processing_fee_percent: 0
    }
  }
}
