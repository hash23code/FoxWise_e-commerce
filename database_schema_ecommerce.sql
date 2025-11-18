-- ============================================
-- FOXWISE E-COMMERCE - DATABASE SCHEMA
-- ============================================
-- Complete schema for multi-platform e-commerce management
-- Platforms: eBay, Amazon, Shopify, Etsy, Facebook Marketplace, Discogs, In-Person

-- ============================================
-- USERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS fw_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_user_id TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  name TEXT,
  subscription_tier TEXT DEFAULT 'free', -- free, pro, enterprise
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- PLATFORMS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS fw_platforms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES fw_users(id) ON DELETE CASCADE,
  platform_name TEXT NOT NULL, -- ebay, amazon, shopify, etsy, facebook_marketplace, discogs, in_person

  -- API Credentials (encrypted in production)
  api_key TEXT,
  api_secret TEXT,
  access_token TEXT,
  refresh_token TEXT,
  token_expires_at TIMESTAMP WITH TIME ZONE,

  -- Platform-specific config
  store_name TEXT,
  store_url TEXT,
  store_id TEXT,
  additional_config JSONB, -- For platform-specific settings

  -- Fees configuration
  listing_fee DECIMAL(5,2) DEFAULT 0,
  final_value_fee_percent DECIMAL(5,2) DEFAULT 0,
  payment_processing_fee_percent DECIMAL(5,2) DEFAULT 0,

  -- Status
  is_active BOOLEAN DEFAULT true,
  last_sync TIMESTAMP WITH TIME ZONE,
  sync_status TEXT, -- success, error, pending
  sync_error TEXT,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  UNIQUE(user_id, platform_name, store_id)
);

-- ============================================
-- PRODUCTS TABLE (Master Product Database)
-- ============================================
CREATE TABLE IF NOT EXISTS fw_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES fw_users(id) ON DELETE CASCADE,

  -- Basic Info
  sku TEXT, -- User's internal SKU
  title TEXT NOT NULL,
  description TEXT,

  -- Categorization
  category TEXT,
  subcategory TEXT,
  brand TEXT,
  tags TEXT[],

  -- Pricing
  cost_price DECIMAL(10,2), -- What you paid
  selling_price DECIMAL(10,2), -- Default selling price
  msrp DECIMAL(10,2), -- Manufacturer's suggested retail price

  -- Physical attributes
  weight DECIMAL(10,2), -- in kg
  length DECIMAL(10,2), -- in cm
  width DECIMAL(10,2),
  height DECIMAL(10,2),

  -- Images
  images TEXT[], -- Array of image URLs
  main_image TEXT,

  -- Inventory
  total_quantity INT DEFAULT 0,
  reserved_quantity INT DEFAULT 0, -- Qty in pending orders
  available_quantity INT DEFAULT 0, -- total - reserved
  low_stock_threshold INT DEFAULT 5,

  -- AI Generated Content
  ai_title TEXT,
  ai_description TEXT,
  ai_short_description TEXT,
  ai_bullet_points TEXT[],
  ai_tags TEXT[],
  seo_keywords TEXT[],

  -- For Discogs specifically
  artist TEXT,
  album_title TEXT,
  release_year INT,
  format TEXT, -- Vinyl, CD, Cassette, etc.
  genre TEXT,
  label TEXT,
  catalog_number TEXT,
  condition TEXT, -- Mint, Near Mint, Very Good Plus, etc.
  grading_media TEXT, -- Grading for media
  grading_sleeve TEXT, -- Grading for sleeve/cover
  discogs_release_id TEXT,

  -- Meta
  status TEXT DEFAULT 'draft', -- draft, active, inactive, archived
  notes TEXT,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX idx_products_user_id ON fw_products(user_id);
CREATE INDEX idx_products_sku ON fw_products(sku);
CREATE INDEX idx_products_status ON fw_products(status);

-- ============================================
-- LISTINGS TABLE (Platform-specific listings)
-- ============================================
CREATE TABLE IF NOT EXISTS fw_listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES fw_users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES fw_products(id) ON DELETE CASCADE,
  platform_id UUID REFERENCES fw_platforms(id) ON DELETE CASCADE,

  -- Platform listing ID
  platform_listing_id TEXT, -- ID from the platform
  listing_url TEXT,

  -- Platform-specific content (can differ from master product)
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,

  -- Listing details
  quantity_listed INT DEFAULT 1,
  quantity_sold INT DEFAULT 0,
  quantity_available INT DEFAULT 1,

  -- Platform-specific settings
  listing_type TEXT, -- auction, fixed_price, best_offer, etc.
  listing_duration INT, -- in days
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,

  -- For auctions
  starting_bid DECIMAL(10,2),
  reserve_price DECIMAL(10,2),
  buy_it_now_price DECIMAL(10,2),

  -- Shipping
  shipping_cost DECIMAL(10,2),
  shipping_method TEXT,
  handling_time INT, -- days

  -- Performance metrics
  views INT DEFAULT 0,
  watchers INT DEFAULT 0,
  inquiries INT DEFAULT 0,

  -- Status
  status TEXT DEFAULT 'draft', -- draft, pending, active, sold, ended, cancelled

  -- Sync
  last_synced TIMESTAMP WITH TIME ZONE,
  sync_error TEXT,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  UNIQUE(platform_id, platform_listing_id)
);

CREATE INDEX idx_listings_user_id ON fw_listings(user_id);
CREATE INDEX idx_listings_product_id ON fw_listings(product_id);
CREATE INDEX idx_listings_platform_id ON fw_listings(platform_id);
CREATE INDEX idx_listings_status ON fw_listings(status);

-- ============================================
-- SALES/ORDERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS fw_sales (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES fw_users(id) ON DELETE CASCADE,
  listing_id UUID REFERENCES fw_listings(id) ON DELETE SET NULL,
  product_id UUID REFERENCES fw_products(id) ON DELETE SET NULL,
  platform_id UUID REFERENCES fw_platforms(id) ON DELETE SET NULL,

  -- Platform order details
  platform_order_id TEXT,
  platform_buyer_id TEXT,
  buyer_username TEXT,
  buyer_name TEXT,
  buyer_email TEXT,

  -- Order details
  quantity INT NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,

  -- Costs
  shipping_cost DECIMAL(10,2) DEFAULT 0,
  tax DECIMAL(10,2) DEFAULT 0,
  platform_fee DECIMAL(10,2) DEFAULT 0,
  payment_processing_fee DECIMAL(10,2) DEFAULT 0,
  other_fees DECIMAL(10,2) DEFAULT 0,

  -- Total
  total_amount DECIMAL(10,2) NOT NULL,

  -- Profit calculation
  cost_of_goods DECIMAL(10,2), -- From product cost_price
  total_fees DECIMAL(10,2),
  net_profit DECIMAL(10,2),
  profit_margin DECIMAL(5,2), -- Percentage

  -- Shipping address
  shipping_address JSONB,

  -- Status
  order_status TEXT DEFAULT 'pending', -- pending, paid, shipped, delivered, cancelled, refunded
  payment_status TEXT DEFAULT 'unpaid', -- unpaid, paid, refunded
  fulfillment_status TEXT DEFAULT 'unfulfilled', -- unfulfilled, fulfilled, partially_fulfilled

  -- Dates
  order_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  paid_date TIMESTAMP WITH TIME ZONE,
  shipped_date TIMESTAMP WITH TIME ZONE,
  delivered_date TIMESTAMP WITH TIME ZONE,

  -- Tracking
  tracking_number TEXT,
  carrier TEXT,

  -- Notes
  notes TEXT,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_sales_user_id ON fw_sales(user_id);
CREATE INDEX idx_sales_platform_id ON fw_sales(platform_id);
CREATE INDEX idx_sales_order_date ON fw_sales(order_date);
CREATE INDEX idx_sales_order_status ON fw_sales(order_status);

-- ============================================
-- SOURCING PRODUCTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS fw_sourcing_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES fw_users(id) ON DELETE CASCADE,

  -- Source platform info
  source_platform TEXT NOT NULL, -- aliexpress, alibaba, dhgate, made_in_china, 1688, etc.
  source_product_id TEXT NOT NULL,
  source_url TEXT NOT NULL,

  -- Product details
  title TEXT NOT NULL,
  description TEXT,
  images TEXT[],

  -- Pricing
  price DECIMAL(10,2) NOT NULL,
  price_range_min DECIMAL(10,2),
  price_range_max DECIMAL(10,2),
  currency TEXT DEFAULT 'USD',

  -- Shipping
  shipping_cost DECIMAL(10,2),
  shipping_method TEXT,
  shipping_time_min INT, -- days
  shipping_time_max INT,

  -- Ordering
  moq INT DEFAULT 1, -- Minimum Order Quantity

  -- Supplier info
  supplier_name TEXT,
  supplier_rating DECIMAL(3,2),
  supplier_response_rate DECIMAL(5,2),
  total_orders INT,
  supplier_url TEXT,

  -- Product stats
  num_reviews INT DEFAULT 0,
  avg_rating DECIMAL(3,2),

  -- Categorization
  category TEXT,
  tags TEXT[],

  -- User actions
  is_favorite BOOLEAN DEFAULT false,
  notes TEXT,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_sourcing_user_id ON fw_sourcing_products(user_id);
CREATE INDEX idx_sourcing_platform ON fw_sourcing_products(source_platform);
CREATE INDEX idx_sourcing_favorite ON fw_sourcing_products(is_favorite);

-- ============================================
-- PROFIT CALCULATIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS fw_profit_calculations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES fw_users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES fw_products(id) ON DELETE CASCADE,
  sourcing_product_id UUID REFERENCES fw_sourcing_products(id) ON DELETE SET NULL,

  -- Calculation name/description
  name TEXT,
  description TEXT,

  -- Costs breakdown
  product_cost DECIMAL(10,2) NOT NULL,
  shipping_cost DECIMAL(10,2) DEFAULT 0,
  import_duties DECIMAL(10,2) DEFAULT 0,
  packaging_cost DECIMAL(10,2) DEFAULT 0,
  other_costs DECIMAL(10,2) DEFAULT 0,
  total_cost DECIMAL(10,2) NOT NULL,

  -- Platform-specific calculations (array of platforms)
  platform_calculations JSONB, -- { "ebay": { fee: 10, profit: 20 }, "amazon": { ... } }

  -- Default selling scenario
  selling_price DECIMAL(10,2) NOT NULL,
  platform_fees DECIMAL(10,2) DEFAULT 0,
  payment_processing_fees DECIMAL(10,2) DEFAULT 0,

  -- Profit
  gross_profit DECIMAL(10,2),
  net_profit DECIMAL(10,2),
  profit_margin DECIMAL(5,2), -- Percentage
  roi DECIMAL(5,2), -- Return on Investment %

  -- Projections
  estimated_monthly_sales INT,
  estimated_monthly_profit DECIMAL(10,2),

  -- Notes
  notes TEXT,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_profit_user_id ON fw_profit_calculations(user_id);
CREATE INDEX idx_profit_product_id ON fw_profit_calculations(product_id);

-- ============================================
-- RESEARCH QUERIES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS fw_research_queries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES fw_users(id) ON DELETE CASCADE,

  -- Query details
  query_text TEXT NOT NULL,
  platform TEXT NOT NULL,

  -- Filters applied
  filters JSONB,

  -- Results summary
  results_count INT,
  avg_price DECIMAL(10,2),
  min_price DECIMAL(10,2),
  max_price DECIMAL(10,2),

  -- Top sellers found
  top_sellers JSONB,

  -- AI insights
  ai_analysis TEXT,
  competition_level TEXT, -- low, medium, high
  profit_potential TEXT, -- low, medium, high

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_research_user_id ON fw_research_queries(user_id);
CREATE INDEX idx_research_platform ON fw_research_queries(platform);

-- ============================================
-- NICHES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS fw_niches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES fw_users(id) ON DELETE CASCADE,

  -- Niche details
  name TEXT NOT NULL,
  description TEXT,
  keywords TEXT[],
  category TEXT,

  -- AI Analysis
  ai_trend_score INT, -- 0-100
  ai_competition_level TEXT, -- low, medium, high
  ai_profit_potential TEXT, -- low, medium, high
  ai_recommendations TEXT,
  ai_analysis_full JSONB,

  -- Market data
  avg_price DECIMAL(10,2),
  monthly_search_volume INT,
  seasonality_data JSONB,
  top_platforms TEXT[],

  -- Tracking
  is_active BOOLEAN DEFAULT true,
  last_analyzed TIMESTAMP WITH TIME ZONE,

  -- User notes
  notes TEXT,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_niches_user_id ON fw_niches(user_id);
CREATE INDEX idx_niches_active ON fw_niches(is_active);

-- ============================================
-- COMPETITORS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS fw_competitors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES fw_users(id) ON DELETE CASCADE,

  -- Competitor details
  platform TEXT NOT NULL,
  store_name TEXT NOT NULL,
  store_url TEXT,
  store_id TEXT,

  -- Metrics (synced periodically)
  total_listings INT,
  avg_rating DECIMAL(3,2),
  total_reviews INT,
  feedback_score INT,

  -- Estimated performance
  est_monthly_sales INT,
  est_monthly_revenue DECIMAL(10,2),

  -- Product analysis
  top_products JSONB,
  avg_price DECIMAL(10,2),
  price_range_min DECIMAL(10,2),
  price_range_max DECIMAL(10,2),

  -- Niches they operate in
  niches TEXT[],

  -- Tracking
  is_active BOOLEAN DEFAULT true,
  last_synced TIMESTAMP WITH TIME ZONE,

  -- Notes
  notes TEXT,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  UNIQUE(user_id, platform, store_id)
);

CREATE INDEX idx_competitors_user_id ON fw_competitors(user_id);
CREATE INDEX idx_competitors_platform ON fw_competitors(platform);

-- ============================================
-- AI INTERACTIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS fw_ai_interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES fw_users(id) ON DELETE CASCADE,

  -- Interaction type
  interaction_type TEXT NOT NULL, -- title_generation, description, keyword, trend_analysis, chat, etc.

  -- Content
  prompt TEXT,
  response TEXT,
  model_used TEXT, -- gpt-4, claude, etc.

  -- Context
  related_product_id UUID REFERENCES fw_products(id) ON DELETE SET NULL,
  related_niche_id UUID REFERENCES fw_niches(id) ON DELETE SET NULL,
  context_data JSONB,

  -- Feedback
  user_rating INT, -- 1-5 stars
  user_feedback TEXT,
  was_helpful BOOLEAN,

  -- Meta
  tokens_used INT,
  cost DECIMAL(10,4),

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_ai_user_id ON fw_ai_interactions(user_id);
CREATE INDEX idx_ai_type ON fw_ai_interactions(interaction_type);

-- ============================================
-- AUTOMATION RULES TABLE
-- ============================================
-- This replaces exposed n8n with user-friendly automation rules
CREATE TABLE IF NOT EXISTS fw_automation_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES fw_users(id) ON DELETE CASCADE,

  -- Rule details
  name TEXT NOT NULL,
  description TEXT,
  rule_type TEXT NOT NULL, -- auto_price, auto_relist, inventory_sync, low_stock_alert, etc.

  -- Trigger configuration
  trigger_type TEXT, -- schedule, event, threshold
  trigger_config JSONB,

  -- Conditions
  conditions JSONB,

  -- Actions
  actions JSONB,

  -- Backend workflow ID (hidden from user)
  internal_workflow_id TEXT,

  -- Status
  is_active BOOLEAN DEFAULT false,

  -- Stats
  last_run TIMESTAMP WITH TIME ZONE,
  next_run TIMESTAMP WITH TIME ZONE,
  total_runs INT DEFAULT 0,
  success_count INT DEFAULT 0,
  error_count INT DEFAULT 0,
  last_error TEXT,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_automation_user_id ON fw_automation_rules(user_id);
CREATE INDEX idx_automation_active ON fw_automation_rules(is_active);

-- ============================================
-- NOTIFICATIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS fw_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES fw_users(id) ON DELETE CASCADE,

  -- Notification details
  type TEXT NOT NULL, -- sale, low_stock, price_change, competitor_alert, etc.
  title TEXT NOT NULL,
  message TEXT NOT NULL,

  -- Related entities
  related_product_id UUID REFERENCES fw_products(id) ON DELETE SET NULL,
  related_sale_id UUID REFERENCES fw_sales(id) ON DELETE SET NULL,
  related_listing_id UUID REFERENCES fw_listings(id) ON DELETE SET NULL,

  -- Priority
  priority TEXT DEFAULT 'normal', -- low, normal, high, urgent

  -- Status
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMP WITH TIME ZONE,

  -- Actions
  action_url TEXT,
  action_label TEXT,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_notifications_user_id ON fw_notifications(user_id);
CREATE INDEX idx_notifications_read ON fw_notifications(is_read);
CREATE INDEX idx_notifications_created ON fw_notifications(created_at);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE fw_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE fw_platforms ENABLE ROW LEVEL SECURITY;
ALTER TABLE fw_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE fw_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE fw_sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE fw_sourcing_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE fw_profit_calculations ENABLE ROW LEVEL SECURITY;
ALTER TABLE fw_research_queries ENABLE ROW LEVEL SECURITY;
ALTER TABLE fw_niches ENABLE ROW LEVEL SECURITY;
ALTER TABLE fw_competitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE fw_ai_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE fw_automation_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE fw_notifications ENABLE ROW LEVEL SECURITY;

-- Note: Actual RLS policies will be created based on Clerk userId
-- Example policy (to be implemented with actual Clerk integration):
-- CREATE POLICY "Users can only see their own data" ON fw_products
--   FOR ALL USING (user_id = (SELECT id FROM fw_users WHERE clerk_user_id = auth.uid()));

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to relevant tables
CREATE TRIGGER update_fw_users_updated_at BEFORE UPDATE ON fw_users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_fw_platforms_updated_at BEFORE UPDATE ON fw_platforms
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_fw_products_updated_at BEFORE UPDATE ON fw_products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_fw_listings_updated_at BEFORE UPDATE ON fw_listings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_fw_sales_updated_at BEFORE UPDATE ON fw_sales
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_fw_niches_updated_at BEFORE UPDATE ON fw_niches
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_fw_competitors_updated_at BEFORE UPDATE ON fw_competitors
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_fw_automation_updated_at BEFORE UPDATE ON fw_automation_rules
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to calculate available quantity
CREATE OR REPLACE FUNCTION calculate_available_quantity()
RETURNS TRIGGER AS $$
BEGIN
    NEW.available_quantity = NEW.total_quantity - COALESCE(NEW.reserved_quantity, 0);
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_product_available_quantity BEFORE INSERT OR UPDATE ON fw_products
  FOR EACH ROW EXECUTE FUNCTION calculate_available_quantity();

-- ============================================
-- DEFAULT DATA / SEED DATA
-- ============================================

-- Insert default platform fee structures
-- (To be populated after user creates their account)
